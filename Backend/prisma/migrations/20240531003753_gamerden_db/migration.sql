-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Male', 'Female');

-- CreateEnum
CREATE TYPE "Platform" AS ENUM ('PC', 'Xbox', 'Playstation');

-- CreateEnum
CREATE TYPE "Weekday" AS ENUM ('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "dob" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "country" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "languages" TEXT[],
    "bio" TEXT NOT NULL DEFAULT 'No Bio Available',
    "avatar" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserPreferences" (
    "id" SERIAL NOT NULL,
    "region" TEXT NOT NULL,
    "voice" BOOLEAN NOT NULL DEFAULT false,
    "group_play" BOOLEAN NOT NULL DEFAULT false,
    "platform" "Platform"[] DEFAULT ARRAY[]::"Platform"[],
    "weekday" "Weekday"[] DEFAULT ARRAY[]::"Weekday"[],
    "age_range" INTEGER[] DEFAULT ARRAY[18, 100]::INTEGER[],
    "userId" INTEGER NOT NULL,

    CONSTRAINT "UserPreferences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Game" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "cover" TEXT NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UserPreferencesGames" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "UserPreferences_userId_key" ON "UserPreferences"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "_UserPreferencesGames_AB_unique" ON "_UserPreferencesGames"("A", "B");

-- CreateIndex
CREATE INDEX "_UserPreferencesGames_B_index" ON "_UserPreferencesGames"("B");

-- AddForeignKey
ALTER TABLE "UserPreferences" ADD CONSTRAINT "UserPreferences_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserPreferencesGames" ADD CONSTRAINT "_UserPreferencesGames_A_fkey" FOREIGN KEY ("A") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserPreferencesGames" ADD CONSTRAINT "_UserPreferencesGames_B_fkey" FOREIGN KEY ("B") REFERENCES "UserPreferences"("id") ON DELETE CASCADE ON UPDATE CASCADE;
