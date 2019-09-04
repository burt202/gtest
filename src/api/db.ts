import {MongoClient} from "mongodb"

const url = "mongodb://mongo:27017"

const dbName = "gtest"

export default async () => {
  return MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(client => {
    // tslint:disable-next-line:no-console
    console.log("Connected successfully to db")
    return client.db(dbName)
  })
}
