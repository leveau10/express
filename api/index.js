const express = require('express')
const app = express()
const port = 8082

const cors = require('cors');
app.use(cors());
app.use(express.json());

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My API",
      version: "1.0.0",
      description: "API documentation",
    },
    servers: [
      {
        url: "http://localhost:8082",
      },
    ],
  },
  apis: ["./index.js"], // Update with the correct filename
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * /:
 *   get:
 *     summary: Root Endpoint
 *     description: Returns a simple "Hello World!" message.
 *     tags: [Hello World]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Hello World!"
 */
app.get('/', (req, res) => {
  res.send('Hello World!')
})

/**
 * @swagger
 * /clientes:
 *   post:
 *     summary: Cria um novo cliente
 *     tags: [Clientes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 description: Nome do cliente
 *                 example: João 
 *               sobrenome:
 *                 type: string
 *                 example: Silva
 *               timeDoCoracao:
 *                 type: string
 *                 example: Alecrim Futebol Clube
 *               
 *     responses:
 *       201:
 *         description: Cliente criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 nome:
 *                   type: string
 *                   example: João Silva
 * 
 *                
 *                 dataCadastro:
 *                   type: string
 *                   format: date-time
 *                   example: 2023-10-25T12:00:00.000Z
 *       500:
 *         description: Erro interno do servidor
 */
app.post('/clientes/', async (req, res) => {
  const { nome, sobrenome, timeDoCoracao } = req.body;

  if (!nome) {
    return res.status(400).json({ error: 'O campo "nome" é obrigatório.' });
  }

  if (!sobrenome) {
    return res.status(400).json({ error: 'O campo "sobrenome" é obrigatório.' });
  }

  if (!timeDoCoracao) {
    return res.status(400).json({ error: 'O campo "timeDoCoracao" é obrigatório.' });
  }

  try {
    const cliente = await prisma.cliente.create({
      data: {
        nome,
        sobrenome,
        timeDoCoracao
      },
    });
    res.status(201).json(cliente);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar cliente', details: error.message });
  }
});


/**
 * @swagger
 * /clientes/{id}:
 *   put:
 *     summary: Atualiza um cliente pelo ID
 *     description: Atualiza o nome, sobrenome e time do coração de um cliente específico
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do cliente a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               sobrenome:
 *                 type: string
 *               timeDoCoracao:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cliente atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 nome:
 *                   type: string
 *                 sobrenome:
 *                   type: string
 *                 timeDoCoracao:
 *                   type: string
 *       500:
 *         description: Erro ao atualizar cliente
 */
app.put('/clientes/:clienteId', async (req, res) => {
  const { nome, sobrenome, timeDoCoracao } = req.body;
  clienteId = parseInt(req.params.clienteId)

  try {
    const cliente = await prisma.cliente.update({
      where:{
        id: clienteId
      },
      data: {
        nome,
        sobrenome,
        timeDoCoracao
      },
    });
    res.status(200).json(cliente);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar cliente', details: error.message });
  }
})

/**
 * @swagger
 * /clientes/{clienteId}:
 *   delete:
 *     summary: Excluir um cliente pelo ID
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: clienteId
 *         required: true
 *         schema:
 *           type: integer
 *         description: O ID do cliente a ser excluído
 *     responses:
 *       200:
 *         description: Cliente excluído com sucesso
 *       500:
 *         description: Erro interno do servidor
 */
app.delete('/clientes/:clienteId', async (req, res) => {
  clienteId = parseInt(req.params.clienteId)

  try {
    const cliente = await prisma.cliente.delete({
      where:{
        id: clienteId
      }
    })
    res.status(200).json(cliente);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar o  cliente', details: error.message });
  }
})

/**
 * @swagger
 * /clientes/{clienteId}:
 *   get:
 *     summary: Recuperar um cliente pelo ID
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: clienteId
 *         required: true
 *         schema:
 *           type: integer
 *         description: O ID do cliente a ser encontrado
 *     responses:
 *       200:
 *         description: Cliente encontrado com sucesso
 *       500:
 *         description: Erro interno do servidor
 */
app.get('/clientes/:clienteId', async (req, res) => {
  clienteId = parseInt(req.params.clienteId)
  try {
    const cliente = await prisma.cliente.findUnique({
      where:{
        id: clienteId
      }
    })
    res.status(200).json(cliente);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao encontrar o  cliente', details: error.message });
  }
})

/**
 * @swagger
 * /clientes:
 *   get:
 *     summary: Lista todos os clientes
 *     tags: [Clientes]
 *     responses:
 *       200:
 *         description: Lista de clientes retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   nome:
 *                     type: string
 *                     example: João Silva
 *                   dataCadastro:
 *                     type: string
 *                     format: date-time
 *                     example: 2023-10-25T12:00:00.000Z
 *                   ordensServico:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 1
 *                         clienteServicoId:
 *                           type: integer
 *                           example: 1
 *                         prestadorServicoId:
 *                           type: integer
 *                           example: 1
 *                         dataCadastro:
 *                           type: string
 *                           format: date-time
 *                           example: 2023-10-25T12:10:00.000Z
 *                         dataAgendamento:
 *                           type: string
 *                           format: date-time
 *                           example: 2023-10-30T14:00:00.000Z
 *       500:
 *         description: Erro interno do servidor
 */
app.get('/clientes/', async (req, res) => {
  try {
    const clientes = await prisma.cliente.findMany();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar clientes', details: error.message });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  console.log(`Documentação Swagger disponível em http://localhost:${port}/api-docs`);
}) 