import { config } from 'dotenv';
import { hash } from 'bcryptjs';

// Load environment variables BEFORE importing prisma
config();

import prisma from '../lib/prisma';

async function main() {
  console.log('🌱 Starting database seed...');

  // Create admin user
  const hashedPassword = await hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@upeposoul.com' },
    update: {},
    create: {
      email: 'admin@upeposoul.com',
      name: 'Upepo Admin',
      password: hashedPassword,
      role: 'ADMIN',
      bio: 'Soul Guide & Platform Administrator',
    },
  });

  console.log('✅ Created admin user:', admin.email);

  // Create Soul Notes
  const soulNotes = [
    {
      title: 'Today, breathe into your becoming',
      slug: 'breathe-into-your-becoming',
      excerpt: 'You are allowed to rest. You are allowed to realign. Your journey is unfolding exactly as it should.',
      content: `# Today, breathe into your becoming

You woke up this morning, and perhaps the first thought was about what you need to do, fix, or become.

But what if today... you simply breathed?

## The Permission You've Been Waiting For

You are allowed to rest. You are allowed to realign. You are allowed to take your time.

Your journey is unfolding exactly as it should—not despite the pauses, but **because of them**.

> "In the stillness between breaths, we find our truest selves."

## A Practice for Today

Close your eyes. Place one hand on your heart. Feel the gentle rhythm there—the proof that you are alive, here, now.

Breathe in: *I am becoming*  
Breathe out: *I am enough*

Repeat until you feel it in your bones.

## Remember This

- You don't have to have it all figured out
- Rest is productive
- Your pace is perfect
- You are exactly where you need to be

---

Come back to this whenever you forget. We'll be here, holding space for your becoming.`,
      theme: 'Stillness',
      tags: 'mindfulness,presence,self-compassion',
      published: true,
      authorId: admin.id,
    },
    {
      title: 'Where abundance already flows',
      slug: 'where-abundance-flows',
      excerpt: 'Look around you. Notice the abundance that is already here—in your breath, in the sunrise, in the love around you.',
      content: `# Where abundance already flows

We spend so much time seeking abundance *out there*—in achievements, possessions, external validation.

But what if abundance has been here all along?

## The Abundance You Already Have

**In your breath:** Every inhale is a gift. Every exhale is a release.

**In nature:** The sun rises for you every day, asking nothing in return.

**In connection:** Someone thought of you today. Someone's life is better because you exist.

**In growth:** You're not the same person you were a year ago. That's abundance.

## A Shift in Perspective

> "Abundance is not about having more. It's about noticing more."

What if instead of asking "What am I missing?" you asked "What is already here?"

## Today's Practice: Abundance Inventory

1. Name 3 things your body does for you without you asking
2. Notice 3 beautiful things in your immediate environment
3. Recall 3 moments of kindness you've experienced
4. Feel 3 ways you've grown this year

This is your abundance. It's been here all along.

## Gratitude as Gateway

When we practice gratitude, we don't just count our blessings—we multiply them.

Try this: Every night for the next week, write down 3 specific things you're grateful for. Watch how your perception shifts.`,
      theme: 'Abundance',
      tags: 'abundance,gratitude,awareness',
      published: true,
      authorId: admin.id,
    },
    {
      title: 'Healing begins in the pause',
      slug: 'healing-in-the-pause',
      excerpt: 'Between action and reaction, there is a space. In that space lies your power to choose healing.',
      content: `# Healing begins in the pause

Between the stimulus and the response, there is a space.

In that space is our freedom—our power to choose.

## The Gap We Miss

When someone hurts us, we react.  
When life overwhelms us, we react.  
When fear rises, we react.

But what if we paused?

**Just for a breath.**

## The Anatomy of a Pause

A pause is not inaction. It's conscious space.

It's the moment where you say:
- *I feel this*
- *But I don't have to be ruled by it*
- *I can choose my response*

> "Between stimulus and response there is a space. In that space is our power to choose our response. In our response lies our growth and our freedom." — Viktor Frankl

## How to Practice the Pause

### When Triggered:
1. **Notice** the sensation in your body
2. **Breathe** for 3 counts in, 3 counts out
3. **Name** the emotion without judgment
4. **Choose** your response consciously

### When Overwhelmed:
1. **Stop** whatever you're doing
2. **Step outside** or look out a window
3. **Ground** yourself (feel your feet on earth)
4. **Return** when centered

## The Healing Power

When we pause, we break the cycle of reactivity.

We create space for:
- Understanding instead of judgment
- Compassion instead of anger
- Wisdom instead of impulse
- **Healing instead of harm**

## Your Practice This Week

Set 3 alarms throughout your day labeled "Pause."

When they go off:
- Stop what you're doing
- Take 3 conscious breaths
- Notice how you feel
- Continue with intention

This is how healing begins—one conscious pause at a time.`,
      theme: 'Healing',
      tags: 'healing,inner-work,transformation,mindfulness',
      published: true,
      authorId: admin.id,
    },
  ];

  for (const note of soulNotes) {
    const created = await prisma.soulNote.upsert({
      where: { slug: note.slug },
      update: {},
      create: note,
    });
    console.log('✅ Created Soul Note:', created.title);
  }

  // Create Guided Practices
  const practices = [
    {
      title: '5-Minute Morning Breath',
      slug: '5-minute-morning-breath',
      description: 'Start your day grounded and centered with this simple breathwork practice.',
      duration: 5,
      type: 'Breathwork',
      difficulty: 'BEGINNER',
      isPremium: false,
      audioUrl: null, // Add actual URL when you upload
      videoUrl: null,
      transcript: `Welcome to your 5-minute morning breath practice.

Find a comfortable seated position. Close your eyes or soften your gaze.

Let's begin by taking a deep breath in through your nose... and out through your mouth.

[Repeat for 5 minutes with guidance]`,
      published: true,
      authorId: admin.id,
    },
    {
      title: 'Heart-Centered Meditation',
      slug: 'heart-centered-meditation',
      description: 'Connect to your heart space and cultivate compassion for yourself and others.',
      duration: 15,
      type: 'Meditation',
      difficulty: 'INTERMEDIATE',
      isPremium: false,
      audioUrl: null,
      videoUrl: null,
      transcript: `Welcome to this heart-centered meditation.

Place your hand on your heart. Feel the warmth there.

Breathe in love... breathe out gratitude.

[Continue with heart-opening guidance]`,
      published: true,
      authorId: admin.id,
    },
    {
      title: 'Abundance Visualization Journey',
      slug: 'abundance-visualization',
      description: 'A guided visualization to align with the frequency of abundance and prosperity.',
      duration: 20,
      type: 'Visualization',
      difficulty: 'INTERMEDIATE',
      isPremium: true,
      audioUrl: null,
      videoUrl: null,
      transcript: `Close your eyes and imagine...

You're standing in a field of golden light.

This light represents infinite abundance.

[Continue with abundance visualization]`,
      published: true,
      authorId: admin.id,
    },
    {
      title: 'Full Moon Release Ritual',
      slug: 'full-moon-release',
      description: 'Release what no longer serves you with this powerful full moon practice.',
      duration: 30,
      type: 'Meditation',
      difficulty: 'ADVANCED',
      isPremium: true,
      audioUrl: null,
      videoUrl: null,
      transcript: `Under the light of the full moon, we release.

What are you ready to let go of?

[Guide through release ceremony]`,
      published: true,
      authorId: admin.id,
    },
  ];

  for (const practice of practices) {
    const created = await prisma.practice.upsert({
      where: { slug: practice.slug },
      update: {},
      create: practice,
    });
    console.log('✅ Created Practice:', created.title);
  }

  // Create Soul Sessions
  const sessions = [
    {
      title: 'New Moon Intention Setting Circle',
      slug: 'new-moon-intention-circle',
      description: 'Join us for a powerful new moon ceremony to set intentions for the coming lunar cycle.',
      date: new Date('2025-01-13T19:00:00'),
      duration: 90,
      type: 'GROUP',
      capacity: 20,
      price: 0,
      isPremium: false,
      location: 'Online (Zoom)',
      published: true,
      hostId: admin.id,
    },
    {
      title: 'Breathwork & Sound Healing',
      slug: 'breathwork-sound-healing',
      description: 'Experience deep healing through conscious breathwork combined with crystal bowl sound healing.',
      date: new Date('2025-01-20T18:00:00'),
      duration: 120,
      type: 'GROUP',
      capacity: 15,
      price: 3500, // $35.00
      isPremium: false,
      location: 'Online (Zoom)',
      published: true,
      hostId: admin.id,
    },
    {
      title: 'One-on-One Soul Guidance Session',
      slug: 'soul-guidance-session',
      description: 'Personal 1:1 session for deep inner work, guidance, and support on your soul journey.',
      date: new Date('2025-01-15T14:00:00'),
      duration: 60,
      type: 'PRIVATE',
      capacity: 1,
      price: 12000, // $120.00
      isPremium: true,
      location: 'Online (Zoom)',
      published: true,
      hostId: admin.id,
    },
  ];

  for (const session of sessions) {
    const created = await prisma.soulSession.upsert({
      where: { slug: session.slug },
      update: {},
      create: session,
    });
    console.log('✅ Created Session:', created.title);
  }

  console.log('✨ Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
