const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const compression = require('compression');
const history = require('connect-history-api-fallback');
const port = process.env.PORT || 5000;

app.use(compression({
    filter: (req, res) => { let x = compression.filter(req, res); console.log('to-be-compressed', x, ' ', req.originalUrl); return x; }
}));
app.use(bodyParser.json());
app.use(history());
if (process.env.NODE_ENV === 'production') {
    // Static folder
    app.use(express.static(__dirname + '/dist/'));

    // Handle MPA
    app.get(/.*/, (req, res) => {
        res.sendFile(__dirname + '/dist/index.html');
    });
}

app.listen(port, () => {
    console.log(`Running on Port http://localhost:${port}`);
});