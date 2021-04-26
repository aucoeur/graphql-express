# graphql-express

- [x] Lesson 2 Challenges: [Schemas, Queries](./challenges.md#challenges)
- [x] Assignment 5 Challenges: [Mutations](./challenges.md#mutations-challenges)

## Challenges 🎳

<!-- > -->

Your goal is to make a list of things, not unlike SWAPI. This could be a list of pets, songs, recipes, movies, anything really. 

You are going to make a GraphQL server that serves the things in your list.

<!-- > -->

**Challenge 1**

Make an Array of objects. Each object should have at least three properties.

*Examples*:

- Pet: name, species, age
- Song: title, genre, length
- Movie: title, genre, rating

<!-- > -->

In code this might look something like: 

```JS
const petList = [
	{ name: 'Fluffy', species: 'Dog' },
	{ name: 'Sassy', species: 'Cat' },
	{ name: 'Goldberg', species: 'Frog' }
]
```

<!-- > -->

**Challenge 2** 

Make a Type in your schema for your objects:

```python
type Pet {
	name: String!
	species: Species! # use an enum!
}
```

Use an enum for something!

Advanced: Use an interface!

<!-- > -->

**Challenge 3**

Make a Query type that will return all of the things: 

```python
type Query {
  allPets: [Pet!]! # returns a collection of Pet
}
```

<!-- > -->

**Challenge 3**

Write a resolver for your query: 

```JS
const root = {
  allPets: () => {	
		return petList
	},
  ...
}
```

This returns the entire list. 

<!-- > -->

**Challenge 4**

Test your work in Graphiql: 

```python
{ 
  allPets {
    name
  }
}
```

Shoule display a list of names.

<!-- > -->

**Challenge 5**

Add a query that returns a thing at an index: 

```python
type Query {
  allPets: [Pet!]! 
  getPet(index: Int!): Pet
}
```

Add the new query to your Query types in your schema. 

<!-- > -->

**Challenge 6**

Add a new resolver. The parameters from the query will be received in resolver function: 

```JS
const root = {
  ...
  getPet: ({ index }) => { // index is a param from the query
		return petList[index]
	}
}
```

<!-- > -->

**Challenge 7**

Test your work, write a query in Graphiql. 

```python
{
  getPet(index: 0) {
    name
  }
}
```

<!-- > -->

**Challenge 8**

Write a query that gets the last item and the first item from the collection.

Schema: 

`firstPet: Pet` 

Resolver: 

`firstPet: () => ???`

<!-- > -->

**Challenge 9**

We need a type that represents the time. 

- hour
- minute
- second

Write a resolver that gets the time and returns an object with the properties: hour, minute, second.

```JS
{
  getTime {
    hour
    second
    minute
  }
}
```

<!-- > -->

**Challenge 10** 

Imagine we need the server to return a random random number. Your job is to write a query type and resolver that makes the GraphQL query below function: 

```JS
{
  getRandom(range: 100) 
}
```

Which should return: 

```JS
{
  "data": {
    "getRandom": 77
  }
}
```

<!-- > -->

**Challenge 11** 

Create a type that represents a die roll. It should take the number of dice and the number of sides on each die. It should return the total of all dice, sides, and an array of the rolls. 

<!-- > -->

Below is an example query, and the response that should come back

**Example Query**

```JS 
{
  getRoll(sides:6, rolls: 3) {
    total, 
    sides,
    rolls
  }
}
```

**Example Response**

```JS
{
  total: 10, // total of all rolls (see below)
  sides: 6,  // each roll should be 1 to 6 based on the original sides parameter
  rolls: [5, 2, 3] // 3 rolls based on the original rools parameter (5+2+3=10)
}
```

<!-- > -->

**Challenge 12**

Add a query that returns the count of elements in your collection. You'll need to add a query and a resolver.

The trick of this problem is how to form this query. 

<!-- > -->

**Challenge 13**

Add a query that returns some of your collection in a range. Imagine the query below for pets:

```python
{
  petsInRange(start: 0, count: 2) {
    name
  }
}
```

The results of the query should return two pets starting with the pet at index 0.

<!-- > -->

**Challenge 14**

Get things by one of their features. For example if the Type was Pet we could get pets by their species:

```python
{
  getPetBySpecies(species: "Cat") {
    name
  }
}
```

**Challenge 15**

Choose a field. This query should return all of these values that exist in the things in your list. This would work best for a field with a fixed or limited set of values, like a field that uses an enum as it's type: 

Here is a sample query:

```python
{
  allSpecies {
    name
  }
}
```

Returns: "Cat", "Dog", "Frog"

<!-- > -->

## After Class

- Complete the challenges here. Submit them on GradeScope.
- Watch https://www.howtographql.com videos up to the GraphQL Node Tutorial:
  - Clients
  - Servers
  - More GraphQL Concepts
  - Tooling and Ecosystem
  - Security
  - Common Questions
- Submit your work to GradeScope.

<!-- > -->

### Evaulate your Work

1. Define a GraphQL Schema
1. Define a GraphQL Resolver
1. Use GraphQL Queries
1. Use GraphiQL

| -   | Does not meet expectations | Meets Expectations | Exceeds Expectations |
|:---:|:---:|:---:|:---:|
| GraphQL Schemas | Can't describe or explain GraphQL schemas | Can describe GraphQL schemas | Could teach the basic concepts of GraphQL schemas to someone else |
| Writing Schemas | Can't write a GraphQL schema | Can write a GraphQL schema | Feel confident you could write a GraphQL schema for a variety of situations beyond the homework examples |
| GraphQL Queries | Can't write a GraphQL Query | Could write a graphQL query | Feel confident you could write GraphQL queries beyond the solutions to the homework problems |
| Resolvers | Can't explain resolvers, couldn't find them in your code | Could explain how the resolver works in the sample code from the lesson | Could expand on the resolvers from this lesson adding more use cases |

<!-- > -->

## Resources

- https://www.howtographql.com
- https://medium.com/codingthesmartway-com-blog/creating-a-graphql-server-with-node-js-and-express-f6dddc5320e1

## Mutations Challenges



**Challenge 1 - Serve a list of things**

You have a list of things, Pets were used in the examples. You need a mutation that adds a new pet. It should return the pet that was just created. You'll need to include all of the fields that make the type. 

<!-- > -->

For example if the Pet type looked like this: 

```JS
type Pet {
	name: String!
	species: String!
}
```

So the mutation might look like this: 

```python
type Mutation {
	addPet(name: String!, species: String!): Pet!
}
```

<!-- > -->

Now you need a resolver to return the array. For the petList it might look like:

```JS
const root = {
  ...
	addPet: ({ name, species }) => {
		const pet = { name, species }
		petList.push(pet)
		return pet
	}
}
```

Test your work with query. Run your server, open Graphiql in your browser and test your mutation. 

<!-- > -->

```python
mutation {
  addPet(name:"Ginger", species:"Cat") {
    name
  }
}
```

Try test all of your things to see if the new was added to the list. 

<!-- > -->

**Challenge 2 - Update**

We need full CRUD functionality! So far you have "Create". What about "Update"? Try that out.

To do this you'll need to make a query that supports all of the field a type has.

<!-- > -->

Add a new mutation to your scema. It should include all of the fields but they can be null except the id. It should return the type. 

```python
type Mutation {
	...
	updatePet(id: Int!, name: String, species: String): Pet
} 
```

<!-- > -->

Add a resolver. Your resolver should look at the fields and update the values when the field is NOT undefined! 

```JS
const root = {
  ...
  updatePet: ({ id, name, species }) => {
		const pet = petList[id]  // is there anything at this id? 
		if (pet === undefined) { // Id not return null
			return null 
		}
    // if name or species was not included use the original
		pet.name = name || pet.name 
		pet.species = species || pet.species
		return pet
	}
}
```

<!-- > -->

Test your work with a query. 

- Update an element in your list
- Try changing only one field
- Try updated an id that is out of range 

<!-- > -->

**Challenge 3 - Delete**

Make a mutation to delete an element. It should include an id and return the thing that was deleted. 

Write the mutation in your schema. 

Write a resolver to support the mutation.

<!-- > -->

Test your work. 

- Write a query that deletes an item from your list
  - You should get the deleted item and be able to display its fields
- Try deleting an id that doesn't exist it should return null

<!-- > -->

**Challenge 4 - Mutation Queries**

Write queries that cover all of the CRUD operations you have implemented. Include these in a read me with your project. You should have a query for: 

1. Creating new item
1. Reading a item from your list
1. Updating an item
1. Deleting an item

<!-- > -->

**Challenge 5 - Code Review**

Code review your work with another student. This is an important step in the development process. Code is not pushed to the master branch unless it's been reviewed! 

<!-- > -->

### Stretch Challenges

<!-- > -->

**Challenge 6 - Other lists**

If you've implemented a second list add CRUD operations for that list. 

<!-- > -->

## After Class

<!-- > -->

Compelete the challenges above and submit them to GradeScope. 

<!-- > -->

### Evaluate your work

<!-- > -->

| - | Does not meet expectations | Meets Expectations | Exceeds Expectations |
|:---:|:---:|:---|:---:|
| Comprehension | Can't describe GraphQL mutations | Can describe GraphQL mutations | Could describe potential use cases for GraphQL mutations beyond the examples provided |
| Mutation Queries | Can't write a mutation query | Can write mutation queries | Can write mutation queries that expand on the challenge solutions |
| Mutation Resolvers | Can't write a Mutation resolver | Can write a mutation resolver | Could write mutation resolvers that expand upon the solutions to the challenges |

<!-- > -->

## Resources

- https://odyssey.apollographql.com
