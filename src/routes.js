const { Router } = require("express");
const routes = Router();

const clientController = require("./modules/Client/ClientController");
const bookController = require("./modules/Book/BookController");
const rentController = require("./modules/Rent/RentController");
routes.get("/", (req, res) => {
  res.json("Server ON");
});

// Client Routes
routes.get("/client", clientController.get);
routes.post("/client", clientController.createClient);
routes.put("/clientUpdateContact", clientController.updateContact);
routes.put("/clientUpdateEmail", clientController.updateEmail);

// Books Routes
routes.get("/book", bookController.get);
routes.get("/bookRented", bookController.getBookRented);
routes.post("/book", bookController.createBook);
routes.put("/book", bookController.updateDailyValue);

//Book Rent Routes
routes.get("/rent", rentController.get);
routes.post("/rent", rentController.create);
routes.put("/rent", rentController.put);

module.exports = { routes };
