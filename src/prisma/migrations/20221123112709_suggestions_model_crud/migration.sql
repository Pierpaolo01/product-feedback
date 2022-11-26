/*
  Warnings:

  - You are about to drop the column `suggestion_status` on the `Suggestion` table. All the data in the column will be lost.
  - Added the required column `status` to the `Suggestion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Suggestion` DROP COLUMN `suggestion_status`,
    ADD COLUMN `status` ENUM('PLANNED', 'INPROGRESS', 'LIVE') NOT NULL;
