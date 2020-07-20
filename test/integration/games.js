const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server');

chai.should();

chai.use(chaiHttp);

describe('Games Control - Games APIs', () => {

    var idTest;
    /**
     * Test POST
     */
    describe('POST games', () => {
        it('It should POST a new Game', (done) => {
            const game = {
                title: 'Pokémon Red'
            };
            chai.request(server)                
                .post('/games')
                .send(game)
                .end((err, resp) => {
                    resp.should.have.status(201);
                    idTest = resp.body.id;
                    done();
                });
        });

        it('It should NOT POST a new Game with the titulo property empty', (done) => {
            const game = {
                title: ''
            };
            chai.request(server)                
                .post('/games')
                .send(game)
                .end((err, resp) => {
                    resp.should.have.status(400);
                done();
                });
        });

    });    

    
    /**
     * Test GET
     */
    describe('GET games', () => {
        it('It should GET all the Games', (done) => {
            chai.request(server)
                .get('/games')
                .end((err, resp) => {
                    resp.should.have.status(200);
                    resp.body.should.be.a('array');

                    done();
                })
        });

        it('It should NOT GET all the Games', (done) => {
            chai.request(server)
                .get('/api/jogo')
                .end((err, resp) => {
                    resp.should.have.status(404);

                    done();
                })
        });    
    });

    /**
     * Test GET (by id)
     */
    describe('GET games/:id', () => {
        it('It should GET Games by ID', (done) => {
            chai.request(server)
                .get('/games/' + idTest)
                .end((error, resp) => {
                    resp.should.have.status(200);
                    resp.body.should.be.a('object');
                    resp.body.should.have.property('id');
                    resp.body.should.have.property('title');
                    resp.body.should.have.property('title').eq('Pokémon Red');

                    done();
                })
        });

        it('It should NOT GET a game by ID', (done) => {
            const gameId = 9999;

            chai.request(server)
                .get('/games/' + gameId)
                .end((error, resp) => {
                    resp.should.have.status(204);

                    done();
                })
        })

    });

    /**
     * Test PUT
     */
    describe("PUT Games", () => {
        it("It should PUT an existing Game", (done) => {
            const game = {
                title: 'The Legend of Zelda - Ocarina of Time'
            };

            chai.request(server)                
                .put("/games/" + idTest)
                .send(game)
                .end((err, resp) => {
                    resp.should.have.status(202);
                    resp.body.should.be.a('object');
                    resp.body.should.have.property('id').eq(idTest);
                    resp.body.should.have.property('title').eq('The Legend of Zelda - Ocarina of Time');
                done();
                });
        });
    });

    /**
     * Test DELETE
     */
    describe("DELETE Games", () => {
        it("It should DELETE an existing Game", (done) => {

            chai.request(server)                
                .delete("/games/" + idTest)
                .end((err, resp) => {
                    resp.should.have.status(202);
                done();
                });
        });
    });

});

