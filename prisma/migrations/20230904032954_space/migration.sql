-- CreateTable
CREATE TABLE "Space" (
    "id" SERIAL NOT NULL,
    "country" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "area" TEXT NOT NULL,
    "building" TEXT NOT NULL,
    "floor" TEXT NOT NULL,
    "zone" TEXT NOT NULL,
    "dimensions" TEXT NOT NULL,
    "areasq" TEXT NOT NULL,
    "occupancy" TEXT NOT NULL,
    "spacetype" TEXT NOT NULL,
    "purposeusage" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Space_pkey" PRIMARY KEY ("id")
);
