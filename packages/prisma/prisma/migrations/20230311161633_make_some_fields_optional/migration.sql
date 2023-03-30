/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Episode` table. All the data in the column will be lost.
  - You are about to drop the column `epType` on the `Episode` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Episode` table. All the data in the column will be lost.
  - You are about to drop the column `season` on the `Meta` table. All the data in the column will be lost.
  - You are about to drop the column `airDate` on the `ServerSource` table. All the data in the column will be lost.
  - You are about to drop the column `isM3U8` on the `ServerSource` table. All the data in the column will be lost.
  - You are about to drop the column `corsError` on the `StreamSource` table. All the data in the column will be lost.
  - You are about to drop the column `site` on the `Trailer` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Episode` DROP FOREIGN KEY `Episode_animeId_fkey`;

-- DropForeignKey
ALTER TABLE `ServerSource` DROP FOREIGN KEY `ServerSource_episodeId_fkey`;

-- AlterTable
ALTER TABLE `Anime` ADD COLUMN `seasonal` ENUM('WINTER', 'SPRING', 'SUMMER', 'FALL') NULL,
    MODIFY `totalEpisodes` INTEGER NULL;

-- AlterTable
ALTER TABLE `Episode` DROP COLUMN `createdAt`,
    DROP COLUMN `epType`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `airDate` DATETIME(3) NULL,
    ADD COLUMN `episodeType` ENUM('OVA', 'SPECIAL', 'TV', 'MOVIE') NOT NULL DEFAULT 'TV',
    MODIFY `title` VARCHAR(191) NULL,
    MODIFY `synopsis` TEXT NULL;

-- AlterTable
ALTER TABLE `Meta` DROP COLUMN `season`,
    MODIFY `synopsis` TEXT NULL,
    MODIFY `latestContent` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `cover` VARCHAR(191) NULL,
    MODIFY `isNsfw` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `rating` DOUBLE NULL,
    MODIFY `thumbnail` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `ServerSource` DROP COLUMN `airDate`,
    DROP COLUMN `isM3U8`;

-- AlterTable
ALTER TABLE `StreamSource` DROP COLUMN `corsError`,
    ADD COLUMN `isM3U8` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `Trailer` DROP COLUMN `site`;

-- AddForeignKey
ALTER TABLE `Episode` ADD CONSTRAINT `Episode_animeId_fkey` FOREIGN KEY (`animeId`) REFERENCES `Anime`(`animeId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ServerSource` ADD CONSTRAINT `ServerSource_episodeId_fkey` FOREIGN KEY (`episodeId`) REFERENCES `Episode`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
