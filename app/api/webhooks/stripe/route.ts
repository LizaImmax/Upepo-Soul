import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { stripe } from '@/lib/stripe';
import prisma from '@/lib/prisma';
import { sendBookingConfirmation } from '@/lib/email';
import Stripe from 'stripe';

export async function POST(req: NextRequest) {
  const body = await req.text();
  const headersList = await headers()
  const signature = headersList.get('stripe-signature');

  if (!signature) {
    return NextResponse.json(
      { error: 'No signature' },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json(
      { error: 'Webhook error' },
      { status: 400 }
    );
  }

  try {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const { type, itemId, userId } = session.metadata || {};

      if (!type || !itemId || !userId) {
        console.error('Missing metadata in checkout session');
        return NextResponse.json({ received: true });
      }

      // Create purchase record
      await prisma.purchase.create({
        data: {
          userId,
          itemType: type,
          itemId,
          amount: (session.amount_total || 0) / 100,
          status: 'COMPLETED',
        },
      });

      // If it's a session purchase, create a booking and send confirmation
      if (type === 'session') {
        const session = await prisma.soulSession.findUnique({
          where: { id: itemId },
        });

        const booking = await prisma.booking.create({
          data: {
            sessionId: itemId,
            userId,
            scheduledAt: new Date(),
            status: 'CONFIRMED',
          },
        });

        // Get user details and send confirmation email
        const user = await prisma.user.findUnique({
          where: { id: userId },
        });

        if (user && session) {
          await sendBookingConfirmation(
            user.email,
            user.name || 'there',
            session.title,
            booking.scheduledAt
          );
        }
      }

      console.log('Payment successful:', session.id);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}
