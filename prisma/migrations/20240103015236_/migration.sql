-- CreateTable
CREATE TABLE "charge_form" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "date" TEXT,
    "uses" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "charge_form_title_key" ON "charge_form"("title");
