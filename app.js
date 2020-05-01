import express from 'express';
import cors from 'cors';
import api from './routes/index.routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

//CORS Origin allowing
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Methods', '*');
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization, username',
	);
	next();
});

app.use(cors());

//Route path
app.use('/', api());

// 404 - Fot Found error
app.use(function(req, res, next) {
    return res.status(404).send({ message: 'Route' +req.url+' Not found.' });
});

// 500 - Any server error
app.use(function(err, req, res, next) {
    return res.status(500).send({ error: err });
});

//Server running port
const PORT = 2897;
app.listen(PORT, () => {
    console.log(`hyper app server running on the port ${PORT}`);
});

export default app;