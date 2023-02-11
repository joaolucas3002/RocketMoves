/*
  Warnings:

  - You are about to drop the column `departmentId` on the `tags` table. All the data in the column will be lost.
  - Added the required column `postId` to the `tags` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_posts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "post" TEXT NOT NULL,
    "star" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_posts" ("date", "id", "post", "star", "title") SELECT "date", "id", "post", "star", "title" FROM "posts";
DROP TABLE "posts";
ALTER TABLE "new_posts" RENAME TO "posts";
CREATE TABLE "new_tags" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tag" TEXT NOT NULL,
    "postId" TEXT NOT NULL
);
INSERT INTO "new_tags" ("id", "tag") SELECT "id", "tag" FROM "tags";
DROP TABLE "tags";
ALTER TABLE "new_tags" RENAME TO "tags";
CREATE UNIQUE INDEX "tags_postId_key" ON "tags"("postId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
