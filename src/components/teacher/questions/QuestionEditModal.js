import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Grid, Form, Image, Button } from 'semantic-ui-react';
//import { uiCloseModal, uiOpenModal } from '../../../actions/modal';
import { useForm } from '../../../hooks/useForm';
import { activeQuestion } from '../../../actions/questions';
import '../../../styles/generalStyles.css';

export const QuestionEditModal = ( { id, instrucciones, pregunta, valor } ) => {

    const dispatch = useDispatch();

    const { active: question } = useSelector( state => state.questions );

    const [formValues, handleInputChange] = useForm(question);

    //const { id, instrucciones, pregunta, valor } = formValues;//error, declaración 2 veces del argumento

    const handleActiveQuestion = () => {
        dispatch( activeQuestion( id, { instrucciones, pregunta, valor } ) );
    }

    const [open, setOpen] = useState(false);

    return (

        <Modal
            centered
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            size='large'
            trigger={<Button color='blue' icon='edit' size='mini' onClick={ handleActiveQuestion } />}
        >
            <Modal.Header>Editar pregunta</Modal.Header>
            <Modal.Content>
                
                <Grid centered>
                    <Grid.Row>
                        <Grid.Column width={16}>
                                
                                    
                                    <Form>

                                        <Form.Field required>
                                            <label>Instrucciones</label>
                                            <Form.Input
                                                type="text"
                                                name="instrucciones"
                                                placeholder="Instrucciones"
                                                autoComplete="off"
                                                value={ instrucciones }
                                                onChange={ handleInputChange }
                                            />
                                        </Form.Field>

                                        <Form.Field required>
                                            <label>Pregunta</label>
                                            <Form.Input
                                                type="text"
                                                name="pregunta"
                                                placeholder="Pregunta"
                                                autoComplete="off"
                                                value={ pregunta }
                                                //onChange={ handleInputChange }
                                            />
                                        </Form.Field>

                                        <Form.Field required>
                                            <label>Valor</label>
                                            <Form.Input
                                                type="number"
                                                min="0.01"
                                                max="10" 
                                                step="0.01"
                                                name="valor"
                                                placeholder="Valor"
                                                autoComplete="off"
                                                value={ valor }
                                                //onChange={ handleInputChange }
                                            />
                                        </Form.Field>

                                        <Form.Field  className="ui centered" required>
                                            <label>Archivo</label>
                                            <input
                                                type="file"
                                                name="questionImage"
                                                style={{
                                                    padding: '0px',
                                                    border: '0px'
                                                }}
                                            />
                                        </Form.Field>

                                        <div>
                                            <Image src={""} size='large' accept="image/*" centered />
                                        </div>

                                    </Form>

                                
                        </Grid.Column>
                    </Grid.Row>

                </Grid>
                
            </Modal.Content>
            
            <Modal.Actions>
                <Button 
                    color='grey'
                    content="Cancelar"
                    labelPosition='right'
                    icon='close'
                    onClick={() => setOpen(false)}
                />
                <Button
                    content="Editar"
                    labelPosition='right'
                    icon='checkmark'
                    onClick={() => setOpen(false)}
                    positive
                />
            </Modal.Actions>

        </Modal>
        
    );
}
