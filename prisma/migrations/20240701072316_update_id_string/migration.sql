/*
  Warnings:

  - The primary key for the `order` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `payment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Made the column `paymentId` on table `order` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `order` DROP PRIMARY KEY,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `orderId` VARCHAR(191) NOT NULL,
    MODIFY `paymentId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`orderId`);

-- AlterTable
ALTER TABLE `orderitem` MODIFY `orderId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `payment` DROP PRIMARY KEY,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `paymentId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`paymentId`);
