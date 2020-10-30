import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';

import { Segment, Form, Header, Button, Grid, Divider, Icon } from 'semantic-ui-react';

export const LoginScreen = () => {
    
    const dispatch = useDispatch();

    const { loading } = useSelector( state => state.ui );

    const [ formValues, handleInputChange ] = useForm({
        email: 'roa@gmail.com',
        password: 'abcdef'
    });

    const { email, password } = formValues;

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch( startLoginEmailPassword( email, password ) );
    }
    
    const handleGoogleLogin = () => {
        dispatch( startGoogleLogin() );
    }

    return (
        <div>
            <Grid centered>
        
                <Grid.Row>
                    <Grid.Column width={4}>
                            <Segment color='black' inverted textAlign="left">
                                
                                <Form inverted onSubmit={ handleLogin } >

                                    <Header as='h1' inverted color='black' textAlign="center">
                                        Login
                                    </Header>

                                    <Form.Field required>
                                        <label>Email</label>
                                        <Form.Input
                                            type="email"
                                            name="email"
                                            placeholder="Email"
                                            autoComplete="off"
                                            value={ email }
                                            onChange={ handleInputChange }
                                        />
                                    </Form.Field>

                                    <Form.Field required>
                                        <label>Password</label>
                                        <Form.Input
                                            type="password"
                                            name="password"
                                            placeholder="Password"
                                            autoComplete="off"
                                            value={ password }
                                            onChange={ handleInputChange }
                                        />
                                    </Form.Field>

                                    <Button
                                        fluid
                                        primary
                                        type="submit"
                                        size="small"
                                        disabled={ loading }
                                    >
                                        Login
                                    </Button>

                                    <Divider/>

                                    <Header as='h5' inverted color='black' textAlign="center">
                                        Login con redes sociales
                                    </Header>

                                    <Button 
                                        fluid
                                        color='linkedin'
                                        onClick={ handleGoogleLogin }
                                    >
                                        <Icon name='google' /> Google
                                    </Button>
                                    
                                    <Divider hidden={true}/>

                                    <Grid>
                                        <Grid.Row>
                                            <Grid.Column width={4}>
                                                <Link 
                                                    to="/auth/register"
                                                    className="link"
                                                >
                                                    <Header as='h5' inverted color='black' className="ui header left aligned">
                                                        Regístrate
                                                    </Header>
                                                </Link>
                                            </Grid.Column>

                                            <Grid.Column width={12}>
                                                <Link 
                                                    to="/auth/resetPassword"
                                                    className="link"
                                                >
                                                    <Header as='h5' inverted color='black' className="ui header right aligned">
                                                        Recuperar contraseña
                                                    </Header>
                                                </Link>
                                            </Grid.Column>
                                        </Grid.Row>
                                    </Grid>
                                </Form>

                        </Segment>
                    </Grid.Column>
                </Grid.Row>

            </Grid>
        </div>
    );
}