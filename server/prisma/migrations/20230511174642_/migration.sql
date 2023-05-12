-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_user" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,
    "loginToken" TEXT NOT NULL DEFAULT ''
);
INSERT INTO "new_user" ("createdAt", "email", "id", "loginToken", "name", "password", "userName") SELECT "createdAt", "email", "id", "loginToken", "name", "password", "userName" FROM "user";
DROP TABLE "user";
ALTER TABLE "new_user" RENAME TO "user";
CREATE UNIQUE INDEX "user_userName_key" ON "user"("userName");
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
