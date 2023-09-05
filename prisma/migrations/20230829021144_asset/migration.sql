-- CreateTable
CREATE TABLE "Asset" (
    "id" SERIAL NOT NULL,
    "ename" TEXT NOT NULL,
    "ide" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "subtype" TEXT NOT NULL,
    "manufacturer" TEXT NOT NULL,
    "modelnum" TEXT NOT NULL,
    "serialnum" TEXT NOT NULL,
    "datepurc" TEXT NOT NULL,
    "install" TEXT NOT NULL,
    "controlsys" TEXT NOT NULL,
    "commission" TEXT NOT NULL,
    "datasheet" TEXT NOT NULL,
    "connection" TEXT NOT NULL,
    "foundation" TEXT NOT NULL,
    "mechanical" TEXT NOT NULL,
    "electrical" TEXT NOT NULL,
    "ratedeffiency" TEXT NOT NULL,
    "deviceassociation" TEXT NOT NULL,
    "generalnote" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Asset_pkey" PRIMARY KEY ("id")
);
