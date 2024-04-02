/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Workspace" DROP CONSTRAINT "Workspace_userUser_id_fkey";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "user_id" DROP DEFAULT,
ALTER COLUMN "user_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("user_id");
DROP SEQUENCE "User_user_id_seq";

-- AlterTable
ALTER TABLE "Workspace" ALTER COLUMN "userUser_id" SET DATA TYPE TEXT;

-- DropEnum
DROP TYPE "Header";

-- DropEnum
DROP TYPE "Protocols";

-- DropEnum
DROP TYPE "Statuses";

-- AddForeignKey
ALTER TABLE "Workspace" ADD CONSTRAINT "Workspace_userUser_id_fkey" FOREIGN KEY ("userUser_id") REFERENCES "User"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;
