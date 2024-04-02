/*
  Warnings:

  - Changed the type of `valid_header` on the `Routes` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Routes" DROP COLUMN "valid_header",
ADD COLUMN     "valid_header" TEXT NOT NULL;
