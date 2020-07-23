const assert = require('assert');
const { users } = require('../../src/app/models');

var idUserCreatedToTest;
describe('Unit Test Users Model', () => {

    it('Insert a USER', (done) => {
        const newUser = {
            name: 'System User',
            email: 'su@something.com',
            password: '`S)}tP2q'
        }

        const usersCreated = users.create(newUser);
        done();
        idUserCreatedToTest = usersCreated.id;
        assert.equal(usersCreated.name, 'System User');

    });

    it('Get all USERS', () => {
        const usersGot = users.findAll();
        assert.isDefined(usersGot, 'There are user record.');
    })

    it('Got one USER', () => {
        const userGot = users.findByPk(idUserCreatedToTest);
        assert.equal(userGot.name, 'System User');
    })

    it('Update a USER', () => {
        const userRecord = {
            name: 'Usuário do Sistema',
            email: 'su@something.com',
            password: '`S)}tP2q'
        }

        const userUpdated = users.findByPk(idUserCreatedToTest);
        userUpdated.update(userRecord);
        
        assert.equal(userUpdated.name, 'Usuário do Sistema');
    });   
    
    it('Delete a USER', () => {
        const userDeleted = users.findByPk(idUserCreatedToTest);
        userDeleted.destroy();
        
        assert.isNotOk(userDeleted);
    });     
});


