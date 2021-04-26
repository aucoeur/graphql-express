const express = require('express');
const { graphqlHTTP } = require('express-graphql');

const schema = require('./schema');

// Mock datatbase in this case:
const petList = [
    { name: 'Fluffy', species: 'Dog' },
    { name: 'Sassy', species: 'Cat' },
    { name: 'Goldberg', species: 'Frog' }
]
// {name: "Loki", origin: "Scandinavia", domain: ["mayhem", "mischief", "tricks", "fire"]}
// mutation {
//   addGod(name: "Loki", origin: "Scandinavia", domain: ["mayhem", "mischeif"]) {
//     name
//     origin
//     domain
//   }
// }
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
  addGod: ({name, origin, domain}) => {
    const god = { name, origin, domain }
    godList.push(god)
    return god
  },
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
  getGod: ({id}) => {
    return godList[id]
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
  },
  updateGod: ({ id, name, origin, domain }) => {
    const god = godList[id]

    if (god === undefined) {
      return null
    }

    god.name = name || god.name
    god.origin = origin || god.origin

    // maybe this is more legible
    // if (domain) {
    //   god.domain = god.domain ? [...god.domain, ...domain] : [...domain]
    // }

    god.domain = domain ?
      (god.domain ? [...god.domain, ...domain] : [...domain]) :
      (god.domain ? god.domain : null)

    god.domain = god.domain

    return god
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
  console.log(`Running on port ${port}: http://localhost:4000/graphql`)
})
