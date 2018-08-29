import React, { Component } from 'react'
import { withApollo } from 'react-apollo'
import gql from 'graphql-tag'
import './authorization-view.css'
import { TheButton, IconTextInputField } from './../'
import { AUTH_TOKEN } from './../../constant'
import UserIcon from './../../img/gw-user.svg'

const USER_EXISTS_QUERY = gql`
    query UserExists($email: String!) {
        userExists(email: $email)
    }
`

const SIGNUP_MUTATION = gql`
    mutation newSignup($name: String!, $email: String!, $password: String!) {
        signup(name: $name, email: $email, password: $password) {
            token
        }
    }
`

const LOGIN_MUTATION = gql`
    mutation loginUser($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
        }
    }
`

const Tabs  = ({
    activeIndex = 0,
    options = [
        { title: 'Tab 1', action: ()=>{} },
        { title: 'Tab 2', action: ()=>{} },
        { title: 'Tab 3', action: ()=>{} },
        { title: 'Tab 4', action: ()=>{} },
    ]}) => (<div className="Tabs">
        { options.map(({ title, action }, index) => { const isActiveIndex = (index === activeIndex); return (<button key={ title } onClick={ (isActiveIndex) ? () => {} : action } className={ (isActiveIndex) ? 'active' : 'inactive' }>{ title }</button>) }) }
    </div>)


class AuhtorizationView extends Component {
    state = { ...this.props, isSignupActive: false, isAuthorized: false }

    get isAuthorized() { return localStorage.getItem(AUTH_TOKEN) }

    activateSignup(flag, e) {
        this.setState({ isSignupActive: flag })
    }

    async onSubmit(e) {
        e.preventDefault()

        console.debug('submitting...')

        const { name, email, password } = this.state
        await this.props.client.query({
            query: USER_EXISTS_QUERY,
            variables: { email }
        }).then(async ({ data }) => {
            if (data) {
                const { userExists } = data

                if (userExists && this.state.isSignupActive) {
                    alert(`That email is already registered.`)
                    return
                }

                if (!userExists && !this.state.isSignupActive) {
                    alert(`That account doesn't exist. Sign up?`)
                    return
                }

                return (this.state.isSignupActive)
                ? await this.props.client.mutate({
                    mutation: SIGNUP_MUTATION,
                    variables: { name, email, password }
                }).then(async ({ data }) => {
                    if (data) {
                        const { signup: { token } } = data
                        this._updateToken(token)
                        window.location = '/'
                        return Promise.resolve()
                    }
                    return Promise.reject('No data returned.')
                })
                : await this.props.client.mutate({
                    mutation: LOGIN_MUTATION,
                    variables: { email, password }
                }).then(async ({ data }) => {
                    if (data) {
                        const { login: { token } } = data
                        this._updateToken(token)
                        window.location = '/'
                        return Promise.resolve()
                    }
                    return Promise.reject('No data returned.')
                })
            }
        }).catch( error => {
            alert(`Could not ${ (this.state.isSignupActive) ? 'sign up' : 'sign in' }.\n\nTechnical Details:\nError: ${ error.message }`)
        })
    }

    onFormChange(e) {
        const { value } = e.target
        switch(e.target.name) {
            case 'name':
                this.setState({ name: value })
                break
            case 'email':
                this.setState({ email: value })
                break
            case 'password':
                this.setState({ password: value })
                break
            default: break
        }
    }
    render() {
        return (<div className={ `AuthorizationView ${ (this.isAuthorized) ? ' authorized' : '' }`}>
            { (!this.isAuthorized) ? (<div>
                <h2>Sign up or Login</h2>
                <p>{ (this.state.isSignupActive) ? `It's quick, free, and you can "save"` : 'Login to resume your matches' }</p>
                <div className="AuthorizationView-card-view">
                    <Tabs options={ [ { title: 'Sign up', action: this.activateSignup.bind(this, true) }, { title: 'Login', action: this.activateSignup.bind(this, false) } ]} activeIndex={ (this.state.isSignupActive) ? 0 : 1 } />
                    <form onSubmit={ this.onSubmit.bind(this) } onChange={ this.onFormChange.bind(this) }>
                        <div className="AuthorizationView-form-field">
                            <div className="text-fields">
                            { (this.state.isSignupActive)
                            ? <IconTextInputField name="name" iconSrc={ UserIcon } rel="name" placeholder="Name" value={ this.state.name } autoFocus={ (this.state.isSignupActive) ?  "true" : "false" } required />
                            : ''}
                            <IconTextInputField name="email" iconSrc={ UserIcon } type="email" value={ this.state.email } rel="email" placeholder="Email" required />
                            <IconTextInputField name="password" iconSrc={ UserIcon } type="password" rel="password" value={ this.state.password } placeholder="••••••••••" aria-label="Password" required />
                            </div>
                        </div>
                        <div className="AuthorizationView-button-group">
                        {
                            (this.state.isSignupActive)
                            ? <a><TheButton className="auth">Sign up</TheButton></a>
                            : <a><TheButton className="auth">Login</TheButton></a>
                        }
                    </div>
                    </form>
                </div>
            </div>) : (<div>
                    <div className="AuthorizationView-button-group">
                        <a><TheButton onClick={ () => { localStorage.removeItem(AUTH_TOKEN); window.location = '/' } } className="auth">Sign out</TheButton></a>
                    </div>
                    <div className="AuthorizationView-authorized-group">
                    { this.state.children }
                    </div>
                </div>)
            }
        </div>)
    }
    _updateToken = (token) => {
        localStorage.setItem(AUTH_TOKEN, token)
    }
}

export default withApollo(AuhtorizationView)
