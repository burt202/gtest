# GraphQL Test

### Development

npm run build-watch

docker-compose up --build

### Queries

```
{
  getDoc(id: "123") {
    id
    name
  }
}

{
  getDocs {
    id
    name
  }
}

mutation {
  createDoc(name: "bar") {
    id
    name
  }
}

mutation {
  deleteDoc(id: "123")
}

mutation {
  updateDoc(id: "123" name: "baz") {
    id
    name
  }
}

```
