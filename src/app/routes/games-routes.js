module.exports = (routes) => {
    const GamesController = require('../controllers/games-controller');
    const gamesRoutes = GamesController.routes();

    routes.route(gamesRoutes.games)
        .get(GamesController.get)
        .post(GamesController.add);

        routes.route(gamesRoutes.gamesId)
        .get(GamesController.getById)
        .put(GamesController.update) 
        .delete(GamesController.delete);
}
