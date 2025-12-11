import { User, SoulNote, Practice, SoulSession, Booking, ForumPost } from '@prisma/client'

export type SafeUser = Omit<User, 'password' | 'createdAt' | 'updatedAt' | 'emailVerified'> & {
  createdAt: string
  updatedAt: string
  emailVerified: string | null
}

export type SoulNoteWithAuthor = SoulNote & {
  author: SafeUser
}

export type PracticeWithAuthor = Practice & {
  author: SafeUser
}

export type BookingWithSession = Booking & {
  session: SoulSession
  user: SafeUser
}

export type ForumPostWithUser = ForumPost & {
  user: SafeUser
}
