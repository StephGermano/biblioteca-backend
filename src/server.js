const express = require("express");
const cors = require("cors");
const { routes } = require("./routes");

const PORT = 3030;
const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
  console.log(`Server is runnig at port ${PORT}`);
});
