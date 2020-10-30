import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import validator from 'validator';
import { startRegister } from '../../actions/auth';
import { removeError, setError } from '../../actions/ui';
import { useForm } from '../../hooks/useForm';

import { Segment, Form, Header, Button, Grid, Divider } from 'semantic-ui-react';

import Swal from 'sweetalert2';

export const RegisterScreen = () => {

    const dispatch = useDispatch();

    const { msgError, loading } = useSelector( state => state.ui );

    //const state = useSelector( state => state);

    const [ formValues, handleInputChange ] = useForm({
        name: 'Edgar Roa',
        email: 'roa@gmail.com',
        password: 'abcdef',
        password2: 'abcdef'
    });

    const { name, email, password, password2 } = formValues;

    const sendAlert = () => {
        Swal.fire({
            title: 'Error',
            text: msgError,
            icon: 'error',
            showConfirmButton: false,
            timer: '2500'
        });
    }

    const isFormValid = () => {

        if(name.trim().length === 0) {
            sendAlert();
            dispatch( setError('Name is required') );
            return false;
        } else if ( !validator.isEmail(email) ) {
            sendAlert();
            dispatch( setError('Email is not valid') );
            return false;
        } else if ( password !== password2 || password.length < 5 ) {
            sendAlert();
            dispatch( setError('Password should be at least 6 characters and match each other') );
            return false;
        }

        dispatch( removeError() );
        return true;

    }

    const handleRegister = (e) => {
        e.preventDefault();
        if( isFormValid() ){
            dispatch( startRegister(email, password, name) );
        }
    }
    
    return (
        <div>
            <Grid centered>
        
                <Grid.Row>
                    <Grid.Column width={4}>
                            <Segment color='black' inverted textAlign="left">
                                
                                <Form inverted onSubmit={ handleRegister } >

                                    <Header as='h1' inverted color='black' textAlign="center">
                                        Regístrate
                                    </Header>

                                    <Form.Field required>
                                        <label>Nombre</label>
                                        <Form.Input
                                            type="text"
                                            name="name"
                                            placeholder="Nombre"
                                            autoComplete="off"
                                            value={ name }
                                            onChange={ handleInputChange }
                                        />
                                    </Form.Field>

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

                                    <Form.Field required>
                                        <label>Confirmar Password</label>
                                        <Form.Input
                                            type="password"
                                            name="password2"
                                            placeholder="Password"
                                            autoComplete="off"
                                            value={ password2 }
                                            onChange={ handleInputChange }
                                        />
                                    </Form.Field>

                                    <Button
                                        fluid
                                        primary
                                        type="submit"
                                        size="small"
                                        disabled={ loading }
                                        onClick={isFormValid}
                                    >
                                        Registrarme
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
                                                        ¿Ya estás registrado?
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
    )
}
