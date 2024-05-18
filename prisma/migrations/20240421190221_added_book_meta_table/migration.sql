/*
  Warnings:

  - The primary key for the `BookOwnerOnBook` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `startedAt` on the `BookOwnerOnBook` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `endedAt` on the `BookOwnerOnBook` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `time` on the `Comment` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.

*/
-- AlterTable
ALTER TABLE `BookOwnerOnBook` DROP PRIMARY KEY,
    MODIFY `startedAt` TIMESTAMP NOT NULL,
    MODIFY `endedAt` TIMESTAMP NOT NULL,
    ADD PRIMARY KEY (`bookOwnerId`, `startedAt`, `endedAt`);

-- AlterTable
ALTER TABLE `Comment` MODIFY `time` TIMESTAMP NOT NULL;

-- CreateTable
CREATE TABLE `BookMeta` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `thumbnailURL` VARCHAR(2083) NOT NULL,
    `bookId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `BookMeta` ADD CONSTRAINT `BookMeta_bookId_fkey` FOREIGN KEY (`bookId`) REFERENCES `Book`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
