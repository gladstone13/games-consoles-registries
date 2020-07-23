const assert = require('assert');
const { games } = require('../../src/app/models');

describe('Unit Test Games Model', () => {
    var idGameCreatedToTest;

    it('Insert a GAME', () => {
        const newGame = {
            title: 'Tetris'
        }

        const gamesCreated = games.create(newGame);
        assert.equal(gamesCreated.title, 'Tetris');
        idGameCreatedToTest = gamesCreated.id;
    });

    it('Get all GAMES', () => {
        const gamesGot = games.findAll();
        assert.exists(gamesGot, 'There are a game record.');
    })

    it('Got one GAME', () => {
        const gamesGot = games.findByPk(idGameCreatedToTest);
        assert.equal(gamesGot.title, 'Tetris');
    })

    it('Update a GAME', () => {
        const gameRecord = {
            title: 'Space Invaders'
        }

        const gameUpdated = games.findByPk(idGameCreatedToTest);
        gameUpdated.update(gameRecord);
        
        assert.equal(gameUpdated.title, 'Space Invaders');
    });   
    
    it('Delete a GAME', () => {
        const gameDeleted = games.findByPk(idGameCreatedToTest);
        gameDeleted.destroy();
        
        assert.isNotOk(gameDeleted);
    });      
});
