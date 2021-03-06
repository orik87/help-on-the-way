const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');

const sessionMiddleware = require('./session');
const authCookieToHeaderMiddleware = require('./authCookieToHeader');
const postgraphqlMiddlesware = require('./postgraphql');
const shortUrlMiddleware = require('./shortUrl');
const volunteerToGroupAdderMiddleware = require('./volunteerToGroupAdder');
const cors = require('./cors');

const init = app => {
	app.use(cors());
	app.use(sessionMiddleware);
	app.use(cookieParser());
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(authCookieToHeaderMiddleware);
	app.use(volunteerToGroupAdderMiddleware);
	app.use(postgraphqlMiddlesware);
	app.use(shortUrlMiddleware);
};

module.exports = {
	init
};
