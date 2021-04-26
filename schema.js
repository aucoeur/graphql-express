const { buildSchema } = require('graphql');

const enums = `
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
`

const queries = `
  type Query {
    getAbout: About
    getMeal(time: MealTime!): Meal
    getPet(id: Int!): Pet
    allPets: [Pet!]!
    allGods: [God!]!
    allRegions: Regions
    getCount(type: Type!): Count
    getGod(id: Int!): God
    getGodByRegion(region: Region!): God
    getGodHead: God
    getGodRange(start: Int!, count: Int!): [God!]!
    getGodTail: God
    getTime: Time
    getRandom(range: Int!): Int
    getRoll(sides: Int!, rolls: Int!): DiceRoll
  }
`

const types = `
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
    origin: String
    domain: [String!]
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
`
const mutations = `
  type Mutation {
    addGod(name: String!, origin: String, domain: [String!]) : God!
    updateGod(id: Int!, name: String, origin: String, domain: [String!]) : God!
  }
`

const schema = `
  ${enums}
  ${types}
  ${queries}
  ${mutations}
`

module.exports = buildSchema(schema);
