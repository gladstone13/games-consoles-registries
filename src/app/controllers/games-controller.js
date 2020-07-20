const { games } = require('../models');

class GamesController{

    routes() {
        return {
            games: '/games',
            gamesId: '/games/:id'
        }
    }

    async get(req, resp) {
        try {
            const gamesJson = await games.findAll();
            if(gamesJson === null) {
                return resp.status(204).json({});
            }

            return resp.status(200).json(gamesJson);
        } catch(err) {
            console.log(err);
            return resp.status(400).json( {'Error': err} );
        }
    }

    async getById(req, resp) {
        try {
            let id = req.params.id;

            const gamesJson = await games.findByPk(id);
            if(gamesJson === null) {
                return resp.status(204).json({});
            }

            return resp.status(200).json(gamesJson);
        }catch(err) {
            console.log(err);
            return resp.status(400).json( {'Error': err} );
        }
    }

    async add(req, resp) {
        try {
            let newGame = req.body;
            const gamesJson = await games.create(newGame);

            return resp.status(201).json(gamesJson);
        } catch(err) {
            console.log(err);
            return resp.status(400).json( {'Error': err} );
        }
    }

    async update(req, resp) {
        try {
            let id = req.params.id;
            const gamesJson = await games.findByPk(id);

            if(gamesJson === null) {
                return resp.status(204).json({});
            }            

            let gameUpdated = req.body;
            await gamesJson.update(gameUpdated);

            return resp.status(202).json(games);
        } catch(err) {
            console.log(err);
            return resp.status(400).json( {'Error': err} );
        }
    }

    async delete(req, resp) {
        try {
            let id = req.params.id;
            const gamesJson = await games.findByPk(id);

            if(gamesJson === null) {
                return resp.status(204).json({});
            }

            await gamesJson.destroy();

            return resp.status(202).json({ idDeleted: id });
        } catch(err) {
            console.log(err);
            return resp.status(400).json( {'Error': err} );
        }
    }
}

module.exports = new GamesController();