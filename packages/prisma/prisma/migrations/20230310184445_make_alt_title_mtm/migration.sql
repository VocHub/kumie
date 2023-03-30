-- DropForeignKey
ALTER TABLE `AltTitles` DROP FOREIGN KEY `AltTitles_metaId_fkey`;

-- CreateTable
CREATE TABLE `_AltTitlesToMeta` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_AltTitlesToMeta_AB_unique`(`A`, `B`),
    INDEX `_AltTitlesToMeta_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_AltTitlesToMeta` ADD CONSTRAINT `_AltTitlesToMeta_A_fkey` FOREIGN KEY (`A`) REFERENCES `AltTitles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AltTitlesToMeta` ADD CONSTRAINT `_AltTitlesToMeta_B_fkey` FOREIGN KEY (`B`) REFERENCES `Meta`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
