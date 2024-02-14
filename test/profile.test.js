const assert = require('chai').assert;
const expect = require('chai').expect;
const request = require('supertest');
// const envData = require('../../data/envData');
// const tokenAuthData = require('../../data/tokenAuthData');

const app = require('../app.js');

var name;
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YWViYTYzMDBjM2ZkMzJkM2MwNzI0MSIsInVzZXJJRCI6IkFtdSdzIFJlc3RvQmFyIiwidXNlclJvbGUiOiJ2ZW5kb3IiLCJpYXQiOjE3MDc4OTMyMTcsImV4cCI6MTcwODEwOTIxN30.47ly11VEsGYEYOMgzp5KQdQDv5i6ERDF9bxnqibVtzc";
const user_token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YmE0Yjg3ZWYwNmZmMmIyNDBiYTk3OSIsInVzZXJJRCI6ImFtcnV0YWdva2hhbGVAaWl0YmhpbGFpLmFjLmluIiwidXNlclJvbGUiOiJ1c2VyIiwiaWF0IjoxNzA3ODk2NTk4LCJleHAiOjE3MDgxMTI1OTh9.0HgDiK1AdvODDVDsXaUXQO-A6t61Xd-ru0kmMDjTvx8"

describe ('POST /api/menu', function() {

    it ('Should Succeed Getting Items', function(done) {
        request(app)
            .get('/api/menu/items/')
            .set('Content-type', 'application/json')
            .expect(200)
            .end(function(err, res) {
                done(err);
          });
        });
  
    it ('Should Succeed Adding Unique Items', function(done) {
        name = Math.floor(Math.random()*10000);
        const product = {name: name, description:"Crunchy bread stuffed with cottage cheese.", price:85, category:"specials", stock:"Available"}
        request(app)
            .post('/api/menu/items/')
            .set('Content-type', 'application/json')
            .send({token: token, product: product})
            .expect(201)
            .end(function(err, res) {
                expect(res.body).to.have.property('message').to.equal('Item added successfully');
                done(err);
            });
        });

    it ('Should Fail Adding Items with Same Name', function(done) {
        const product = {name: name, price:25, category:"specials", stock:"Available"}
        request(app)
            .post('/api/menu/items/')
            .set('Content-type', 'application/json')
            .send({token: token, product: product})
            .expect(500)
            .end(function(err, res) {
                expect(res.body).to.have.property('message').to.equal('Item already exists');
                done(err);
            });
        });
    
    it ('Should Show Items of a Restaurant', function(done) {
    request(app)
        .get('/api/menu/items/65b233c52f7db93a6cb88e85')
        .set('Content-type', 'application/json')
        .expect(200)
        .end(function(err, res) {
            done(err);
      });
    });
        
    it ('Should Update Item', function(done) {
        const product = {name: name+10000, description:"Crunchy bread stuffed with cottage cheese.", price:85, category:"specials", stock:"Available"}
        request(app)
            .put('/api/menu/items/65aeba6300c3fd32d3c07241/'+name)
            .set('Content-type', 'application/json')
            .send({token: token, product: product})
            .expect(201)
            .end(function(err, res) {
                expect(res.body).to.have.property('message').to.equal('Item edited.');
                done(err);
          });
        });

    it ('Should Fail Updating Items from Customer Role', function(done) {
            const product = {name: name+1000, description:"Crunchy bread stuffed with cottage cheese.", price:85, category:"specials", stock:"Available"}
            request(app)
                .put('/api/menu/items/65aeba6300c3fd32d3c07241/'+name)
                .set('Content-type', 'application/json')
                .send({token: user_token, product: product})
                .expect(401)
                .end(function(err, res) {
                    expect(res.body).to.have.property('message').to.equal('Unauthorized');
                    done(err);
                });
            });

        it ('Should Delete Item', function(done) {
            request(app)
                .delete('/api/menu/items/65aeba6300c3fd32d3c07241/'+name)
                .set('Content-type', 'application/json')
                .expect(200)
                .end(function(err, res) {
                    expect(res.body).to.have.property('message').to.equal('Item deleted.');
                    done(err);
              });
            });

        it ('Should Fail Adding Items from Customer Role', function(done) {
            const product = {name: name, description:"Crunchy bread stuffed with cottage cheese.", price:85, category:"specials", stock:"Available"}
            request(app)
                .post('/api/menu/items/')
                .set('Content-type', 'application/json')
                .send({token: user_token, product: product})
                .expect(400)
                .end(function(err, res) {
                    expect(res.body).to.have.property('message').to.equal('Only vendors can add items!');
                    done(err);
                });
            });

        it ('Should Fail Adding Items without Token', function(done) {
            const product = {name: name, description:"Crunchy bread stuffed with cottage cheese.", price:85, category:"specials", stock:"Available"}
            request(app)
                .post('/api/menu/items/')
                .set('Content-type', 'application/json')
                .send({product: product})
                .expect(401)
                .end(function(err, res) {
                    expect(res.body).to.have.property('message').to.equal('Invalid request!');
                    done(err);
                });
            });
        

});