-- DropIndex
DROP INDEX "tags_postId_key";

-- CreateIndex
CREATE INDEX "tags_postId_idx" ON "tags"("postId");
