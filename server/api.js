'use strict'

const db = require('APP/db')
const api = module.exports = require('express').Router()

api
  .get('/heartbeat', (req, res) => res.send({ok: true,}))
  .use('/auth', require('./auth'))
  .use('/users', require('./users'))

  // new code 11/2
  .use('/reviews', require('./reviews'))
  //.use('/products', require('./products'))
  // .use('/payments', require('./payments'))
  // .use('/orders', require('./orders'))
  // .use('/order_items', require('./order_items'))
  // .use('/media_products', require('./media_products'))
  // .use('/media', require('./media'))
  // .use('/category_products', require('./category_products'))
   .use('/categories', require('./categories'))
  // .use('/addresses', require('./addresses'))


// Send along any errors
api.use((err, req, res, next) => {
  res.status(500).send(err)
})

// No routes matched? 404.
api.use((req, res) => res.status(404).end())