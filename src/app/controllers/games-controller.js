const { Games } = require('../models');

class GamesController{

    routes() {
        return {
            games: '/games',
            gamesId: '/games/:id'
        }
    }

    async get(req, resp) {
        try {
            const games = await Games.findAll();
            if(games === null) {
                return resp.status(204).json({});
            }

            return resp.status(200).json(games);
        } catch(err) {
            console.log(err);
            return resp.status(400).json( {'Error': err} );
        }
    }

    async getById(req, resp) {
        try {
            let id = req.params.id;

            const games = await Games.findByPk(id);
            if(games === null) {
                return resp.status(204).json({});
            }

            return resp.status(200).json(games);
        }catch(err) {
            console.log(err);
            return resp.status(400).json( {'Error': err} );
        }
    }

    async add(req, resp) {
        try {
            let newGame = req.body;
            const games = await Games.create(newGame);

            return resp.status(201).json(games);
        } catch(err) {
            console.log(err);
            return resp.status(400).json( {'Error': err} );
        }
    }

    async update(req, resp) {
        try {
            let id = req.params.id;
            const games = await Games.findByPk(id);

            if(games === null) {
                return resp.status(204).json({});
            }            

            let gameUpdated = req.body;
            await games.update(gameUpdated);

            return resp.status(202).json(games);
        } catch(err) {
            console.log(err);
            return resp.status(400).json( {'Error': err} );
        }
    }

    async delete(req, resp) {
        try {
            let id = req.params.id;
            const games = await Games.findByPk(id);

            if(games === null) {
                return resp.status(204).json({});
            }

            await games.destroy();

            return resp.status(202).json({ idDeleted: id });
        } catch(err) {
            console.log(err);
            return resp.status(400).json( {'Error': err} );
        }
    }
}

module.exports = new GamesController();