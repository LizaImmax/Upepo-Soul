import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { stripe } from '@/lib/stripe';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { type, itemId } = body;

    if (!type || !itemId) {
      return NextResponse.json(
        { error: 'Type and itemId are required' },
        { status: 400 }
      );
    }

    let item: any;
    let lineItems: any[] = [];

    if (type === 'practice') {
      item = await prisma.practice.findUnique({
        where: { id: itemId },
      });

      if (!item || !item.isPremium) {
        return NextResponse.json(
          { error: 'Practice not found or not premium' },
          { status: 404 }
        );
      }

      lineItems = [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: item.title,
              description: item.description,
            },
            unit_amount: Math.round((item.price || 0) * 100),
          },
          quantity: 1,
        },
      ];
    } else if (type === 'session') {
      item = await prisma.soulSession.findUnique({
        where: { id: itemId },
      });

      if (!item) {
        return NextResponse.json(
          { error: 'Session not found' },
          { status: 404 }
        );
      }

      lineItems = [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: item.title,
              description: item.description,
            },
            unit_amount: Math.round(item.price * 100),
          },
          quantity: 1,
        },
      ];
    } else {
      return NextResponse.json(
        { error: 'Invalid type' },
        { status: 400 }
      );
    }

    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.NEXTAUTH_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXTAUTH_URL}/checkout/cancel`,
      client_reference_id: session.user!.id!,
      metadata: {
        type,
        itemId,
        userId: session.user!.id!,
      },
    });

    return NextResponse.json({ sessionId: checkoutSession.id, url: checkoutSession.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
