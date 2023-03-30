-- CreateTable
CREATE TABLE `Meta` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `synopsis` VARCHAR(191) NOT NULL,
    `type` ENUM('ANIME', 'MANGA', 'FICTIO') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `latestContent` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Meta_title_key`(`title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Anime` (
    `animeId` INTEGER NOT NULL,

    PRIMARY KEY (`animeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Content` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `animeId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Fiction` (
    `fictionId` INTEGER NOT NULL,

    PRIMARY KEY (`fictionId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Manga` (
    `mangaId` INTEGER NOT NULL,

    PRIMARY KEY (`mangaId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AltTitles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `metaId` INTEGER NOT NULL,

    UNIQUE INDEX `AltTitles_title_key`(`title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Author` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Author_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Genre` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `genre` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Genre_genre_key`(`genre`),
    INDEX `Genre_genre_idx`(`genre`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Studio` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Studio_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_MetaToStudio` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_MetaToStudio_AB_unique`(`A`, `B`),
    INDEX `_MetaToStudio_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_AuthorToMeta` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_AuthorToMeta_AB_unique`(`A`, `B`),
    INDEX `_AuthorToMeta_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_GenreToMeta` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_GenreToMeta_AB_unique`(`A`, `B`),
    INDEX `_GenreToMeta_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Anime` ADD CONSTRAINT `Anime_animeId_fkey` FOREIGN KEY (`animeId`) REFERENCES `Meta`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Content` ADD CONSTRAINT `Content_animeId_fkey` FOREIGN KEY (`animeId`) REFERENCES `Anime`(`animeId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Fiction` ADD CONSTRAINT `Fiction_fictionId_fkey` FOREIGN KEY (`fictionId`) REFERENCES `Meta`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Manga` ADD CONSTRAINT `Manga_mangaId_fkey` FOREIGN KEY (`mangaId`) REFERENCES `Meta`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AltTitles` ADD CONSTRAINT `AltTitles_metaId_fkey` FOREIGN KEY (`metaId`) REFERENCES `Meta`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_MetaToStudio` ADD CONSTRAINT `_MetaToStudio_A_fkey` FOREIGN KEY (`A`) REFERENCES `Meta`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_MetaToStudio` ADD CONSTRAINT `_MetaToStudio_B_fkey` FOREIGN KEY (`B`) REFERENCES `Studio`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AuthorToMeta` ADD CONSTRAINT `_AuthorToMeta_A_fkey` FOREIGN KEY (`A`) REFERENCES `Author`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AuthorToMeta` ADD CONSTRAINT `_AuthorToMeta_B_fkey` FOREIGN KEY (`B`) REFERENCES `Meta`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_GenreToMeta` ADD CONSTRAINT `_GenreToMeta_A_fkey` FOREIGN KEY (`A`) REFERENCES `Genre`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_GenreToMeta` ADD CONSTRAINT `_GenreToMeta_B_fkey` FOREIGN KEY (`B`) REFERENCES `Meta`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
