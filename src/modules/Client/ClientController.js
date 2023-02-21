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

module.exports = { get, createClient };
