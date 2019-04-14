const express = require('express')
const bodyParser = require('body-parser')
const graphqlHttp = require('express-graphql')
const mongoose = require('mongoose')

const graphQlSchema = require('./graphql/schema/index')
const graphQlResolvers = require('./graphql/resolvers/index')

const Event = require('./models/event')
const User = require('./models/user')

const app = express()

app.use(bodyParser.json())

app.use(
  '/graphql',
  graphqlHttp({
    schema: graphQlSchema,
    resolver: graphQlResolvers,
    graphiql: true
  })
)

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGODB_USER}:${
      process.env.MONGODB_PASSWORD
    }@cluster0-ytu2g.mongodb.net/${process.env.MONGODB}?retryWrites=true`,
    { useNewUrlParser: true }
  )
  .then(() => {
    app.listen(3000)
  })
  .catch(err => console.log(err))
