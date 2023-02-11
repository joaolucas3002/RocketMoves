/*
  Warnings:

  - Added the required column `departmentId` to the `tags` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_tags" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tag" TEXT NOT NULL,
    "departmentId" TEXT NOT NULL,
    CONSTRAINT "tags_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "posts" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_tags" ("id", "tag") SELECT "id", "tag" FROM "tags";
DROP TABLE "tags";
ALTER TABLE "new_tags" RENAME TO "tags";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
