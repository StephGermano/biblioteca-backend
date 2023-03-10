const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function get(req, res) {
  res.json(await prisma.client.findMany());
}

async function createClient(req, res) {
  const client = await prisma.client.create({
    data: req.body,
  });

  res.json(client);
}

async function updateContact(req, res) {
  const client = await prisma.client.findUnique({
    where: {
      id: req.body.id,
    },
  });

  client.contato = req.body.contato;
  const update = await prisma.client.update({
    data: client,
    where: {
      id: client.id,
    },
  });

  res.json(update);
}

async function updateEmail(req, res) {
  const client = await prisma.client.findUnique({
    where: {
      id: req.body.id,
    },
  });

  client.email = req.body.email;
  const update = await prisma.client.update({
    data: client,
    where: {
      id: client.id,
    },
  });

  res.json(update);
}

module.exports = { get, createClient, updateContact, updateEmail };
