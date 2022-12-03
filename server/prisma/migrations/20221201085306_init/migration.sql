-- CreateEnum
CREATE TYPE "TYPE_OF_PLAYGROUND" AS ENUM ('NODE', 'REACT', 'HTML_CSS');

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "authToken" TEXT,
    "createAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "playground" (
    "id" SERIAL NOT NULL,
    "type" "TYPE_OF_PLAYGROUND" NOT NULL,
    "containerId" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "playground_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "playground-container" (
    "id" TEXT NOT NULL,
    "host" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "playground-container_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "playground_id_key" ON "playground"("id");

-- CreateIndex
CREATE UNIQUE INDEX "playground_containerId_key" ON "playground"("containerId");

-- AddForeignKey
ALTER TABLE "playground" ADD CONSTRAINT "playground_containerId_fkey" FOREIGN KEY ("containerId") REFERENCES "playground-container"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
