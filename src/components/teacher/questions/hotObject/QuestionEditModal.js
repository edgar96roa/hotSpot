import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Header, Grid, Form, Image, Button } from 'semantic-ui-react';
import ReactPlayer from 'react-player';
import { useForm } from '../../../../hooks/useForm';
import { activeQuestion, questionClearActiveQuestion } from '../../../../actions/questions';
import { questionHotObjectStartUpdate } from '../../../../actions/hotObjectquestions';

export const QuestionEditModal = ({ id, pregunta, reactivos }) => {

    const dispatch = useDispatch();

    const { active: question } = useSelector((state) => state.questionsHotObject);

    const [formValues, handleInputChange] = useForm(question);

    const handleActiveQuestion = () => {
        dispatch(activeQuestion(id, { pregunta, reactivos }));
    }

    const [open, setOpen] = useState(false);

    const [reactivosCopy, setReactivos] = useState(reactivos);

    const handleUrl = (id, url) => {
        const reactivo = reactivos.find(reactivo => reactivo.id === id);
        reactivo.url = url;

        const nuevoReactivos = reactivos.filter(reactivo => reactivo.id !== id);//trae la url de los reactivos que son diferentes al que estoy modificando
        setReactivos([...nuevoReactivos, reactivo].sort((a, b) => {
            if (a.id > b.id) {
                return 1;
            } else {
                return -1;
            }
        }));
    }

    const handleIsImage = (id, isImage) => {
        const reactivo = reactivos.find(reactivo => reactivo.id === id);
        reactivo.isImage = isImage;

        const nuevoReactivos = reactivos.filter(reactivo => reactivo.id !== id);
        setReactivos([...nuevoReactivos, reactivo].sort((a, b) => {
            if (a.id > b.id) {
                return 1;
            } else {
                return -1;
            }
        }));
    }

    const handleAnswerTrue = (id, answer) => {
        const reactivo = reactivos.find(reactivo => reactivo.id === id);
        reactivo.answer = answer;

        let nuevoReactivos = reactivos.filter(reactivo => reactivo.id !== id);//setting distinct reactivos, it doesn't include reactivo which i clicked

        setReactivos([...nuevoReactivos, reactivo].sort((a, b) => {
            if (a.id > b.id) {
                return 1;
            } else {
                return -1;
            }
        }));
    }

    useEffect(() => {

        dispatch(activeQuestion(id, { ...formValues }));

    }, [formValues, dispatch, id])

    const onClose = () => {
        setOpen(false);
    }

    const onOpen = () => {
        setOpen(true);
    }

    const lock =
        reactivosCopy.some(reactivo => {
            if (reactivo.url.length === 0) {//any url empty?
                return true;
            } else {
                return false;
            }
        })
            ? true
            : reactivosCopy.every(reactivo => {
                if (reactivo.answer === false) {//every answers in false?
                    return true;
                } else {
                    return false;
                }
            })
                ? true
                : (pregunta.length === 0)//question empty?
                ? true
                    : false;

    const handleCancelar = () => {
        setOpen(false);
        dispatch(questionClearActiveQuestion());
    }

    const handleEditar = () => {
        let question = { ...formValues, reactivos: reactivosCopy };
        dispatch(questionHotObjectStartUpdate({ ...question, id }));
        dispatch(questionClearActiveQuestion());
        setOpen(false);
    }

    return (
        <Modal
            centered
            onClose={onClose}
            onOpen={onOpen}
            open={open}
            size='large'
            trigger={<Button color='blue' icon='edit' size='mini' onClick={handleActiveQuestion} />}
        >

            <Modal.Header>Editar pregunta</Modal.Header>
            <Modal.Content>
                <Grid centered>
                    <Grid.Row>
                        <Grid.Column width={16}>
                            <Form>
                                <Form.Field required>
                                    <label>Pregunta</label>
                                    <Form.Input
                                        type='text'
                                        name='pregunta'
                                        placeholder='Pregunta'
                                        autoComplete='off'
                                        defaultValue={pregunta}
                                        onChange={handleInputChange}
                                    />
                                </Form.Field>

                                {reactivos.map((reactivo, index) => (
                                    <div key={reactivo.id}>
                                        <Grid>
                                            <Grid.Row>
                                                <Grid.Column width={16}>
                                                    <Header as='h5'>Selecciona el tipo de contenido que deseas ingresar</Header>
                                                    {
                                                        <Form.Field required>
                                                            <label>Reactivo {index + 1}</label>
                                                            <Form.Input
                                                                type="text"
                                                                name={reactivo.url}
                                                                placeholder="Link de Audio, Vídeo o Imagen de YouTube, Souncloud, Mixcloud, Twitch, Facebook, Google"
                                                                autoComplete="off"
                                                                value={reactivo.url}
                                                                onChange={(event) => handleUrl(reactivo.id, event.target.value)}
                                                            />
                                                        </Form.Field>
                                                    }
                                                </Grid.Column>
                                            </Grid.Row>
                                            <Grid.Row columns={3}>
                                                <Grid.Column width={4}>
                                                    <Grid >
                                                        <Grid.Row>
                                                            <Grid.Column width={16}>
                                                                <Button.Group size='huge' widths='2'>
                                                                    <Button
                                                                        basic={!reactivo.isImage}
                                                                        color='blue'
                                                                        icon='image'
                                                                        onClick={() => handleIsImage(reactivo.id, true)}
                                                                    />
                                                                    <Button
                                                                        basic={reactivo.isImage}
                                                                        color='blue'
                                                                        icon='video play'
                                                                        onClick={() => handleIsImage(reactivo.id, false)}
                                                                    />
                                                                </Button.Group>
                                                            </Grid.Column>
                                                        </Grid.Row>
                                                    </Grid>
                                                </Grid.Column>
                                                <Grid.Column width={4}>
                                                    <Grid >
                                                        <Grid.Row>
                                                            <Grid.Column width={16}>
                                                                <Button.Group size='huge' widths='2'>
                                                                    <Button
                                                                        basic={!reactivo.answer}
                                                                        color='green'
                                                                        icon='checkmark'
                                                                        onClick={() => handleAnswerTrue(reactivo.id, true)}
                                                                    />
                                                                    <Button
                                                                        basic={reactivo.answer}
                                                                        color='red'
                                                                        icon='x'
                                                                        onClick={() => handleAnswerTrue(reactivo.id, false)}
                                                                    />
                                                                </Button.Group>
                                                            </Grid.Column>
                                                        </Grid.Row>
                                                    </Grid>
                                                </Grid.Column>
                                                <Grid.Column width={8}>
                                                    <Grid >
                                                        <Grid.Row>
                                                            <Grid.Column width={16}>
                                                                <Grid.Column width={6}>
                                                                    <Grid >
                                                                        <Grid.Row>
                                                                            <Grid.Column width={15} style={{ border: '2px solid #1D97F2', borderRadius: '10px', padding: '15px', marginLeft: '12px' }}>
                                                                                {
                                                                                    (reactivo.url.length === 0)
                                                                                        ?
                                                                                        <Image src='https://react.semantic-ui.com/images/wireframe/image.png' size='small' centered />
                                                                                        :
                                                                                        (reactivo.isImage)
                                                                                            ?
                                                                                            <Image src={reactivo.url} size='medium' centered />
                                                                                            :
                                                                                            <div style={{ border: '1px', borderColor: 'green' }} >
                                                                                                <ReactPlayer
                                                                                                    className='react-player'
                                                                                                    url={reactivo.url}
                                                                                                    width='100%'
                                                                                                    height='100%'
                                                                                                    controls={true}
                                                                                                />
                                                                                            </div>
                                                                                }
                                                                            </Grid.Column>
                                                                        </Grid.Row>
                                                                    </Grid>
                                                                </Grid.Column>
                                                            </Grid.Column>
                                                        </Grid.Row>
                                                    </Grid>
                                                </Grid.Column>
                                            </Grid.Row>
                                        </Grid>
                                    </div>
                                ))}
                                {/*END OPTIONS*/}
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
                    onClick={handleCancelar}
                />
                <Button
                    disabled={lock}
                    content='Editar'
                    labelPosition='right'
                    icon='checkmark'
                    onClick={handleEditar}
                    positive
                />
            </Modal.Actions>
        </Modal>
    );
}