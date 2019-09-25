const express = require('express');
require('./db/mongoose');

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('hello world');
});

app.listen(port, () => console.log(`Server is listening on port ${port}
`));
