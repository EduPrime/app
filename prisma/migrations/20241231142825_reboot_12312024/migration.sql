-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "role" TEXT NOT NULL,
    "tenantId" UUID NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
