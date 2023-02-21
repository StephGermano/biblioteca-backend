const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function get(req, res) {
  res.json(await prisma.book.findMany());
}

async function createBook(req, res) {
  const book = await prisma.book.create({
    data: req.body,
  });
  res.json(book);
}

module.exports = { get, createBook };
