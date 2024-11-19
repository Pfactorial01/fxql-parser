-- CreateTable
CREATE TABLE "Entry" (
    "id" SERIAL NOT NULL,
    "source_currency" VARCHAR(3) NOT NULL,
    "destination_currency" VARCHAR(3) NOT NULL,
    "sell_price" DECIMAL(15,5) NOT NULL DEFAULT 0,
    "buy_price" DECIMAL(15,5) NOT NULL DEFAULT 0,
    "cap_amount" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Entry_pkey" PRIMARY KEY ("id")
);
