module.exports = (routes) => {
    const UsersController = require('../controllers/users-controller');
    const usersRoutes = UsersController.routes();
    const BaseController = require('../controllers/base-controller');

    routes.route(usersRoutes.users)
        .get(BaseController.verifyJWT, UsersController.get)
        .post(BaseController.verifyJWT, UsersController.add);

    routes.route(usersRoutes.usersId)
        .get(BaseController.verifyJWT, UsersController.getById)
        .put(BaseController.verifyJWT, UsersController.update)
        .delete(BaseController.verifyJWT, UsersController.delete);      
    
    routes.route(usersRoutes.login)
        .get(UsersController.getAuthentication);
}