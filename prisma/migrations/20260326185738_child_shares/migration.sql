/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `SharedFolder` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "SharedFolder" ADD COLUMN     "rootShareId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "SharedFolder_id_key" ON "SharedFolder"("id");

-- AddForeignKey
ALTER TABLE "SharedFolder" ADD CONSTRAINT "SharedFolder_rootShareId_fkey" FOREIGN KEY ("rootShareId") REFERENCES "SharedFolder"("id") ON DELETE CASCADE ON UPDATE CASCADE;
