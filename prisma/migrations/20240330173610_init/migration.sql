/*
  Warnings:

  - You are about to drop the column `service_id` on the `Workspace` table. All the data in the column will be lost.
  - You are about to drop the column `userUser_id` on the `Workspace` table. All the data in the column will be lost.
  - Added the required column `name` to the `Workspace` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Workspace" DROP CONSTRAINT "Workspace_userUser_id_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Workspace" DROP COLUMN "service_id",
DROP COLUMN "userUser_id",
ADD COLUMN     "name" TEXT NOT NULL,
ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP;
