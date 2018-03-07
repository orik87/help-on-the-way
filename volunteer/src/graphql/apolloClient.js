import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'
import Vue from 'vue'

const link = new HttpLink({
  uri: 'http://localhost:5000/graphql'
})

const cache = new InMemoryCache()
const client = new ApolloClient({
  link,
  cache,
  connectToDevTools: true
})

const provider = new VueApollo({
  defaultClient: client
})

Vue.use(VueApollo)

export const apolloProvider = provider
export const apolloClient = client