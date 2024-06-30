/*
  Warnings:

  - The primary key for the `otp` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `otpId` to the `otp` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `otp` DROP PRIMARY KEY,
    ADD COLUMN `otpId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`otpId`);
