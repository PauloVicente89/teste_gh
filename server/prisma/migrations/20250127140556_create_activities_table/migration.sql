-- CreateTable
CREATE TABLE "activities" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "inicialized_at" TIME NOT NULL,
    "finalized_at" TIME NOT NULL,

    CONSTRAINT "activities_pkey" PRIMARY KEY ("id")
);
