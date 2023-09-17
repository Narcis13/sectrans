-- CreateTable
CREATE TABLE `transferuri` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `numefisier` VARCHAR(255) NOT NULL,
    `numepacient` VARCHAR(100) NULL,
    `adresaemail` VARCHAR(100) NOT NULL,
    `mesaj` VARCHAR(1000) NULL,
    `dataincarcare` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `dataexpirare` DATETIME(0) NOT NULL,
    `stare` VARCHAR(20) NOT NULL,
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
