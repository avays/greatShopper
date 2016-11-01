const db = require('APP/db')

const seedUsers = () => db.Promise.map([
  {firstName: 'so', lastName: 'manypws', email: 'god@example.com', password: '123467'},
  {firstName: 'Barack', lastName: 'Obama', email: 'barack@example.gov', password: '123456'},
], user => db.model('users').create(user))

db.didSync
  .then(() => db.sync({force: true}))
  //.then(seedUsers)
  //.then(users => console.log(`Seeded ${users.length} users OK`))
  .catch(error => console.error(error))    
  .finally(() => db.close())
