import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Grid, Form, Image, Button } from 'semantic-ui-react';
//import { uiCloseModal, uiOpenModal } from '../../../actions/modal';
import { useForm } from '../../../hooks/useForm';
import { activeQuestion, questionStartUpdate } from '../../../actions/questions';

export const QuestionEditModal = ({ id, instrucciones, pregunta, valor }) => {
    
    const dispatch = useDispatch();

    const { active: question } = useSelector((state) => state.questions);

    const [formValues, handleInputChange] = useForm(question);

    const handleActiveQuestion = () => dispatch(activeQuestion(id, formValues));
    
    const [open, setOpen] = useState(false);

    useEffect(() => {
        
        dispatch( activeQuestion( id, {...formValues} ) );

    }, [formValues, dispatch, id])

    return (
        <Modal
            centered
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            size='large'
            trigger={
                <Button
                    color='blue'
                    icon='edit'
                    size='mini'
                    onClick={handleActiveQuestion}
                />
            }
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
                                        type='text'
                                        name='instrucciones'
                                        placeholder='Instrucciones'
                                        autoComplete='off'
                                        defaultValue={instrucciones}
                                        onChange={handleInputChange}
                                    />
                                </Form.Field>

                                <Form.Field required>
                                    <label>Pregunta</label>
                                    <Form.Input
                                        type='text'
                                        name='pregunta'
                                        placeholder='Pregunta'
                                        autoComplete='off'
                                        defaultValue={pregunta}
                                        onChange={ handleInputChange }
                                    />
                                </Form.Field>

                                <Form.Field required>
                                    <label>Valor</label>
                                    <Form.Input
                                        type='number'
                                        min='0.01'
                                        max='10'
                                        step='0.05'
                                        name='valor'
                                        placeholder='Valor'
                                        autoComplete='off'
                                        defaultValue={valor}
                                        onChange={ handleInputChange }
                                    />
                                </Form.Field>

                                <Form.Field className='ui centered' required>
                                    <label>Archivo</label>
                                    <input
                                        type='file'
                                        name='questionImage'
                                        style={{
                                            padding: '0px',
                                            border: '0px',
                                        }}
                                    />
                                </Form.Field>

                                <div>
                                    <Image src={''} size='large' accept='image/*' centered />
                                </div>
                            </Form>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Modal.Content>

            <Modal.Actions>
                <Button
                    color='grey'
                    content='Cancelar'
                    labelPosition='right'
                    icon='close'
                    onClick={() => setOpen(false)}
                />
                <Button
                    content='Editar'
                    labelPosition='right'
                    icon='checkmark'
                    onClick={() => {
                        console.log(id, instrucciones, pregunta, valor);
                        //dispatch( questionStartUpdate(formValues) )
                        setOpen(false)
                    }}
                    positive
                />
            </Modal.Actions>
        </Modal>
    );
}