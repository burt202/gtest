import {ApolloServer, gql} from "apollo-server-express"
import * as express from "express"
import connectToDb from "./db"

connectToDb().then(db => {
  const typeDefs = gql`
    type Doc {
      _id: String
      name: String
    }

    type Query {
      getDocs: [Doc]
    }

    type Mutation {
      createDoc(name: String): Doc
    }
  `
  const resolvers = {
    Mutation: {
      createDoc: (_, {name}) => {
        return db
          .collection("docs")
          .insertOne({name})
          .then(({ops}) => {
            return ops[0]
          })
      },
    },
    Query: {
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

  app.get("/", (_, res: any) => {
    res.send(
      `see graphql at http://localhost:8080${server.graphqlPath} - refreshed on ${currentDate}`,
    )
  })

  app.listen({port: 8080}, () =>
    // tslint:disable-next-line:no-console
    console.log("Server ready at http://localhost:8080"),
  )
})
