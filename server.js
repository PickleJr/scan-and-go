const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;


if (process.env.NODE_ENV === 'production') {
    app.use((req, res, next) => {
        if(req.secure) {
            next();
        } else {
            res.redirect('https://' + req.headers.host + req.url);
        }
    });

    app.use(express.static(path.join(__dirname, 'client/build')));

    app.get('*', function(req, res) {
        res.sendfile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

app.listen(port, () => console.log(`Listening on port ${port}`));