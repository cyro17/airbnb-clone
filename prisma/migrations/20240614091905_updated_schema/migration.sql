-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "profileImage" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Home" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "guests" TEXT,
    "bedrooms" TEXT,
    "bathrooms" TEXT,
    "country" TEXT,
    "photo" TEXT,
    "price" INTEGER,
    "categoryName" TEXT,
    "addedCategory" BOOLEAN NOT NULL DEFAULT false,
    "addedDescription" BOOLEAN NOT NULL DEFAULT false,
    "addedLocation" BOOLEAN NOT NULL DEFAULT false,
    "createdAT" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,

    CONSTRAINT "Home_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- AddForeignKey
ALTER TABLE "Home" ADD CONSTRAINT "Home_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
