-- CreateTable
CREATE TABLE "meter" (
    "id" SERIAL NOT NULL,
    "metername" TEXT NOT NULL,
    "meterid" TEXT NOT NULL,
    "metertype" TEXT NOT NULL,
    "panel" TEXT NOT NULL,
    "manufacturer" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "serialnum" TEXT NOT NULL,
    "commissiondate" TEXT NOT NULL,
    "voltage" TEXT NOT NULL,
    "ratio" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "meter_pkey" PRIMARY KEY ("id")
);
