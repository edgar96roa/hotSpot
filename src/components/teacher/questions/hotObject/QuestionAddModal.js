import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Grid, Form, Header, Button, Image } from 'semantic-ui-react';
import { uiCloseModal, uiOpenModal } from '../../../../actions/modal';
import ReactPlayer from 'react-player';
import '../../../../styles/generalStyles.css';
import { questionsHotObjectStartAddNew } from '../../../../actions/hotObjectquestions';

export const QuestionAddModal = () => {

    const dispatch = useDispatch();

    const { modalOpen } = useSelector(state => state.modal);

    /*SEPARATED LINK OPTIONS*/
    const [formValues, setFormValues] = useState({
        question: '',
    });
    const { question } = formValues;

    const [reactivos, setReactivos] = useState([
        {
            id: 1,
            url: '',
            isImage: true,
            answer: false,
        },
        {
            id: 2,
            url: '',
            isImage: true,
            answer: false,
        },
        {
            id: 3,
            url: '',
            isImage: true,
            answer: false,
        },
        {
            id: 4,
            url: '',
            isImage: true,
            answer: false,
        }
    ]);

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

    const handleAnswerTrue = (id) => {
        const reactivo = reactivos.find(reactivo => reactivo.id === id);
        reactivo.answer = true;

        let nuevoReactivosEnFalse = reactivos.filter(reactivo => reactivo.id !== id);//setting distinct reactivos, it doesn't include reactivo which i clicked
        let nuevoReactivos = nuevoReactivosEnFalse.map(reactivo => ({ ...reactivo, answer: false }));//setting false to answers on reactivos before to take them
        setReactivos([...nuevoReactivos, reactivo].sort((a, b) => {
            if (a.id > b.id) {
                return 1;
            } else {
                return -1;
            }
        }));
    }

    const handleAnswerFalse = (id) => {
        const reactivo = reactivos.find(reactivo => reactivo.id === id);
        reactivo.answer = false;

        const nuevoReactivos = reactivos.filter(reactivo => reactivo.id !== id);

        setReactivos([...nuevoReactivos, reactivo].sort((a, b) => {
            if (a.id > b.id) {
                return 1;
            } else {
                return -1;
            }
        }));
    }

    const createQuestion = () => {
        let pregunta = formValues.question;
        let questionValues = {
            pregunta,
            reactivos
        };
        dispatch(questionsHotObjectStartAddNew(questionValues));
        dispatch(uiCloseModal());
    }

    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value,
        });
    }

    const openModal = () => {
        dispatch(uiOpenModal());
    }

    const closeModal = () => {
        dispatch(uiCloseModal());
    }

    const handleSubmitForm = (e) => {
        e.preventDefault();
        createQuestion();
    }

    const lock =
        reactivos.some(reactivo => {
            if (reactivo.url.length === 0) {//any url empty?
                return true;
            } else {
                return false;
            }
        })
            ? true
            : (formValues.question.length === 0)//question empty?
                ? true
                : reactivos.every(reactivo => {
                        if (reactivo.answer === false) {//every answers in false?
                            return true;
                        } else {
                            return false;
                        }
                    }) 
                    ? true 
                    : false;

    return (

        <Modal
            centered
            onClose={closeModal}
            onOpen={openModal}
            open={modalOpen}
            size='large'
            trigger={<Button positive icon='add' content='Agregar nueva pregunta' />}
        >
            <Modal.Header>Agregar una nueva pregunta</Modal.Header>
            <Modal.Content>

                <Grid centered>
                    <Grid.Row>
                        <Grid.Column width={16}>


                            <Form>
                                <Form.Field required>
                                    <label>Pregunta</label>
                                    <Form.Input

                                        type="text"
                                        name="question"
                                        placeholder="Pregunta"
                                        autoComplete="off"
                                        defaultValue={question}
                                        onChange={handleInputChange}
                                    />
                                </Form.Field>

                                {/*BEGIN OPTIONS*/}
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
                                                                        onClick={() => handleAnswerTrue(reactivo.id)}
                                                                    />
                                                                    <Button
                                                                        basic={reactivo.answer}
                                                                        color='red'
                                                                        icon='x'
                                                                        onClick={() => handleAnswerFalse(reactivo.id)}
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
                    content="Cancelar"
                    labelPosition='right'
                    icon='close'
                    onClick={closeModal}
                />
                <Button
                    disabled={lock}
                    content="Subir"
                    labelPosition='right'
                    icon='checkmark'
                    onClick={handleSubmitForm}
                    positive
                />
            </Modal.Actions>

        </Modal>
    );
}