/*
  Warnings:

  - The primary key for the `profiles` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[email]` on the table `authors` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "authors" ALTER COLUMN "pais" DROP NOT NULL;

-- AlterTable
ALTER TABLE "profiles" DROP CONSTRAINT "profiles_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "profiles_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "profiles_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "authors_email_key" ON "authors"("email");
