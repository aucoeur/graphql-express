# graphql-express

- [x] Lesson 2 Challenges: [Schemas, Queries](./challenges.md#challenges)
- [x] Assignment 5 Challenges: [Mutations](./challenges.md#mutations-challenges)

# CRUD References

## Get god by id
```gql
query {
  getGod(id: 3) {
    name
    origin
    domain    
  }
}
```

## Get all gods
```gql
query {
  allGods {
    name
    origin
    domain
  }
}

```

## Create new god entry
```gql
mutation {
  addGod(name: "Loki", origin: "Scandinavia") {
    name
    domain
    origin
  }
}
```

## Update existing god entry
```gql
mutation {
	updateGod(id: 4, domain: ["mischief", "trickery"]) {
    name
    domain
	}
```

## Delete god entry
```gql
mutation {
	deleteGod(id: 4) {
    name
	}
}
```
