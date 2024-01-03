/*
  Warnings:

  - You are about to drop the column `type` on the `charge_form` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_charge_form" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "date" TEXT,
    "uses" TEXT NOT NULL
);
INSERT INTO "new_charge_form" ("date", "id", "title", "uses") SELECT "date", "id", "title", "uses" FROM "charge_form";
DROP TABLE "charge_form";
ALTER TABLE "new_charge_form" RENAME TO "charge_form";
CREATE UNIQUE INDEX "charge_form_title_key" ON "charge_form"("title");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
