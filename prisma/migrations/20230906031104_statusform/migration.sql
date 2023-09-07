-- CreateTable
CREATE TABLE "MStatus" (
    "id" SERIAL NOT NULL,
    "status" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "warrantyinfo" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MStatus_pkey" PRIMARY KEY ("id")
);
