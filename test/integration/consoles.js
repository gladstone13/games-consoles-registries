const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server');

chai.should();

chai.use(chaiHttp);

describe('Games Control - Consoles APIs', () => {

    var idTest;
    /**
     * Test POST
     */
    describe('POST Consoles', () => {
        it('It should POST a new Console', (done) => {
            let consoles = {
                description: 'Playstation'
            };
            chai.request(server)                
                .post('/console')
                .send(consoles)
                .end((err, resp) => {
                    resp.should.have.status(201);
                    idTest = resp.body.id;
                    done();
                });
        });

        it('It should NOT POST a new Console with the titulo property empty', (done) => {
            let consoles = {
                description: ''
            };
            chai.request(server)                
                .post('/console')
                .send(consoles)
                .end((err, resp) => {
                    resp.should.have.status(400);
                done();
                });
        });

    });

    /**
     * Test GET
     */
    describe('GET consoles', () => {
        it('It should GET all the Consoles', (done) => {
            chai.request(server)
                .get('/console')
                .end((err, resp) => {
                    resp.should.have.status(200);
                    resp.body.should.be.a('array');

                    done();
                })
        });

        it('It should NOT GET all the Consoles', (done) => {
            chai.request(server)
                .get('/api/videogames')
                .end((err, resp) => {
                    resp.should.have.status(404);

                    done();
                })
        });    
    });

    /**
     * Test GET (by id)
     */
    describe('GET console/:id', () => {
        it('It should GET Consoles by ID', (done) => {

            chai.request(server)
                .get('/console/' + idTest)
                .end((error, resp) => {
                    resp.should.have.status(200);
                    resp.body.should.be.a('object');
                    resp.body.should.have.property('id');
                    resp.body.should.have.property('description');
                    resp.body.should.have.property('description').eq('Playstation');

                    done();
                })
        });

        it('It should NOT GET a console by ID', (done) => {
            let consoleId = 9999;

            chai.request(server)
                .get("/console/" + consoleId)
                .end((error, resp) => {
                    resp.should.have.status(204);

                    done();
                })
        })

    });

    /**
     * Test PUT
     */
    describe("PUT Consoles", () => {
        it("It should PUT an existing Console", (done) => {
            const consoleUpdated = {
                description: 'Game Boy Color'
            };

            chai.request(server)                
                .put("/console/" + idTest)
                .send(consoleUpdated)
                .end((err, resp) => {
                    resp.should.have.status(202);
                
                    done();
                });
        });
    });

    /**
     * Test DELETE
     */
    describe("DELETE Console", () => {
        it("It should DELETE an existing Console", (done) => {
            chai.request(server)                
                .delete("/console/" + idTest)
                .end((err, resp) => {
                    resp.should.have.status(202);
                done();
                });
        });
    });

});
