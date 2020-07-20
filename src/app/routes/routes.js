const { Router } = require('express');
const gamesRoutes = require('./games-routes');
const consolesRoutes = require('./consoles-routes');

const routes = Router();
gamesRoutes(routes);
consolesRoutes(routes);

module.exports = routes;
