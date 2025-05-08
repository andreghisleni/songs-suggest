/*
  Warnings:

  - You are about to drop the column `album` on the `songs` table. All the data in the column will be lost.
  - Added the required column `spotify_id` to the `songs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "songs" DROP COLUMN "album",
ADD COLUMN     "image" TEXT,
ADD COLUMN     "spotify_id" TEXT NOT NULL;
