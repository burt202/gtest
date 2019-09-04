import {ApolloServer, gql} from "apollo-server-express"
import * as express from "express"
import * as uuidV4 from "uuid/v4"
import connectToDb from "./db"

interface IDoc {
  id: string
  name: string
}

connectToDb().then(db => {
  const typeDefs = gql`
    type Doc {
      id: String
      name: String
    }

    type Query {
      getDocs: [Doc]
      getDoc(id: String): Doc
    }

    type Mutation {
      createDoc(name: String): Doc
      updateDoc(id: String, name: String): Doc
      deleteDoc(id: String): Boolean
    }
  `
  const resolvers = {
    Mutation: {
      createDoc: (_: any, {name}: IDoc) => {
        return db
          .collection("docs")
          .insertOne({id: uuidV4(), name})
          .then(({ops}) => {
            return ops[0]
          })
      },
      deleteDoc: (_: any, {id}: IDoc) => {
        return db
          .collection("docs")
          .deleteOne({id})
          .then(({result}) => {
            return result.n && result.ok
          })
      },
      updateDoc: (_: any, {id, name}: IDoc) => {
        return db
          .collection("docs")
          .updateOne({id}, {$set: {name}})
          .then(({result}) => {
            return result.n ? {id, name} : undefined
          })
      },
    },
    Query: {
      getDoc: (_: any, {id}: IDoc) => {
        return db
          .collection("docs")
          .find({id})
          .toArray()
          .then(result => {
            return result.length ? result[0] : undefined
          })
      },
      getDocs: () => {
        return db
          .collection("docs")
          .find({})
          .toArray()
      },
    },
  }

  const server = new ApolloServer({typeDefs, resolvers})

  const app = express()
  server.applyMiddleware({app})

  const currentDate = new Date().toLocaleString()

  app.get("/", (_, res) => {
    res.send(
      `see graphql at http://localhost:8080${server.graphqlPath} - refreshed on ${currentDate}`,
    )
  })

  app.listen({port: 8080}, () =>
    // tslint:disable-next-line:no-console
    console.log("Server ready at http://localhost:8080"),
  )
})
