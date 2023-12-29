-- CreateTable
CREATE TABLE "jdz_area" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "address" TEXT,
    "area_type" TEXT,
    "cost" TEXT,
    "created_at" TEXT,
    "data_type" TEXT,
    "description" TEXT,
    "introduction" TEXT,
    "areakey" TEXT,
    "latitude" REAL,
    "likes" INTEGER,
    "longitude" TEXT,
    "location" REAL,
    "name" TEXT,
    "open_time" TEXT,
    "phone" TEXT,
    "tags" TEXT,
    "updated_at" TEXT,
    "images" TEXT,
    "comments" INTEGER DEFAULT 0
);

-- CreateTable
CREATE TABLE "jdz_comment" (
    "areakey" TEXT,
    "content" TEXT,
    "created_at" TEXT,
    "images" TEXT,
    "userid" TEXT,
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "is_verify" INTEGER DEFAULT 0
);

-- CreateTable
CREATE TABLE "jdz_user" (
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "rid" INTEGER DEFAULT 4,
    "likes" TEXT DEFAULT '[]',
    "login_status" INTEGER DEFAULT 0,
    "create_time" TEXT,
    "update_time" TEXT
);

-- CreateTable
CREATE TABLE "roles" (
    "id" INTEGER,
    "menus_id" TEXT,
    "cname" TEXT,
    "ename" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "jdz_user_username_key" ON "jdz_user"("username");
