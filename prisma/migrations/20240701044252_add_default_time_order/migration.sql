-- AlterTable
ALTER TABLE `order` MODIFY `orderDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `payment` MODIFY `paymentDate` DATETIME(3) NULL,
    MODIFY `paymentMethod` VARCHAR(191) NULL,
    MODIFY `status` VARCHAR(191) NULL;
