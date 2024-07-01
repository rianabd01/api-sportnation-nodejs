/*
  Warnings:

  - You are about to drop the column `shipmentAmount` on the `order` table. All the data in the column will be lost.
  - Added the required column `shipmentId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `order` DROP COLUMN `shipmentAmount`,
    ADD COLUMN `shipmentId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Shipment` (
    `shipmentId` INTEGER NOT NULL AUTO_INCREMENT,
    `price` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`shipmentId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_shipmentId_fkey` FOREIGN KEY (`shipmentId`) REFERENCES `Shipment`(`shipmentId`) ON DELETE RESTRICT ON UPDATE CASCADE;
