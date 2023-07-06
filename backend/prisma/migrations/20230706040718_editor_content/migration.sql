-- CreateTable
CREATE TABLE "editor_content" (
    "id" SERIAL NOT NULL,
    "data" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(6),

    CONSTRAINT "editor_content_pkey" PRIMARY KEY ("id")
);
