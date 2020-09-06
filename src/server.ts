import express from "express";
import dotenv from "dotenv";
import characterRouter from "./routes/character.router";
import episodeRouter from "./routes/episode.router";
import guestsRouter from "./routes/guest.router";
import * as db from "./services/db.service";

dotenv.config();

const app: express.Application = express();
db.connect(process.env.MONGO_DB_CONNECTION_STRING!);

app.use("/characters", characterRouter);
app.use("/episodes", episodeRouter);
app.use("/guests", guestsRouter);

app.route("/").get((req: express.Request, res: express.Response): void => {
    res.send({ response: "Ok" });
});

const port: number = parseInt(process.env.PORT || "8000", 10);
const host: string = process.env.HOST || "localhost";

app.listen(port, () => console.log(`Server started on http://${host}:${port}`));