const express = require('express');
const routes = require('./routes')
const errorMiddleware = require('./middlewares/error-middleware')


const PORT = 3000;
const app = express();

app.use('/', routes);

app.use(errorMiddleware);


app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`))