-- DropForeignKey
ALTER TABLE "playground" DROP CONSTRAINT "playground_userId_fkey";

-- AlterTable
ALTER TABLE "playground" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "playground" ADD CONSTRAINT "playground_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("email") ON DELETE SET NULL ON UPDATE CASCADE;
