-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "priceOferta" DOUBLE PRECISION NOT NULL,
    "mesOferta" INTEGER NOT NULL,
    "inStock" INTEGER NOT NULL,
    "gender" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "sizes" JSONB NOT NULL,
    "tags" JSONB NOT NULL,
    "images" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");
