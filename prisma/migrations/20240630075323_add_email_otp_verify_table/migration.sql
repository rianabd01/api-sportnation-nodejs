-- AlterTable
ALTER TABLE `customer` ADD COLUMN `createdAt` DATETIME(3) NULL,
    ADD COLUMN `isActive` INTEGER NULL DEFAULT 0;

-- CreateTable
CREATE TABLE `otp` (
    `email` VARCHAR(191) NOT NULL,
    `otp` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`email`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
