# Trabalho Prático ExpressJS

Bem-vindo ao Trabalho Prático de ExpressJS! Para garantir que você tenha uma experiência produtiva e tranquila, siga os passos da aula disponíveis na branch **main**. Após concluir as etapas da aula, você estará preparado para enriquecer seu projeto com os novos modelos que serão adicionados nesta atividade.

## Objetivo

O objetivo deste trabalho prático é que você, na prática, crie novas funcionalidades para o seu projeto. Use, como base, os endpoints implementados para o modelo **Cliente**:

* CRUD para os modelo **Serviço** 
* CRUD para o modelo **Prestador**
* Swagger para os novos endpoints 

Abaixo está o schema que você deverá seguir para a implementação:

```
model Servico {
  id           Int       @id @default(autoincrement())
  nome         String
  categoriaServico String
  dataCadastro DateTime  @default(now())

  prestadorId  Int
  prestador    Prestador @relation(fields: [prestadorId], references: [id])

  clienteId    Int
  cliente      Cliente   @relation(fields: [clienteId], references: [id])
}

model Prestador {
  id           Int        @id @default(autoincrement())
  nome         String     
  sobrenome    String
  timeDoCoracao String
  dataCadastro DateTime   @default(now())

  servicos     Servico[]
}

model Cliente {
  id           Int        @id @default(autoincrement())
  nome         String
  sobrenome    String    
  timeDoCoracao String
  dataCadastro DateTime   @default(now())

  servicos     Servico[]
}
```
