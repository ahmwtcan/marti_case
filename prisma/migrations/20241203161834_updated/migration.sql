/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `Area` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Area" DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "updatedAt";
