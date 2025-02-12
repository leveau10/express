/*
  Warnings:

  - You are about to drop the column `tipoServicoId` on the `Prestador` table. All the data in the column will be lost.
  - Added the required column `clienteId` to the `Servico` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prestadorId` to the `Servico` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Prestador" DROP CONSTRAINT "Prestador_tipoServicoId_fkey";

-- AlterTable
ALTER TABLE "Prestador" DROP COLUMN "tipoServicoId";

-- AlterTable
ALTER TABLE "Servico" ADD COLUMN     "clienteId" INTEGER NOT NULL,
ADD COLUMN     "prestadorId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Servico" ADD CONSTRAINT "Servico_prestadorId_fkey" FOREIGN KEY ("prestadorId") REFERENCES "Prestador"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Servico" ADD CONSTRAINT "Servico_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
