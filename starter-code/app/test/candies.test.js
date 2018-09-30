// // from chai:
// const should        = require('chai').should()
// const expect        = require('chai').expect
// const supertest     = require('supertest')

// const api           = supertest('http://localhost:3000')

// // one describe block per route
// describe('GET /candies', () => {
//     it('should return a response with status code 200', done => {
//        api
//        // when done, check for candies object/file
//             .get('./candies')
//             .set('Accept', 'application/json')
//             .expect(200, done)

//     })
//     it('should return an array', done => {
//         .get('/candies')
//         .set('Accept', 'application/json')
//         .end((err, response) => {
//             expect(response.body).to.be.an('array')
//             done()
//         })
        
//     })
//     it('should return an [] of {}s with a field called `name`', done => {
//         .get('/candies')
//         .set('Accept', 'application/json')
//         .end((err, response) => {
//             expect(response.body[0].to.have.property('name'))
//             done()
//         })
//     })

// })

//////////////////////

const should       = require('chai').should()
const expect       = require('chai').expect
const supertest    = require('supertest')
const api          = supertest('http://localhost:3000')

describe('GET /candies', () => {

  it('should return a response with status code 200', done => {
    api
      .get('/candies')
      .set('Accept', 'application/json')
      .expect(200, done)
  })

  it('should return an array', done => {
    api
      .get('/candies')
      .set('Accept', 'application/json')
      .end((err, response) => {
        expect(response.body).to.be.an('array')
        done()
      })
  })

  it('should return an [] of {}s with a field called `name`', done => {
    api
      .get('/candies')
      .set('Accept', 'application/json')
      .end((err, response) => {
        expect(response.body[0]).to.have.property('name')
        done()
      })
  } )
  
})

describe('POST /candies', () => {
    let previousLength
    
    before(done => {
        api
        .post('/candies')
        .set('Accept', 'application/json')
        .send({
            "id": 5, 
            "name": "lollipop", 
            "color": "red"
        })
        .end(done)
    })
    it('should add a candy object to the [] of candies', done => {
        api
        .get('/candies')
        .set('Accept', 'application/json')
        .end((err, response) => {
          expect(response.body.length).to.equal(previousLength + 1)
          done()
        })
    })
})

describe('PUT /candies', () => {
    let candyToUpdate

    before(done => {
        api
        .get('/candies')
        .set('Accept', 'application/json')
        .end((err, response) => {
            candyToUpdate = response.body[0]
            .end(done)
        })
        before( done => {
            api
            // backtics for string interpolation
            .put(`/candy/${candyToUpdate.id}/edit`)
            .set('Accept', 'application/json')
            .send({
                "id": candyToUpdate.id,
                "name": "atomic warhead", 
                "color": "green"
            })
            .end(done)
        })
        it('should update a candy by id', done => {
            api
            .get(`/candy/${candyToUpdate.id}`)
            .set('Accept', 'application/json')
            .end((err, response) => {
                expect(response.body.name).to.equal('atomic warhead')
                done()
            })            
        })
    })
})
/////////////////// correct: (double check above code) 

const should       = require('chai').should()
const expect       = require('chai').expect
const supertest    = require('supertest')
const api          = supertest('http://localhost:3000')

describe('GET /candies', () => {
  it('should return a response with status code 200', done => {
    api
      .get('/candies')
      .set('Accept', 'application/json')
      .expect(200, done)
  })

  it('should return an array', done => {
    api
      .get('/candies')
      .set('Accept', 'application/json')
      .end((err, response) => {
        expect(response.body).to.be.an('array')
        done()
      })
  })

  it('should return an [] of {}s with a field called `name`', done => {
    api
      .get('/candies')
      .set('Accept', 'application/json')
      .end((err, response) => {
        expect(response.body[0]).to.have.property('name')
        done()
      })
  } )
})

describe('POST /candies', () => {
  let previousLength
  before( (done) => {
    api.get('/candies')
      .set('Accept', 'application/json')
      .end( (error, response) => {
        previousLength = response.body.length
        done()
      })
  })
  
  before(done => {
    api
      .post('/candies')
      .set('Accept', 'application/json')
      .send({
        "id": 5,
        "name": "Lollipop",
        "color": 'red'
      })
      .end(done)
  })

  it('should add a candy object to the [] of candies', done => {
    api
      .get('/candies')
      .set('Accept', 'application/json')
      .end((err, response) => {
        expect(response.body.length).to.equal(previousLength + 1)
        done()
      })
  })
})

describe('PUT /candies/:id', () => {
  let candyToUpdate

  before(done => {
    api
      .get('/candies')
      .set('Accept', 'application/json')
      .end((err, response) => {
        candyToUpdate = response.body[0]
        done()
      })
  })
  before( done => {
    api
      .put(`/candies/${candyToUpdate.id}/edit`)
      .set('Accept', 'application/json')
      .send({
        "id": candyToUpdate.id,
        "name": "Atomic Warhead",
        "color": "Green"
      })
      .end(done)
  })

  it('should update a candy by id', done => {
    api
      .get(`/candies/${candyToUpdate.id}`)
      .set('Accept', 'application/json')
      .end((err, response) => {
        expect(response.body.name).to.equal('Atomic Warhead')
        done()
      })
  })
})
