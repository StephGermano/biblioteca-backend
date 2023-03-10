const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function get(req, res) {
  res.json(await prisma.book.findMany());
}

async function getBookRented(req, res) {
  res.json(
    await prisma.book.findMany({
      where: {
        isRented: true,
      },
    })
  );
}

async function createBook(req, res) {
  const book = await prisma.book.create({
    data: req.body,
  });
  res.json(book);
}

async function updateDailyValue(req, res) {
  const findBook = await prisma.book.findUnique({
    where: {
      id: parseInt(req.body.id),
    },
  });

  findBook.dailyValue = req.body.dailyValue;

  const update = await prisma.book.update({
    data: findBook,
    where: {
      id: req.body.id,
    },
  });

  res.json(findBook);
}

module.exports = { get, createBook, getBookRented, updateDailyValue };
