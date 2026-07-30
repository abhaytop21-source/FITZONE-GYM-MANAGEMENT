-- CreateTable
CREATE TABLE `Gym` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `gymCode` VARCHAR(191) NOT NULL,
    `gymName` VARCHAR(191) NOT NULL,
    `gymType` VARCHAR(191) NOT NULL,
    `ownerFirstName` VARCHAR(191) NOT NULL,
    `ownerLastName` VARCHAR(191) NOT NULL,
    `ownerEmail` VARCHAR(191) NOT NULL,
    `ownerPhone` VARCHAR(191) NOT NULL,
    `ownerPassword` VARCHAR(191) NOT NULL,
    `gymEmail` VARCHAR(191) NOT NULL,
    `gymPhone` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `state` VARCHAR(191) NOT NULL,
    `country` VARCHAR(191) NOT NULL,
    `openingTime` VARCHAR(191) NOT NULL,
    `closingTime` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Gym_gymCode_key`(`gymCode`),
    UNIQUE INDEX `Gym_ownerEmail_key`(`ownerEmail`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
