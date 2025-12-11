// Example: How to add your first Soul Note programmatically
// You can run this in Prisma Studio or create a seed script

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createFirstSoulNote() {
  // First, create a user (you'll need this for the author)
  const user = await prisma.user.create({
    data: {
      email: 'admin@upeposoul.com',
      name: 'Upepo Soul',
      role: 'ADMIN',
    },
  });

  // Then create your first soul note
  const soulNote = await prisma.soulNote.create({
    data: {
      title: 'Today, breathe into your becoming',
      slug: 'breathe-into-your-becoming',
      excerpt: 'You are allowed to rest. You are allowed to realign. Your journey is unfolding exactly as it should.',
      content: `
You are allowed to rest.

You are allowed to realign.

Your journey is unfolding exactly as it should.

---

Sometimes we forget that becoming is not a race. It's not about how fast we move or how much we achieve in a day. It's about the small, quiet moments where we choose ourselves—where we choose to pause, to breathe, to listen to what our soul is telling us.

Today, I want you to know: **you don't have to have it all figured out.**

You don't have to be perfect, polished, or "further along" than you are. You're exactly where you need to be. And that's not just okay—it's beautiful.

## The Power of the Pause

In a world that constantly tells us to go faster, do more, be more—the pause is revolutionary.

When you pause, you create space.

Space to feel. Space to heal. Space to remember who you are beneath all the noise.

**This is where transformation happens.**

Not in the doing, but in the being.
Not in the rushing, but in the returning.

## A Practice for Today

Take a moment right now. Place your hand on your heart. Feel it beating. Feel yourself breathing.

Say this to yourself:

*"I am allowed to rest."*
*"I am allowed to realign."*
*"I am exactly where I need to be."*

Repeat it as many times as you need.

Let it sink in. Let it soften the edges of your worry. Let it remind you that you are held, you are guided, and you are becoming—one breath at a time.

---

With love,
Your soul already knows the way. Trust it.
      `,
      theme: 'Stillness',
      tags: ['mindfulness', 'presence', 'self-compassion', 'inner-peace'],
      published: true,
      featured: true,
      authorId: user.id,
    },
  });

  console.log('Created soul note:', soulNote);
}

// Run this function
createFirstSoulNote()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
