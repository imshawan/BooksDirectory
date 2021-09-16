const chai = require('chai');
const server = require('../app');
const chaiHttp = require('chai-http');
const { expect } = require('chai');
const entries = require('../routes/entries')

const userCredentials = {
    username: 'admin', 
    password: 'password'
  }

const payloadForPOST = {
    "author": "Joseph Conrad",
    "origin": "United Kingdom",
    "language": "English",
    "link": "https://en.wikipedia.org/wiki/Nostromo\n",
    "pages": 320,
    "title": "Nostromo",
    "year": 1905
  }

var payloadForPUT = {}

//Assertion style
chai.should();
chai.use(chaiHttp);

describe('API Tasks', () => {
    //Test the GET route
    describe('GET /books', () => {
        it('It should return all the books stored in the database', () => {
            chai.request(server)
            .get('/books')
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('array');
            //done();
            })
        })
    })

    // Test the GET route with a Book ID
    describe('GET /books/Id', () => {
        it('It should return only the book with specified ID that is stored in the database', () => {
            chai.request(server)
            .get('/books/1')
            .end((err, response) => {
                // Storing a copy of Book with Id - 1 for PUT operation
                payloadForPUT = response.body;
                response.should.have.status(200);
                response.body.should.be.a('object');
            })
        })
    })

    // Test the POST route with book information as payload
    describe('POST /books', () => {
        it('It should return a success message if data gets stored in the database', () => {
            chai.request(server)
            .post('/books')
            .auth(userCredentials.username, userCredentials.password)
            .send(payloadForPOST)
            .end((err, response) => {
                response.should.have.status(200);
                expect(response.body.status).to.equal('success');
            })
        })
    })

    // Test the PUT route with a updated book information as payload and book ID as unique identifier
    describe('PUT /books/Id', () => {
        it('It should return a success message if data gets updated in the database', () => {
            // Deleting the ID, because ID is already assigned and it must not be changed
            delete payloadForPUT.id;
            // Modifying the year for PUT operation
            payloadForPUT.year = 1958;
            chai.request(server)
            .put('/books/1')
            .auth(userCredentials.username, userCredentials.password)
            .send(payloadForPUT)
            .end((err, response) => {
                response.should.have.status(200);
                expect(response.body.status).to.equal('success');
            })
        })
    })

    // Test the DELETE route with by getting the last ID
    // The database size is of 8 records and the database size will never increase if the delete operation is performed perfectly
    describe('DELETE /books/Id', () => {
        it('It should return a success message if the record gets deleted in the database', () => {
            // getting the Nth record ID
            lastRecordId = entries.getLastID()
            chai.request(server)
            // deleting the last record
            .delete('/books/' + lastRecordId)
            .auth(userCredentials.username, userCredentials.password)
            .end((err, response) => {
                response.should.have.status(200);
                expect(response.body.status).to.equal('success');
                currentlastID = entries.getLastID();
                expect(lastRecordId).not.equal(currentlastID);
                console.log("Total records Before deleting: " + lastRecordId);
                console.log("Total records after deleting: " + currentlastID);
            })
        })
    })
})