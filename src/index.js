import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { setContext } from 'apollo-link-context'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import './index.css'
import App from './component'
import registerServiceWorker from './registerServiceWorker'
import { AUTH_TOKEN } from './constant'


const httpLink = createHttpLink({
    uri: 'http://127.0.0.1:3001',
})


const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem(AUTH_TOKEN)
    return {
        headers: {
            ...headers,
            authorization: (token) ? `Bearer ${ token }` : ''
        }
    }
})

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
})

/*
// import gql from 'graphql-tag'
// const demoUserLogin = async () => {
//     const email = 'jackie.chan@localhost'
//     const password = 'whoami'
//     const LOGIN_MUTATION = gql`
//     mutation LoginMutation($email: String!, $password: String!) {
//         login(email: $email, password: $password) {
//             token
//         }
//     }
//     `
//     const result = await client.mutate({
//         mutation: LOGIN_MUTATION,
//         variables: { email, password },
//     })
//     const token = result.data.login.token
//     localStorage.setItem(AUTH_TOKEN, token)
//     return token
// }
// localStorage.getItem(AUTH_TOKEN) || demoUserLogin()
*/

ReactDOM.render(
    <Router>
        <ApolloProvider client={ client }>
            <App />
        </ApolloProvider>
    </Router>,
    document.getElementById('root')
)

registerServiceWorker()
