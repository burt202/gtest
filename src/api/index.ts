import {ApolloServer, gql} from "apollo-server-express"
import * as express from "express"

const typeDefs = gql`
  type Query {
    hello: String
  }
`
const resolvers = {
  Query: {
    hello: () => "Hello world!",
  },
}

const server = new ApolloServer({typeDefs, resolvers})

const app = express()
server.applyMiddleware({app})

const currentDate = new Date().toLocaleString()

app.get("/", (_, res: any) => {
  res.send(
    `see graphql at http://localhost:4000${server.graphqlPath} - refreshed on ${currentDate}`,
  )
})

app.listen({port: 4000}, () =>
  // tslint:disable-next-line:no-console
  console.log("Server ready at http://localhost:4000"),
)
