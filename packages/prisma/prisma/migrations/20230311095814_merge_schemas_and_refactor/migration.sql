/*
  Warnings:

  - The values [FICTIO] on the enum `Meta_type` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `Content` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `totalEpisodes` to the `Anime` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currentChapter` to the `Fiction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalChapters` to the `Fiction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currentChapter` to the `Manga` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalChapters` to the `Manga` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cover` to the `Meta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isNsfw` to the `Meta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rating` to the `Meta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `season` to the `Meta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Meta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thumbnail` to the `Meta` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Content` DROP FOREIGN KEY `Content_animeId_fkey`;

-- AlterTable
ALTER TABLE `Anime` ADD COLUMN `totalEpisodes` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Fiction` ADD COLUMN `currentChapter` INTEGER NOT NULL,
    ADD COLUMN `totalChapters` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Manga` ADD COLUMN `currentChapter` INTEGER NOT NULL,
    ADD COLUMN `totalChapters` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Meta` ADD COLUMN `anilistId` INTEGER NULL,
    ADD COLUMN `color` VARCHAR(191) NULL,
    ADD COLUMN `cover` VARCHAR(191) NOT NULL,
    ADD COLUMN `isNsfw` BOOLEAN NOT NULL,
    ADD COLUMN `malId` INTEGER NULL,
    ADD COLUMN `rating` DOUBLE NOT NULL,
    ADD COLUMN `season` ENUM('WINTER', 'SPRING', 'SUMMER', 'FALL') NOT NULL,
    ADD COLUMN `status` ENUM('FINISHED', 'ONGOING', 'CANCELLED', 'HIATUS') NOT NULL,
    ADD COLUMN `thumbnail` VARCHAR(191) NOT NULL,
    MODIFY `type` ENUM('ANIME', 'MANGA', 'FICTION') NOT NULL;

-- DropTable
DROP TABLE `Content`;

-- CreateTable
CREATE TABLE `Trailer` (
    `trailerId` INTEGER NOT NULL,
    `site` VARCHAR(191) NOT NULL,
    `thumbnail` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`trailerId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Episode` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `epType` ENUM('OVA', 'SPECIAL', 'REGULAR', 'UNKNOWN') NOT NULL DEFAULT 'UNKNOWN',
    `sequenceNumber` INTEGER NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `synopsis` TEXT NOT NULL,
    `animeId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ServerSource` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `serverNamme` VARCHAR(191) NOT NULL,
    `episodeId` INTEGER NOT NULL,
    `referer` VARCHAR(191) NULL,
    `isM3U8` BOOLEAN NOT NULL,
    `airDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StreamSource` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `quality` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `corsError` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Trailer` ADD CONSTRAINT `Trailer_trailerId_fkey` FOREIGN KEY (`trailerId`) REFERENCES `Meta`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Episode` ADD CONSTRAINT `Episode_animeId_fkey` FOREIGN KEY (`animeId`) REFERENCES `Anime`(`animeId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ServerSource` ADD CONSTRAINT `ServerSource_episodeId_fkey` FOREIGN KEY (`episodeId`) REFERENCES `Episode`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
