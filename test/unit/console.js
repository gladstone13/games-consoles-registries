const assert = require('assert');
const { consoles } = require('../../src/app/models');

describe('Unit Test Console Model', () => {
    var idConsoleCreatedToTest;

    it('Insert a CONSOLE', () => {
        const newConsole = {
            description: 'Panasonic 3DO'
        }

        const consolesCreated = consoles.create(newConsole);
        assert.equal(consolesCreated.description, 'Panasonic 3DO');
        idConsoleCreatedToTest = consolesCreated.id;
    });

    it('Get all CONSOLES', () => {
        const consolesGot = consoles.findAll();
        assert.exists(consolesGot, 'There are a console record.');
    })

    it('Got one CONSOLES', () => {
        const consolesGot = consoles.findByPk(idConsoleCreatedToTest);
        assert.equal(consolesGot.description, 'Panasonic 3DO');
    })

    it('Update a CONSOLE', () => {
        const consoleRecord = {
            Description: 'Video Jogo'
        }

        const consoleUpdated = consoles.findByPk(idConsoleCreatedToTest);
        consoleUpdated.update(consoleRecord);
        
        assert.equal(consoleUpdated.description, 'Video Jogo');
    });   
    
    it('Delete a CONSOLE', () => {
        const consoleDeleted = consoles.findByPk(idConsoleCreatedToTest);
        consoleDeleted.destroy();
        
        assert.isNotOk(consoleDeleted);
    });       
});