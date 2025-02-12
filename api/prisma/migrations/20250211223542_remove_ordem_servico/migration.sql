/*
  Warnings:

  - You are about to drop the column `nome` on the `Servico` table. All the data in the column will be lost.
  - You are about to drop the `OrdemServico` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `sobrenome` to the `Cliente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timeDoCoracao` to the `Cliente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nome` to the `Prestador` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sobrenome` to the `Prestador` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timeDoCoracao` to the `Prestador` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "OrdemServico" DROP CONSTRAINT "OrdemServico_clienteServicoId_fkey";

-- DropForeignKey
ALTER TABLE "OrdemServico" DROP CONSTRAINT "OrdemServico_prestadorServicoId_fkey";

-- DropIndex
DROP INDEX "Cliente_nome_key";

-- DropIndex
DROP INDEX "Servico_nome_key";

-- AlterTable
ALTER TABLE "Cliente" ADD COLUMN     "sobrenome" TEXT NOT NULL,
ADD COLUMN     "timeDoCoracao" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Prestador" ADD COLUMN     "nome" TEXT NOT NULL,
ADD COLUMN     "sobrenome" TEXT NOT NULL,
ADD COLUMN     "timeDoCoracao" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Servico" DROP COLUMN "nome",
ADD COLUMN     "dataCadastro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "OrdemServico";
