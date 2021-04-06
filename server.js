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

type About {
  message: String!
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
}`)

// Mock datatbase in this case:
const petList = [
    { name: 'Fluffy', species: 'Dog' },
    { name: 'Sassy', species: 'Cat' },
    { name: 'Goldberg', species: 'Frog' }
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
