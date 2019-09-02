# GraphQL Test

### Development

npm run build-watch

docker-compose build
docker-compose up

### Queries

```
{
  getDocs {
    name
  }
}

mutation {
  createDoc(name: "bar") {
    _id
    name
  }
}
```
