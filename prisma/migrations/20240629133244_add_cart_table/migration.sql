-- CreateTable
CREATE TABLE `cart` (
    `cartId` INTEGER NOT NULL AUTO_INCREMENT,
    `customerId` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,
    `productId` INTEGER NOT NULL,

    PRIMARY KEY (`cartId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
