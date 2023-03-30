/*
  Warnings:

  - The primary key for the `Anime` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `animeId` on the `Anime` table. All the data in the column will be lost.
  - You are about to drop the column `seasonal` on the `Anime` table. All the data in the column will be lost.
  - You are about to drop the column `totalEpisodes` on the `Anime` table. All the data in the column will be lost.
  - The primary key for the `Episode` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `airDate` on the `Episode` table. All the data in the column will be lost.
  - You are about to drop the column `episodeType` on the `Episode` table. All the data in the column will be lost.
  - You are about to drop the column `synopsis` on the `Episode` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Episode` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `Episode` table. The data in that column could be lost. The data in that column will be cast from `Int` to `UnsignedInt`.
  - The primary key for the `Fiction` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `fictionId` on the `Fiction` table. The data in that column could be lost. The data in that column will be cast from `Int` to `UnsignedInt`.
  - The primary key for the `Manga` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `mangaId` on the `Manga` table. The data in that column could be lost. The data in that column will be cast from `Int` to `UnsignedInt`.
  - The primary key for the `Meta` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `anilistId` on the `Meta` table. All the data in the column will be lost.
  - You are about to drop the column `color` on the `Meta` table. All the data in the column will be lost.
  - You are about to drop the column `cover` on the `Meta` table. All the data in the column will be lost.
  - You are about to drop the column `isNsfw` on the `Meta` table. All the data in the column will be lost.
  - You are about to drop the column `malId` on the `Meta` table. All the data in the column will be lost.
  - You are about to drop the column `rating` on the `Meta` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Meta` table. All the data in the column will be lost.
  - You are about to drop the column `synopsis` on the `Meta` table. All the data in the column will be lost.
  - You are about to drop the column `thumbnail` on the `Meta` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `Meta` table. The data in that column could be lost. The data in that column will be cast from `Int` to `UnsignedInt`.
  - The primary key for the `ServerSource` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `ServerSource` table. The data in that column could be lost. The data in that column will be cast from `Int` to `UnsignedInt`.
  - You are about to alter the column `episodeId` on the `ServerSource` table. The data in that column could be lost. The data in that column will be cast from `Int` to `UnsignedInt`.
  - The primary key for the `StreamSource` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `StreamSource` table. The data in that column could be lost. The data in that column will be cast from `Int` to `UnsignedInt`.
  - You are about to drop the `AltTitles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Author` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Genre` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Studio` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Trailer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_AltTitlesToMeta` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_AuthorToMeta` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_GenreToMeta` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_MetaToStudio` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `id` to the `Anime` table without a default value. This is not possible if the table is not empty.
  - Added the required column `serverSourceId` to the `StreamSource` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Anime` DROP FOREIGN KEY `Anime_animeId_fkey`;

-- DropForeignKey
ALTER TABLE `Episode` DROP FOREIGN KEY `Episode_animeId_fkey`;

-- DropForeignKey
ALTER TABLE `Fiction` DROP FOREIGN KEY `Fiction_fictionId_fkey`;

-- DropForeignKey
ALTER TABLE `Manga` DROP FOREIGN KEY `Manga_mangaId_fkey`;

-- DropForeignKey
ALTER TABLE `ServerSource` DROP FOREIGN KEY `ServerSource_episodeId_fkey`;

-- DropForeignKey
ALTER TABLE `Trailer` DROP FOREIGN KEY `Trailer_trailerId_fkey`;

-- DropForeignKey
ALTER TABLE `_AltTitlesToMeta` DROP FOREIGN KEY `_AltTitlesToMeta_A_fkey`;

-- DropForeignKey
ALTER TABLE `_AltTitlesToMeta` DROP FOREIGN KEY `_AltTitlesToMeta_B_fkey`;

-- DropForeignKey
ALTER TABLE `_AuthorToMeta` DROP FOREIGN KEY `_AuthorToMeta_A_fkey`;

-- DropForeignKey
ALTER TABLE `_AuthorToMeta` DROP FOREIGN KEY `_AuthorToMeta_B_fkey`;

-- DropForeignKey
ALTER TABLE `_GenreToMeta` DROP FOREIGN KEY `_GenreToMeta_A_fkey`;

-- DropForeignKey
ALTER TABLE `_GenreToMeta` DROP FOREIGN KEY `_GenreToMeta_B_fkey`;

-- DropForeignKey
ALTER TABLE `_MetaToStudio` DROP FOREIGN KEY `_MetaToStudio_A_fkey`;

-- DropForeignKey
ALTER TABLE `_MetaToStudio` DROP FOREIGN KEY `_MetaToStudio_B_fkey`;

-- DropIndex
DROP INDEX `Meta_title_key` ON `Meta`;

-- AlterTable
ALTER TABLE `Anime` DROP PRIMARY KEY,
    DROP COLUMN `animeId`,
    DROP COLUMN `seasonal`,
    DROP COLUMN `totalEpisodes`,
    ADD COLUMN `id` INTEGER UNSIGNED NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Episode` DROP PRIMARY KEY,
    DROP COLUMN `airDate`,
    DROP COLUMN `episodeType`,
    DROP COLUMN `synopsis`,
    DROP COLUMN `title`,
    MODIFY `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Fiction` DROP PRIMARY KEY,
    MODIFY `fictionId` INTEGER UNSIGNED NOT NULL,
    ADD PRIMARY KEY (`fictionId`);

-- AlterTable
ALTER TABLE `Manga` DROP PRIMARY KEY,
    MODIFY `mangaId` INTEGER UNSIGNED NOT NULL,
    ADD PRIMARY KEY (`mangaId`);

-- AlterTable
ALTER TABLE `Meta` DROP PRIMARY KEY,
    DROP COLUMN `anilistId`,
    DROP COLUMN `color`,
    DROP COLUMN `cover`,
    DROP COLUMN `isNsfw`,
    DROP COLUMN `malId`,
    DROP COLUMN `rating`,
    DROP COLUMN `status`,
    DROP COLUMN `synopsis`,
    DROP COLUMN `thumbnail`,
    MODIFY `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `ServerSource` DROP PRIMARY KEY,
    MODIFY `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    MODIFY `episodeId` INTEGER UNSIGNED NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `StreamSource` DROP PRIMARY KEY,
    ADD COLUMN `serverSourceId` INTEGER UNSIGNED NOT NULL,
    MODIFY `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- DropTable
DROP TABLE `AltTitles`;

-- DropTable
DROP TABLE `Author`;

-- DropTable
DROP TABLE `Genre`;

-- DropTable
DROP TABLE `Studio`;

-- DropTable
DROP TABLE `Trailer`;

-- DropTable
DROP TABLE `_AltTitlesToMeta`;

-- DropTable
DROP TABLE `_AuthorToMeta`;

-- DropTable
DROP TABLE `_GenreToMeta`;

-- DropTable
DROP TABLE `_MetaToStudio`;

-- CreateTable
CREATE TABLE `AnilistMeta` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `anilistId` INTEGER UNSIGNED NOT NULL,
    `animeTitle` VARCHAR(191) NOT NULL,
    `data` JSON NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `metaId` INTEGER UNSIGNED NOT NULL,

    UNIQUE INDEX `AnilistMeta_anilistId_key`(`anilistId`),
    UNIQUE INDEX `AnilistMeta_animeTitle_key`(`animeTitle`),
    UNIQUE INDEX `AnilistMeta_metaId_key`(`metaId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MyAnimeListMeta` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `malId` INTEGER UNSIGNED NOT NULL,
    `animeTitle` VARCHAR(191) NOT NULL,
    `data` JSON NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `metaId` INTEGER UNSIGNED NOT NULL,

    UNIQUE INDEX `MyAnimeListMeta_malId_key`(`malId`),
    UNIQUE INDEX `MyAnimeListMeta_animeTitle_key`(`animeTitle`),
    UNIQUE INDEX `MyAnimeListMeta_metaId_key`(`metaId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AnilistMeta` ADD CONSTRAINT `AnilistMeta_metaId_fkey` FOREIGN KEY (`metaId`) REFERENCES `Meta`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MyAnimeListMeta` ADD CONSTRAINT `MyAnimeListMeta_id_fkey` FOREIGN KEY (`id`) REFERENCES `Meta`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Anime` ADD CONSTRAINT `Anime_id_fkey` FOREIGN KEY (`id`) REFERENCES `Meta`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Episode` ADD CONSTRAINT `Episode_id_fkey` FOREIGN KEY (`id`) REFERENCES `Anime`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ServerSource` ADD CONSTRAINT `ServerSource_episodeId_fkey` FOREIGN KEY (`episodeId`) REFERENCES `Episode`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StreamSource` ADD CONSTRAINT `StreamSource_serverSourceId_fkey` FOREIGN KEY (`serverSourceId`) REFERENCES `ServerSource`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Fiction` ADD CONSTRAINT `Fiction_fictionId_fkey` FOREIGN KEY (`fictionId`) REFERENCES `Meta`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Manga` ADD CONSTRAINT `Manga_mangaId_fkey` FOREIGN KEY (`mangaId`) REFERENCES `Meta`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
