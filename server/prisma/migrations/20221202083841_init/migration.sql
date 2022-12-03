/*
  Warnings:

  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `user` table. All the data in the column will be lost.
  - Added the required column `userId` to the `playground` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "playground" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "user" DROP CONSTRAINT "user_pkey",
DROP COLUMN "id",
ADD COLUMN     "password" TEXT,
ADD CONSTRAINT "user_pkey" PRIMARY KEY ("email");

-- AddForeignKey
ALTER TABLE "playground" ADD CONSTRAINT "playground_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
