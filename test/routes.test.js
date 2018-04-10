const app = require('../app')
const chai = require('chai')
const expect = chai.expect

chai.use(require('chai-http'))

describe('Snacks Resources', function () {
  describe('POST /', function () {
    it('should create a snack', function (done) {
      const snack = { name: 'Snickers', brand: 'Mars' }
      chai.request(app)
        .post('/snacks')
        .send(snack)
        .end((err, res) => {
          expect(res.status).to.equal(201)
          expect(res.body.data).to.be.an('object')
          expect(res.body.data.id).to.be.ok
          expect(res.body.data.name).to.equal(snack.name)
          expect(res.body.data.brand).to.equal(snack.brand)
          done()
        })
    })

    it('should return an error if name is missing', function (done) {
      const snack = { brand: 'Mars' }
      chai.request(app)
        .post('/snacks')
        .send(snack)
        .end((err, res) => {
          expect(res.status).to.equal(400)
          expect(res.body.error).to.be.an('object')
          expect(res.body.error.message).to.be.ok
          done()
        })
    })

    it('should return an error if brand is missing', function (done) {
      const snack = { name: 'Snickers' }
      chai.request(app)
        .post('/snacks')
        .send(snack)
        .end((err, res) => {
          expect(res.status).to.equal(400)
          expect(res.body.error).to.be.an('object')
          expect(res.body.error.message).to.be.ok
          done()
        })
    })
  })

  describe('GET /', function () {
    it('should retrieve a list of all the snacks', function (done) {
      chai.request(app)
        .get('/snacks')
        .end((err, res) => {
          expect(res.status).to.equal(200)
          expect(res.body.data).to.be.an('array')

          const snack = res.body.data[0]
          expect(snack).to.be.an('object')
          expect(snack.id).to.be.ok
          done()
        })
    })
  })

  describe('GET /:id', function () {
    it('should retrieve the single snack specified', function (done) {
      chai.request(app)
        .get('/snacks')
        .end((err, res) => {
          expect(res.status).to.equal(200)
          expect(res.body.data).to.be.an('array')

          const snack = res.body.data[0]
          chai.request(app)
            .get(`/snacks/${snack.id}`)
            .end((err, res) => {
              expect(res.status).to.equal(200)
              expect(res.body.data).to.be.an('object')

              expect(res.body.data.id).to.equal(snack.id)
              done()
            })
        })
    })

    it('should return an error if the id does not match a snack', function (done) {
      chai.request(app)
        .get('/snacks/999')
        .end((err, res) => {
          expect(res.status).to.equal(404)
          expect(res.body.error).to.be.an('object')
          expect(res.body.error.message).to.be.ok
          done()
        })
    })
  })

  describe('PUT /:id', function () {
    it('should update an existing snack when all information is provided', function (done) {
      chai.request(app)
        .get('/snacks')
        .end((err, res) => {
          expect(res.status).to.equal(200)
          expect(res.body.data).to.be.an('array')

          const snack = res.body.data[0]
          const newInfo = { name: 'Twix', brand: 'Mars' }
          chai.request(app)
            .put(`/snacks/${snack.id}`)
            .send(newInfo)
            .end((err, res) => {
              expect(res.status).to.equal(200)
              expect(res.body.data).to.be.an('object')
              expect(res.body.data.id).to.be.ok
              expect(res.body.data.name).to.equal(newInfo.name)
              expect(res.body.data.brand).to.equal(newInfo.brand)
              done()
            })
        })

    })

    it('should return an error if name is missing', function (done) {
      chai.request(app)
        .get('/snacks')
        .end((err, res) => {
          expect(res.status).to.equal(200)
          expect(res.body.data).to.be.an('array')

          const snack = res.body.data[0]
          const newInfo = { brand: 'Mars' }
          chai.request(app)
            .put(`/snacks/${snack.id}`)
            .send(newInfo)
            .end((err, res) => {
              expect(res.status).to.equal(400)
              expect(res.body.error).to.be.an('object')
              expect(res.body.error.message).to.be.ok
              done()
            })
        })
    })

    it('should return an error if brand is missing', function (done) {
      chai.request(app)
        .get('/snacks')
        .end((err, res) => {
          expect(res.status).to.equal(200)
          expect(res.body.data).to.be.an('array')

          const snack = res.body.data[0]
          const newInfo = { name: 'Twix' }
          chai.request(app)
            .put(`/snacks/${snack.id}`)
            .send(newInfo)
            .end((err, res) => {
              expect(res.status).to.equal(400)
              expect(res.body.error).to.be.an('object')
              expect(res.body.error.message).to.be.ok
              done()
            })
        })
    })
  })

  describe('DELETE /:id', function () {
    it('should remove the specified snack', function (done) {
      chai.request(app)
        .get('/snacks')
        .end((err, res) => {
          expect(res.status).to.equal(200)
          expect(res.body.data).to.be.an('array')

          const snack = res.body.data[0]
          chai.request(app)
            .delete(`/snacks/${snack.id}`)
            .end((err, res) => {
              expect(res.status).to.equal(204)
              chai.request(app)
                .get(`/snacks/${snack.id}`)
                .end((err, res) => {
                  expect(res.status).to.equal(404)
                  done()
                })
            })
        })
    })

    it('should return an error if the id is not found', function (done) {
      chai.request(app)
        .delete('/snacks/999')
        .end((err, res) => {
          expect(res.status).to.equal(404)
          expect(res.body.error).to.be.an('object')
          expect(res.body.error.message).to.be.ok
          done()
        })
    })
  })
})
