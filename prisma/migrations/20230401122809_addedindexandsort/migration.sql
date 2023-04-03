-- CreateIndex
CREATE INDEX "Content_id_createdAt_idx" ON "Content"("id", "createdAt" DESC);

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User" USING HASH ("email");
