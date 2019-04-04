import express from 'express';
import bodyParser from 'body-parser';
import { join } from 'path';
import settings from './config/settings';
import webpack from 'webpack';
import webpackConfig from '../webpack.config';
import reload from 'reload';

const app = express();

if (process.env.NODE_ENV === 'development') {
    const compiler = webpack(webpackConfig);
    app.use(require("webpack-dev-middleware")(compiler, {
        noInfo: true, publicPath: webpackConfig.output.publicPath
    }));
    app.use(require("webpack-hot-middleware")(compiler));
}

app.get('/', (req, res) => {
    res.render('pages/index');
});

app.set('view engine', 'pug');
app.set('views', join(__dirname, 'views'));
app.use(express.static(join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

if (process.env.NODE_ENV === 'development') reload(app);

app.listen(settings.server.port || 8080, () => console.log('Server is up!'));