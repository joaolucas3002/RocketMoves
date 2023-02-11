-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "title" TEXT NOT NULL,
    "post" TEXT NOT NULL,
    "star" INTEGER NOT NULL DEFAULT 0
);
