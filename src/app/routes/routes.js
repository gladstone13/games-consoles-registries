const { Router } = require('express');
const gamesRoutes = require('./games-routes');
const consolesRoutes = require('./consoles-routes');
const usersRoutes = require('./users-routes');

const routes = Router();
gamesRoutes(routes);
consolesRoutes(routes);
usersRoutes(routes);

module.exports = routes;
