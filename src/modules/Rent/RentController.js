const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const moment = require("moment");

async function switchRentBook(rentUpdate) {
  const statusChange = await prisma.book.findUnique({
    where: {
      id: parseInt(rentUpdate),
    },
  });

  statusChange.isRented = !statusChange.isRented;

  const updateStatus = await prisma.book.update({
    data: statusChange,
    where: {
      id: statusChange.id,
    },
  });
}

async function get(req, res) {
  res.json(
    await prisma.rent.findMany({
      include: {
        Book: true,
        Client: true,
      },
    })
  );
}

async function create(req, res) {
  const rentBook = await prisma.rent.create({
    data: req.body,
  });

  switchRentBook(req.body.bookId);

  res.json(rentBook);
}

async function put(req, res) {
  const rent = await prisma.rent.findUnique({
    where: {
      id: parseInt(req.body.id),
    },
  });

  let findBook = await prisma.book.findUnique({
    where: {
      id: rent.bookId,
    },
  });

  let daysRent = moment(req.body.returnDate).diff(rent.dataRent, "days");
  let rentValue = parseFloat(daysRent) * parseFloat(findBook.dailyValue);

  rent.amount = rentValue;
  rent.returnDate = req.body.returnDate;

  const updateRent = await prisma.rent.update({
    data: rent,
    where: {
      id: req.body.id,
    },
  });

  switchRentBook(rent.bookId);

  res.json(updateRent);
}

module.exports = { get, create, put };
