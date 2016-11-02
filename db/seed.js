const db = require('APP/db')

const seedUsers = () => db.Promise.map([
  {firstName: 'Alec', lastname: 'Friedman', email: 'dude@fellow.com', password: '654321'},
  {firstName: 'Barack', lastname: 'Obama', email: 'barack@example.gov', password: '123458'},
  {firstName: 'Porkchop', lastname: 'Dog', email: 'dogface@pupper.com', password: '555555'},
  {firstName: 'Bubba', lastname: 'Dog', email: 'doggo@pupper.com', password: '999999'},
], user => db.model('users').create(user));

const seedReviews = () => db.Promise.map([
  {text: 'Wow this product was so amaze, love it, lulz', stars: 5},
  {text: 'Worst thing ever, will never buy, terrible', stars: 1},
  {text: 'This changed my life, hooray, I have no soul', stars: 3},
  {text: 'This product has ALL the best things', stars: 5},
  {text: 'Decided to write this review instead of tweeting about this product', stars: 2}
], review => db.model('reviews').create(review));

db.didSync
  .then(() => db.sync({force: true}))
  .then(seedUsers)
  .then(users => console.log(`Seeded ${users.length} users OK`))
  .catch(error => console.error(error))    
  .finally(() => db.close()) 