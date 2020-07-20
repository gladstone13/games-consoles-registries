const { consoles } = require('../models');

class ConsolesController {

    routes() {
        return {
            console: '/console',
            consoleId: '/console/:id'
        }
    }

    async get(req, resp) {
        try {
            const consolesJson = await consoles.findAll();

            return resp.status(200).json(consolesJson);
        } catch(err) {
            console.log(err);
            return resp.status(400).json( {'Error': err} );
        }
    }

    async getById(req, resp) {
        try {
            let id = req.params.id;
            const consolesJson = await consoles.findByPk(id);

            if(consolesJson === null) {
                return resp.status(204).json( {} );
            }

            return resp.status(200).json(consolesJson);
        } catch(err) {
            console.log(err);
            return resp.status(400).json( {'Error': err} );
        }
    }

    async add(req, resp) {
        try {
            let newConsole = req.body;
            const consolesJson = await consoles.create(newConsole);

            return resp.status(201).json(consolesJson);
        } catch (err) {
            console.log(err);
            return resp.status(400).json( {'Error': err} );
        }
    }    

    async update(req, resp) {
        try {
            let id = req.params.id;
            const consolesJson = await consoles.findByPk(id);

            if(consolesJson === null) {
                return resp.status(204).json( {} );
            }

            let consoleUpdated = req.body;
            await consolesJson.update(consoleUpdated);

            return resp.status(202).json(consolesJson);
        } catch(err) {
            console.log(err);
            return resp.status(400).json( {'Error': err} );
        }
    }

    async delete(req, resp) {
        try {
            let id = req.params.id;
            const consolesJson = await consoles.findByPk(id);

            if(consolesJson === null) {
                return resp.status(204).json( {} );
            }

            await consolesJson.destroy();
            return resp.status(202).json({ idDeleted: id });            
        } catch (err) {
            console.log(err);
            return resp.status(400).json( {'Error': err} );
        }
    }
}

module.exports = new ConsolesController();