import React, { useState } from 'react';
import { Grid, Form, Button } from 'semantic-ui-react';
import { FilePond } from 'react-filepond';
import ReactPlayer from 'react-player';

export const TeacherQuestionsHotObjectScreen = () => {

    const [formValues, setFormValues] = useState({
        instrucciones: '',
        pregunta: '',
        valor: 0,
    });

    const { instrucciones, pregunta, valor } = formValues;

    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
    }

    return (
        <div>
            <Grid centered>
                <Grid.Row>
                    <Grid.Column width={16}>
                        <Form>

                            <Form.Field required>
                                <label>Instrucciones</label>
                                <Form.Input
                                    required
                                    type="text"
                                    name="instrucciones"
                                    placeholder="Instrucciones"
                                    autoComplete="off"
                                    value={instrucciones}
                                    onChange={handleInputChange}
                                />
                            </Form.Field>

                            <Form.Field required>
                                <label>Pregunta</label>
                                <Form.Input

                                    type="text"
                                    name="pregunta"
                                    placeholder="Pregunta"
                                    autoComplete="off"
                                    value={pregunta}
                                    onChange={handleInputChange}
                                />
                            </Form.Field>

                            <Form.Field required>
                                <label>Valor</label>
                                <Form.Input
                                    type="number"
                                    min="0.10"
                                    max="10"
                                    step="0.10"
                                    name="valor"
                                    placeholder="Valor"
                                    autoComplete="off"
                                    value={valor}
                                    onChange={handleInputChange}
                                />
                            </Form.Field>

                            <FilePond />

                            <ReactPlayer url='https://soundcloud.com/miami-nights-1984/accelerated' />

                            <ReactPlayer url='https://www.youtube.com/watch?v=ysz5S6PUM-U' />

                                    <Button>
                                        Crear
                            </Button>

                        </Form>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    )
}
