const express = require("express");
const { Sequelize } = require("sequelize");
require("dotenv").config();

const app = express();

// Connect to MySQL database from the server
// const sequelize = new Sequelize("dinosaurs", "root", process.env.DB_PASSWORD, {
//   dialect: "postgres",
//   host: "dpg-cmleg67109ks7391ke5g-a",
// });

const sequelize = new Sequelize("birds_p3h2", "root", process.env.DB_PASSWORD, {
  dialect: "postgres",
  host: "dpg-cnfcae21hbls738ukcpg-a",
});

// Define a model
// const Dinosaur = sequelize.define("Dinosaur", {
//   name: { type: Sequelize.STRING },
//   person: { type: Sequelize.STRING },
//   votes: { type: Sequelize.INTEGER },
//   bracket: { type: Sequelize.STRING },
// });

const Bird = sequelize.define("Bird", {
  name: { type: Sequelize.STRING },
  person: { type: Sequelize.STRING },
  votes: { type: Sequelize.INTEGER },
  bracket: { type: Sequelize.STRING },
});

// Sync the model with the database
sequelize.sync({force: true}); // add force: true to drop the db and recreate it

// Middleware
app.use(express.json());

// Endpoints
// app.get("/api/dinosaurs", async (req, res) => {
//   const allDinosaurs = await Dinosaur.findAll();
//   res.json(allDinosaurs);
// });

app.get("/api/birds", async (req, res) => {
  const allBirds = await Bird.findAll();
  res.json(allBirds);
});

// app.post("/api/dinosaurs", async (req, res) => {
//   // TODO: handle an array
//   const newDinosaur = await Dinosaur.create(req.body);
//   res.json(newDinosaur);
// });

app.post("/api/birds", async (req, res) => {
  // TODO: handle an array
  const newBird = await Bird.create(req.body);
  res.json(newBird);
});

// app.post("/api/dinosaurs/:bracket/:name", async (req, res) => {
//   const dinosaur = await Dinosaur.findOne({
//     where: { bracket: req.params.bracket, name: req.params.name },
//   });
//   if (dinosaur) {
//     dinosaur.increment("votes", { by: 1 });
//     res.status(200).json(dinosaur);
//   } else {
//     return res.status(404).json({ message: "Dinosaur not found" });
//   }
// });

app.post("/api/birds/:bracket/:name", async (req, res) => {
  const bird = await Bird.findOne({
    where: { bracket: req.params.bracket, name: req.params.name },
  });
  if (bird) {
    bird.increment("votes", { by: 1 });
    res.status(200).json(bird);
  } else {
    return res.status(404).json({ message: "Bird not found" });
  }
});

// Protection middleware
// app.use((req, res, next) => {
//   const token = req.headers.authorization;
//   if (token !== "secret-token") {
//     return res.status(401).json({ message: "Unauthorized" });
//   }
//   next();
// });

// Start the server
app.listen(3001, () => {
  console.log("Server started on port 3001");
});