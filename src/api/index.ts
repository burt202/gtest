import {ApolloServer, gql} from "apollo-server-express"
import * as express from "express"
import connectToDb from "./db"

connectToDb().then(db => {
  const typeDefs = gql`
    type Doc {
      id: String
      name: String
    }

    type Query {
      docs: [Doc]
    }
  `
  const resolvers = {
    Query: {
      docs: () => {
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
