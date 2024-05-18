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

-- CreateIndex
CREATE FULLTEXT INDEX `Book_author_title_idx` ON `Book`(`author`, `title`);

-- CreateIndex
CREATE FULLTEXT INDEX `Book_author_title_description_idx` ON `Book`(`author`, `title`, `description`);
