import React from 'react';
//import { useDispatch } from 'react-redux';

import { Link } from 'react-router-dom';
import validator from 'validator';
//import { startRegister } from '../../actions/auth';
//import { removeError, setError } from '../../actions/ui';

import { useForm } from '../../hooks/useForm';

import { Segment, Form, Header, Button, Grid, Divider } from 'semantic-ui-react';

export const ResetPasswordScreen = () => {

    //const dispatch = useDispatch();

    const [ formValues, handleInputChange ] = useForm({
        email: 'roa@gmail.com'
    });

    const { email } = formValues;

    const isFormValid = () => {

        if ( !validator.isEmail(email) ){
            //dispatch( setError('Email is not valid') );
            return false;
        }

        //dispatch( removeError() );
        return true;

    }

    const handleResetPassword = (e) => {
        e.preventDefault();
        if( isFormValid() ){
            //dispatch( startRegister(email, password, name) );
        }
    }
    
    return (
        <div>
            <Grid centered>
        
                <Grid.Row>
                    <Grid.Column width={4}>
                            <Segment color='black' inverted textAlign="left">
                                
                                <Form inverted onSubmit={ handleResetPassword } >

                                    <Header as='h1' inverted color='black' textAlign="center">
                                        Recuperar Contraseña
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

                                    <Button
                                        fluid
                                        primary
                                        type="submit"
                                        size="small"
                                        //disabled={ loading }
                                    >
                                        Login
                                    </Button>

                                    <Divider />

                                    <Grid>
                                        <Grid.Row>
                                            <Grid.Column width={16}>
                                                <Link 
                                                    to="/auth/login"
                                                    className="link"
                                                >
                                                    <Header as='h5' inverted color='black'>
                                                        ¿Recordaste tu contraseña?
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
