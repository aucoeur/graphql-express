const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

// Schema
const schema = buildSchema(`
enum MealTime {
  breakfast
  lunch
  dinner
}

enum Region {
  asia
  africa
  mediterranean
}

type About {
  message: String!
}

type God {
  name: String!
  origin: String!
  domain: [String!]!
}

type Meal {
  description: String!
}

type Pet {
  name: String!
  species: String!
}

type Query {
  getAbout: About
  getMeal(time: MealTime!): Meal
  getPet(id: Int!): Pet
  allPets: [Pet!]!
  allGods: [God!]!
  getGod(index: Int!): God
}`)

// Mock datatbase in this case:
const petList = [
    { name: 'Fluffy', species: 'Dog' },
    { name: 'Sassy', species: 'Cat' },
    { name: 'Goldberg', species: 'Frog' }
]

const godList = [
  { name: 'Dionysus', origin: 'Greek', domain: ['wine', 'fruitfulness', 'parties', 'festivals', 'madness', 'chaos', 'drunkenness', 'vegetation', 'ecstasy', 'theater'] },
  { name: 'Kek', origin: 'Eygpt', domain: ['primordial darkness', 'chaos'] },
  { name: 'Âu Cơ', origin: 'Vietnam', domain: ['mountains', 'mother of Vietnamese civilization'] }
]

// Resolver
const root = {
  getAbout: () => {
    return { message: 'Hello World' }
  },
  getMeal: ({ time }) => {
    const allMeals = { breakfast: 'toast', lunch: 'noodles', dinner: 'pizza' }
    const meal = allMeals[time]
    return { description: meal }
  },
  getPet: ({ id }) => {
    return petList[id]
  },
  allPets: () => {
    return petList
  },
  getGod: ({index}) => {
    return godList[index]
  },
  allGods: () => {
    return godList
  }
}

const app = express()

// GraphQL Route
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true
}))

// Start server
const port = 4000
app.listen(port, () => {
  console.log(`Running on post ${port}`)
})
