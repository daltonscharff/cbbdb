import express from 'express';

const app: express.Application = express();
const port: number = parseInt(process.env.PORT || "8000", 10);
const host: string = process.env.HOST || "localhost";

app.get('/', (req: express.Request, res: express.Response): void => {
    res.send({ response: "OK" });
});

app.listen(port, () => console.log(`Server started on http://${host}:${port}`))