/*
  Warnings:

  - You are about to drop the column `markup` on the `SiteContent` table. All the data in the column will be lost.
  - You are about to drop the column `markup` on the `SiteContentHistory` table. All the data in the column will be lost.
  - Added the required column `content` to the `SiteContent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content` to the `SiteContentHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `format` to the `SiteContentHistory` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SiteContentFormat" AS ENUM ('HTML', 'MARKDOWN', 'PLAIN_TEXT');

-- AlterTable
ALTER TABLE "SiteContent" DROP COLUMN "markup",
ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "format" "SiteContentFormat" NOT NULL DEFAULT 'PLAIN_TEXT';

-- AlterTable
ALTER TABLE "SiteContentHistory" DROP COLUMN "markup",
ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "format" "SiteContentFormat" NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "roles" SET DEFAULT ARRAY['USER']::"UserRole"[];
