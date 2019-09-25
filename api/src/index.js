const express = require('express');
const characterRouter = require('./routers/character');
const episodeRouter = require('./routers/episode');
const guestRouter = require('./routers/guest');
require('./db/mongoose');

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(characterRouter);
app.use(episodeRouter);
app.use(guestRouter);

app.get('/', (req, res) => {
    res.send('hello world');
});

app.listen(port, () => console.log(`Server is listening on port ${port}
`));
