/*
  Warnings:

  - Added the required column `categoriaServico` to the `Servico` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nome` to the `Servico` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Servico" ADD COLUMN     "categoriaServico" TEXT NOT NULL,
ADD COLUMN     "nome" TEXT NOT NULL;
