# GraphQL Test

### Development

npm run build-watch

docker-compose build
docker-compose up

### Queries

```
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
  deleteDoc(id: "bar")
}
```
