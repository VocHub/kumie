/*
  Warnings:

  - You are about to drop the column `metaId` on the `AltTitles` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `AltTitles_metaId_fkey` ON `AltTitles`;

-- AlterTable
ALTER TABLE `AltTitles` DROP COLUMN `metaId`;
