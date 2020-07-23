module.exports = (routes) => {
    const GamesController = require('../controllers/games-controller');
    const gamesRoutes = GamesController.routes();
    const BaseController = require('../controllers/base-controller');

    routes.route(gamesRoutes.games)
        .get(BaseController.verifyJWT, GamesController.get)
        .post(GamesController.add);

        routes.route(gamesRoutes.gamesId)
        .get(BaseController.verifyJWT, GamesController.getById)
        .put(BaseController.verifyJWT, GamesController.update) 
        .delete(BaseController.verifyJWT, GamesController.delete);
}
