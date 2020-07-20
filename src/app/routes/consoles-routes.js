module.exports = (routes) => {
    const ConsolesController = require('../controllers/consoles-controller');
    const consolesRoutes = ConsolesController.routes();

    routes.route(consolesRoutes.console)
        .get(ConsolesController.get)
        .post(ConsolesController.add);

    routes.route(consolesRoutes.consoleId)
        .get(ConsolesController.getById)
        .put(ConsolesController.update)
        .delete(ConsolesController.delete);
}
