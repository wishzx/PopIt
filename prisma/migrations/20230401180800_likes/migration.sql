-- DropIndex
DROP INDEX "Content_id_createdAt_idx";

-- CreateTable
CREATE TABLE "Likes" (
    "user_id" TEXT NOT NULL,
    "challenge_id" TEXT NOT NULL,

    CONSTRAINT "Likes_pkey" PRIMARY KEY ("user_id","challenge_id")
);

-- AddForeignKey
ALTER TABLE "Likes" ADD CONSTRAINT "Likes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Likes" ADD CONSTRAINT "Likes_challenge_id_fkey" FOREIGN KEY ("challenge_id") REFERENCES "Content"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
