import { createUploadthing, type FileRouter } from "uploadthing/next";
import { auth } from "@/lib/auth";

const f = createUploadthing();

export const ourFileRouter = {
  // Image uploader for cover images
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async () => {
      const session = await auth();
      
      if (!session || !session.user || (session.user as any).role !== 'ADMIN') {
        throw new Error("Unauthorized");
      }

      return { userId: session.user.id! };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Image upload complete for userId:", metadata.userId);
      console.log("File URL:", file.url);
      
      return { uploadedBy: metadata.userId, url: file.url };
    }),

  // Audio uploader for guided practices
  audioUploader: f({ audio: { maxFileSize: "32MB", maxFileCount: 1 } })
    .middleware(async () => {
      const session = await auth();
      
      if (!session || !session.user || (session.user as any).role !== 'ADMIN') {
        throw new Error("Unauthorized");
      }

      return { userId: session.user.id! };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Audio upload complete for userId:", metadata.userId);
      console.log("File URL:", file.url);
      
      return { uploadedBy: metadata.userId, url: file.url };
    }),

  // Video uploader for guided practices
  videoUploader: f({ video: { maxFileSize: "128MB", maxFileCount: 1 } })
    .middleware(async () => {
      const session = await auth();
      
      if (!session || !session.user || (session.user as any).role !== 'ADMIN') {
        throw new Error("Unauthorized");
      }

      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Video upload complete for userId:", metadata.userId);
      console.log("File URL:", file.url);
      
      return { uploadedBy: metadata.userId, url: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
