-- AddForeignKey
ALTER TABLE `Cart` ADD CONSTRAINT `Cart_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`productId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `customer` RENAME INDEX `customer_email_key` TO `Customer_email_key`;

-- RenameIndex
ALTER TABLE `customer` RENAME INDEX `customer_username_key` TO `Customer_username_key`;
