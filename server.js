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
  egypt
  greece
  vietnam
}

enum TimeUnit {
  hour
  minute
  second
}

enum Type {
  pets
  gods
}

type About {
  message: String!
}

type Count {
  type: String!
  count: Int!
}

type DiceRoll {
  rolls: [Int!]!
  sides: Int!
  total: Int!
}

type God {
  name: String!
  origin: String!
  domain: [String!]!
}

type Meal {
  description: String!
}

type Regions {
  region: [String!]!
}

type Pet {
  name: String!
  species: String!
}

type Time {
  hour: Int!
  minute: Int!
  second: Int!
}

type Query {
  getAbout: About
  getMeal(time: MealTime!): Meal
  getPet(id: Int!): Pet
  allPets: [Pet!]!
  allGods: [God!]!
  allRegions: Regions
  getCount(type: Type!): Count
  getGod(index: Int!): God
  getGodByRegion(region: Region!): God
  getGodHead: God
  getGodRange(start: Int!, count: Int!): [God!]!
  getGodTail: God
  getTime: Time
  getRandom(range: Int!): Int
  getRoll(sides: Int!, rolls: Int!): DiceRoll
}`)

// Mock datatbase in this case:
const petList = [
    { name: 'Fluffy', species: 'Dog' },
    { name: 'Sassy', species: 'Cat' },
    { name: 'Goldberg', species: 'Frog' }
]

const godList = [
  { name: 'Dionysus', origin: 'Greek', domain: ['wine', 'fruitfulness', 'parties', 'festivals', 'madness', 'chaos', 'drunkenness', 'vegetation', 'ecstasy', 'theater'] },
  { name: 'Kek', origin: 'Egypt', domain: ['primordial darkness', 'chaos'] },
  { name: 'Âu Cơ', origin: 'Vietnam', domain: ['mountains', 'mother of Vietnamese civilization'] }
]

const types = { pets: petList, gods: godList }
const regions = { egypt: 1, greece: 0, vietnam: 2 }
// Functions
function random(range) {
  return Math.floor((Math.random() * range) + 1)
}

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
  allGods: () => {
    return godList
  },
  allRegions: () => {
    const regions = ["Egypt", "Greece","Vietnam" ]
    return {region: regions}
  },
  getCount: ({type}) => {
    return { type: type , count: types[type].length }
  },
  getGod: ({index}) => {
    return godList[index]
  },
  getGodByRegion:({region}) => {
    return godList[regions[region]]
  },
  getGodHead: () => {
    return godList[0]
  },
  getGodRange: ({start, count}) => {
    let end;
    switch (start) {
      case 0:
        end = count
        break
      case godList.length - 1:
        end = undefined
        break
      default:
        end = count + 1
        break
    }
    return godList.slice(start,end)
  },
  getGodTail: () => {
    return godList[godList.length - 1]
  },
  getRandom: ({range}) => {
    return random(range)
  },
  getRoll: ({ sides, rolls }) => {
    const rollArray = Array.from({length: rolls}, () => random(sides))
    const total = rollArray.reduce((acc, current) => {
      return acc + current }, 0)
    return { rolls: rollArray, sides: sides, total: total}
  },
  getTime: () => {
    const now = new Date(Date.now())
    const hours = now.getHours()
    const minutes = now.getMinutes()
    const seconds = now.getSeconds()
    return { hour: hours, minute: minutes, second: seconds }
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
