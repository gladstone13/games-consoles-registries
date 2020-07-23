module.exports = (routes) => {
    const ConsolesController = require('../controllers/consoles-controller');
    const consolesRoutes = ConsolesController.routes();
    const BaseController = require('../controllers/base-controller');

    routes.route(consolesRoutes.console)
        .get(BaseController.verifyJWT, ConsolesController.get)
        .post(BaseController.verifyJWT, ConsolesController.add);

    routes.route(consolesRoutes.consoleId)
        .get(BaseController.verifyJWT, ConsolesController.getById)
        .put(BaseController.verifyJWT, ConsolesController.update)
        .delete(BaseController.verifyJWT, ConsolesController.delete);
}
