import express from "express";
import dotenv from "dotenv";
import { connectMongoDB } from "./config/mongodb.config.js";
import { __dirname, storagePath } from "./utils/path.js";
import cors from "cors";
import tournamentRoutes from "./routes/tournaments.routes.js";
import playerRoutes from "./routes/players.routes.js";
import authRoutes from "./routes/auth.routes.js";
import storageRoutes from "./routes/storage.routes.js";
import morgan from "morgan";

dotenv.config();
const PORT = process.env.PORT;

const app = express();

app.use(morgan("dev"));

app.use(cors());

app.disable("x-powered-by");
app.use(express.json());
app.use(express.static(`${__dirname}/storage`));

connectMongoDB();

app.use("/api/tournaments", tournamentRoutes);
app.use("/api/players", playerRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/storage", storageRoutes);

app.listen(PORT, () => console.log(`Server running, listening on PORT: ${PORT}`));
