/*
  Warnings:

  - Added the required column `size_bytes` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "File" ADD COLUMN     "size_bytes" INTEGER NOT NULL;
