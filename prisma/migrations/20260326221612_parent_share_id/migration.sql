/*
  Warnings:

  - You are about to drop the column `rootShareId` on the `SharedFolder` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "SharedFolder" DROP CONSTRAINT "SharedFolder_rootShareId_fkey";

-- AlterTable
ALTER TABLE "SharedFolder" DROP COLUMN "rootShareId",
ADD COLUMN     "parentShareId" TEXT;

-- AddForeignKey
ALTER TABLE "SharedFolder" ADD CONSTRAINT "SharedFolder_parentShareId_fkey" FOREIGN KEY ("parentShareId") REFERENCES "SharedFolder"("id") ON DELETE CASCADE ON UPDATE CASCADE;
