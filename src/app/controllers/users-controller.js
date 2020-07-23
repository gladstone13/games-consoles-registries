const { users } = require('../models');
require('dotenv-safe').config();
const jwt = require('jsonwebtoken');

class UsersController{

    routes() {
        return {
            users: '/users',
            usersId: '/users/:id',
            login: '/login/:email/:password'
        }
    }

    async get(req, resp) {
        try {
            const usersJson = await users.findAll();
            if(usersJson === null) {
                return resp.status(204).json({});
            }

            return resp.status(200).json(usersJson);
        } catch(err) {
            console.log(err);
            return resp.status(400).json( {'Error': err} );
        }
    }

    async getById(req, resp) {
        try {
            let id = req.params.id;

            const usersJson = await users.findByPk(id);
            if(usersJson === null) {
                return resp.status(204).json({});
            }

            return resp.status(200).json(usersJson);
        }catch(err) {
            console.log(err);
            return resp.status(400).json( {'Error': err} );
        }
    }

    async getAuthentication(req, resp) { 
        try {
            let email = req.params.email;
            let password = req.params.password

            const usersJson = await users.findOne({
                where: {
                    email: email
                }
            });

            if(usersJson === null){
                return resp.status(204).json({});
            }

            if(password === usersJson.password){
                const id = usersJson.id;
                
                var token = jwt.sign({ id }, process.env.SECRET, {
                    expiresIn: 600 // expires in 10min
                });

                return resp.status(202).json({ auth: true, token: token});
            }

            return resp.status(401).json({ message: 'E-mail or password invalid.'});

        } catch(err) {
            console.log(err);
            return resp.status(400).json( {'Error': err} );
        }
    }

    async getOutAuthentication(req, resp) {
        try {
            resp.json({ auth: false, token: null });
        } catch(err) {
            console.log(err);
            return resp.status(400).json( {'Error': err} ); 
        }
    }

    async add(req, resp) {
        try {
            let newUser = req.body;
            const usersJson = await users.create(newUser);

            return resp.status(201).json(usersJson);
        } catch(err) {
            console.log(err);
            return resp.status(400).json( {'Error': err} );
        }
    }

    async update(req, resp) {
        try {
            let id = req.params.id;
            const usersJson = await users.findByPk(id);

            if(usersJson === null) {
                return resp.status(204).json({});
            }            

            let usersUpdated = req.body;
            await usersJson.update(usersUpdated);

            return resp.status(202).json(usersJson);
        } catch(err) {
            console.log(err);
            return resp.status(400).json( {'Error': err} );
        }
    }

    async delete(req, resp) {
        try {
            let id = req.params.id;
            const usersJson = await users.findByPk(id);

            if(usersJson === null) {
                return resp.status(204).json({});
            }

            await usersJson.destroy();

            return resp.status(202).json({ idDeleted: id });
        } catch(err) {
            console.log(err);
            return resp.status(400).json( {'Error': err} );
        }
    }

}

module.exports = new UsersController();