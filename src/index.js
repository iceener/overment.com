import express from 'express';
import bodyParser from 'body-parser';
import { join } from 'path';
import settings from './config/settings';

const app = express();

app.get('/', (req, res) => {
    res.render('pages/index');
});

app.set('view engine', 'pug');
app.set('views', join(__dirname, 'views'));
app.use(express.static(join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(settings.server.port || 8080, () => console.log('Server is up!'));