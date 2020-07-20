const { Consoles } = require('../models');

class ConsolesController {

    routes() {
        return {
            console: '/console',
            consoleId: '/console/:id'
        }
    }

    async get(req, resp) {
        try {
            const consoles = await Consoles.findAll();

            return resp.status(200).json(consoles);
        } catch(err) {
            console.log(err);
            return resp.status(400).json( {'Error': err} );
        }
    }

    async getById(req, resp) {
        try {
            let id = req.params.id;
            const consoles = await Consoles.findByPk(id);

            if(consoles === null) {
                return resp.status(204).json( {} );
            }

            return resp.status(200).json(consoles);
        } catch(err) {
            console.log(err);
            return resp.status(400).json( {'Error': err} );
        }
    }

    async add(req, resp) {
        try {
            let newConsole = req.body;
            const consoles = await Consoles.create(newConsole);

            return resp.status(201).json(consoles);
        } catch (err) {
            console.log(err);
            return resp.status(400).json( {'Error': err} );
        }
    }    

    async update(req, resp) {
        try {
            let id = req.params.id;
            const consoles = await Consoles.findByPk(id);

            if(consoles === null) {
                return resp.status(204).json( {} );
            }

            let consoleUpdated = req.body;
            await consoles.update(consoleUpdated);

            return resp.status(202).json(consoles);
        } catch(err) {
            console.log(err);
            return resp.status(400).json( {'Error': err} );
        }
    }

    async delete(req, resp) {
        try {
            let id = req.params.id;
            const consoles = await Consoles.findByPk(id);

            if(consoles === null) {
                return resp.status(204).json( {} );
            }

            await consoles.destroy();
            return resp.status(202).json({ idDeleted: id });            
        } catch (err) {
            console.log(err);
            return resp.status(400).json( {'Error': err} );
        }
    }
}

module.exports = new ConsolesController();