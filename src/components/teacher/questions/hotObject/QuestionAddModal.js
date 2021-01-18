import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Grid, Form, Header, Button, Image } from 'semantic-ui-react';
import { uiCloseModal, uiOpenModal } from '../../../../actions/modal';
import ReactPlayer from 'react-player';
import '../../../../styles/generalStyles.css';
import { questionsHotObjectStartAddNew } from '../../../../actions/hotObjectquestions';

export const QuestionAddModal = () => {

    const dispatch = useDispatch();

    const { modalOpen } = useSelector(state => state.modal);

    /*BEGIN QUESTION OPTIONS*/
    const [hideColorButtons, setHideColorButton] = useState({
        colorImageButton1: true, colorAudioVideoButton1: true,
        colorImageButton2: true, colorAudioVideoButton2: true,
        colorImageButton3: true, colorAudioVideoButton3: true,
        colorImageButton4: true, colorAudioVideoButton4: true
    });

    const {
        colorImageButton1, colorAudioVideoButton1,
        colorImageButton2, colorAudioVideoButton2,
        colorImageButton3, colorAudioVideoButton3,
        colorImageButton4, colorAudioVideoButton4,
    } = hideColorButtons;

    const [opciones, setOpciones] = useState({
        imagen1: false, audioVideo1: false,
        imagen2: false, audioVideo2: false,
        imagen3: false, audioVideo3: false,
        imagen4: false, audioVideo4: false,
    });

    const {
        imagen1, audioVideo1,
        imagen2, audioVideo2,
        imagen3, audioVideo3,
        imagen4, audioVideo4
    } = opciones;

    const [optionButtons, setOptionButtons] = useState({
        colorCorrectButton1: true, colorIncorrectButton1: true,
        colorCorrectButton2: true, colorIncorrectButton2: true,
        colorCorrectButton3: true, colorIncorrectButton3: true,
        colorCorrectButton4: true, colorIncorrectButton4: true
    });

    /*begin option 1*/
    const handleImage1 = () => {
        setOpciones({
            ...opciones,
            imagen1: true,
            audioVideo1: false
        });
        setHideColorButton({
            ...hideColorButtons,
            colorImageButton1: false,
            colorAudioVideoButton1: true
        });
        setLink1({...link1, tipoContenido: 0});
    }

    const handlePlayer1 = () => {
        setOpciones({
            ...opciones,
            imagen1: false,
            audioVideo1: true
        });
        setHideColorButton({
            ...hideColorButtons,
            colorImageButton1: true,
            colorAudioVideoButton1: false
        });
        setLink1({...link1, tipoContenido: 1});
    }

    const handleCorrectOption1 = () => {
        setOptionButtons({
            ...optionButtons,
            colorCorrectButton1: false, colorIncorrectButton1: true,
            colorCorrectButton2: true, colorIncorrectButton2: false,
            colorCorrectButton3: true, colorIncorrectButton3: false,
            colorCorrectButton4: true, colorIncorrectButton4: false
        });
        setLink1({ ...link1, respuesta: true });
        setLink2({ ...link2, respuesta: false });
        setLink3({ ...link3, respuesta: false });
        setLink4({ ...link4, respuesta: false });
    }

    const handleIncorrectOption1 = () => {
        setOptionButtons({
            ...optionButtons,
            colorCorrectButton1: true, colorIncorrectButton1: false
        });
        setLink1({ ...link1, respuesta: false });
    }
    /*end option 1*/

    /*begin option 2*/
    const handleImage2 = () => {
        setOpciones({
            ...opciones,
            imagen2: true,
            audioVideo2: false
        });
        setHideColorButton({
            ...hideColorButtons,
            colorImageButton2: false,
            colorAudioVideoButton2: true
        });
        setLink2({...link2, tipoContenido: 0});
    }

    const handlePlayer2 = () => {
        setOpciones({
            ...opciones,
            imagen2: false,
            audioVideo2: true
        });
        setHideColorButton({
            ...hideColorButtons,
            colorImageButton2: true,
            colorAudioVideoButton2: false
        });
        setLink2({...link2, tipoContenido: 1});
    }

    const handleCorrectOption2 = () => {
        setOptionButtons({
            ...optionButtons,
            colorCorrectButton2: false, colorIncorrectButton2: true,
            colorCorrectButton1: true, colorIncorrectButton1: false,
            colorCorrectButton3: true, colorIncorrectButton3: false,
            colorCorrectButton4: true, colorIncorrectButton4: false
        });
        setLink2({ ...link2, respuesta: true });
        setLink1({ ...link1, respuesta: false });
        setLink3({ ...link3, respuesta: false });
        setLink4({ ...link4, respuesta: false });
    }

    const handleIncorrectOption2 = () => {
        setOptionButtons({
            ...optionButtons,
            colorCorrectButton2: true, colorIncorrectButton2: false
        });
        setLink2({ ...link2, respuesta: false });
    }
    /*end option 2*/


    /*begin option 3*/
    const handleImage3 = () => {
        setOpciones({
            ...opciones,
            imagen3: true,
            audioVideo3: false
        });
        setHideColorButton({
            ...hideColorButtons,
            colorImageButton3: false,
            colorAudioVideoButton3: true
        });
        setLink3({...link3, tipoContenido: 0});
    }

    const handlePlayer3 = () => {
        setOpciones({
            ...opciones,
            imagen3: false,
            audioVideo3: true
        });
        setHideColorButton({
            ...hideColorButtons,
            colorImageButton3: true,
            colorAudioVideoButton3: false
        });
        setLink3({...link3, tipoContenido: 1});
    }

    const handleCorrectOption3 = () => {
        setOptionButtons({
            ...optionButtons,
            colorCorrectButton3: false, colorIncorrectButton3: true,
            colorCorrectButton1: true, colorIncorrectButton1: false,
            colorCorrectButton2: true, colorIncorrectButton2: false,
            colorCorrectButton4: true, colorIncorrectButton4: false
        });
        setLink3({ ...link3, respuesta: true });
        setLink1({ ...link1, respuesta: false });
        setLink2({ ...link2, respuesta: false });
        setLink4({ ...link4, respuesta: false });
    }

    const handleIncorrectOption3 = () => {
        setOptionButtons({
            ...optionButtons,
            colorCorrectButton3: true, colorIncorrectButton3: false
        });
        setLink3({ ...link3, respuesta: false });
    }
    /*end option 3*/

    /*begin option 4*/
    const handleImage4 = () => {
        setOpciones({
            ...opciones,
            imagen4: true,
            audioVideo4: false
        });
        setHideColorButton({
            ...hideColorButtons,
            colorImageButton4: false,
            colorAudioVideoButton4: true
        });
        setLink4({...link4, tipoContenido: 0});
    }

    const handlePlayer4 = () => {
        setOpciones({
            ...opciones,
            imagen4: false,
            audioVideo4: true
        });
        setHideColorButton({
            ...hideColorButtons,
            colorImageButton4: true,
            colorAudioVideoButton4: false
        });
        setLink4({...link4, tipoContenido: 1});
    }

    const handleCorrectOption4 = () => {
        setOptionButtons({
            ...optionButtons,
            colorCorrectButton4: false, colorIncorrectButton4: true,
            colorCorrectButton1: true, colorIncorrectButton1: false,
            colorCorrectButton2: true, colorIncorrectButton2: false,
            colorCorrectButton3: true, colorIncorrectButton3: false
        });
        setLink4({ ...link4, respuesta: true });
        setLink1({ ...link1, respuesta: false });
        setLink2({ ...link2, respuesta: false });
        setLink3({ ...link3, respuesta: false });
    }

    const handleIncorrectOption4 = () => {
        setOptionButtons({
            ...optionButtons,
            colorCorrectButton4: true, colorIncorrectButton4: false
        });
        setLink4({ ...link4, respuesta: false });
    }
    /*end option 4*/
    /*END QUESTION OPTIONS*/

    /*SEPARATED LINK OPTIONS*/
    const [link1, setLink1] = useState({
        id: 1,
        url: '',
        respuesta: false,
        tipoContenido: null
    });

    const handleLink1 = (e) => {
        setLink1({
            ...link1, url: e.target.value
        });
    }

    const [link2, setLink2] = useState({
        id: 2,
        url: '',
        respuesta: false,
        tipoContenido: null
    });

    const handleLink2 = (e) => {
        setLink2({
            ...link2, url: e.target.value
        });
    }

    const [link3, setLink3] = useState({
        id: 3,
        url: '',
        respuesta: false,
        tipoContenido: null
    });

    const handleLink3 = (e) => {
        setLink3({
            ...link3, url: e.target.value
        });
    }

    const [link4, setLink4] = useState({
        id: 4,
        url: '',
        respuesta: false,
        tipoContenido: null
    });

    const handleLink4 = (e) => {
        setLink4({
            ...link4, url: e.target.value
        });
    }

    const createQuestion = () => {
        let reactivosLinks = [link1, link2, link3, link4];
        let pregunta = formValues.pregunta;
        let questionValues = {
            pregunta,
            reactivos: reactivosLinks
        };
        dispatch(questionsHotObjectStartAddNew(questionValues));
        dispatch(uiCloseModal());
    }

    const [formValues, setFormValues] = useState({
        pregunta: '',
        reactivos: []
    });

    const { pregunta, reactivos } = formValues;

    const [uploadButton, setUploadButton] = useState(true);

    useEffect(() => {
        if (formValues.pregunta.length > 0 && link1.url.length > 0 && link2.url.length > 0 && link3.url.length > 0 && link4.url.length > 0 &&
            (link1.respuesta === true || link2.respuesta === true || link3.respuesta === true || link4.respuesta === true)
        ) {
            setUploadButton(false);
        } else {
            setUploadButton(true);
        }
    }, [formValues, link1, link2, link3, link4]);

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
        //if (1 === 2) {
        //    dispatch(questionsStartAddNew(formValues));
        //;
        //} else {
        //dispatch(uiCloseModal());
        //}
        createQuestion();
    }

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
                                        name="pregunta"
                                        placeholder="Pregunta"
                                        autoComplete="off"
                                        value={pregunta}
                                        onChange={handleInputChange}
                                    />
                                </Form.Field>

                                {/*BEGIN OPTION 1*/}
                                <Grid>
                                    <Grid.Row>
                                        <Grid.Column width={16}>
                                            <Header as='h3' textAlign='center'>Selecciona el tipo de contenido que deseas ingresar</Header>
                                            {
                                                (imagen1 === true || audioVideo1 === true)
                                                    ?
                                                    <Form.Field required>
                                                        <label>Reactivo 1</label>
                                                        <Form.Input
                                                            type="text"
                                                            name="link1.url"
                                                            placeholder="Link de Audio, Vídeo o Imagen de YouTube, Souncloud, Mixcloud, Twitch, Facebook, Google"
                                                            autoComplete="off"
                                                            value={link1.url}
                                                            onChange={handleLink1}
                                                        />
                                                    </Form.Field>
                                                    :
                                                    <></>
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
                                                                basic={colorImageButton1}
                                                                color='blue'
                                                                icon='image'
                                                                onClick={handleImage1}
                                                            />
                                                            <Button
                                                                basic={colorAudioVideoButton1}
                                                                color='blue'
                                                                icon='video play'
                                                                onClick={handlePlayer1}
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
                                                                basic={!link1.respuesta}
                                                                color='green'
                                                                icon='checkmark'
                                                                onClick={handleCorrectOption1}
                                                            />
                                                            <Button
                                                                basic={link1.respuesta}
                                                                color='red'
                                                                icon='x'
                                                                onClick={handleIncorrectOption1}
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
                                                                            ((imagen1 === false && link1.url.length === 0) || (audioVideo1 === false && link1.url.length === 0))
                                                                                ?
                                                                                <Image src='https://react.semantic-ui.com/images/wireframe/image.png' size='small' centered />
                                                                                :
                                                                                (link1.url.length >= 0 && imagen1 === true)
                                                                                    ?
                                                                                    <Image src={link1.url} size='medium' centered />
                                                                                    :
                                                                                    (link1.url.length >= 0 && audioVideo1 === true)
                                                                                        ?
                                                                                        <div style={{ border: '1px', borderColor: 'green' }} >
                                                                                            <ReactPlayer
                                                                                                className='react-player'
                                                                                                url={link1.url}
                                                                                                width='100%'
                                                                                                height='100%'
                                                                                                controls={true}
                                                                                            />
                                                                                        </div>
                                                                                        :
                                                                                        <></>
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
                                {/*END OPTION 1*/}

                                {/*BEGIN OPTION 2*/}
                                <Grid>
                                    <Grid.Row>
                                        <Grid.Column width={16}>
                                            {
                                                (imagen2 === true || audioVideo2 === true)
                                                    ?
                                                    <Form.Field required>
                                                        <label>Reactivo 2</label>
                                                        <Form.Input
                                                            type="text"
                                                            name="link2.url"
                                                            placeholder="Link de Audio, Vídeo o Imagen de YouTube, Souncloud, Mixcloud, Twitch, Facebook, Google"
                                                            autoComplete="off"
                                                            value={link2.url}
                                                            onChange={handleLink2}
                                                        />
                                                    </Form.Field>
                                                    :
                                                    <></>
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
                                                                basic={colorImageButton2}
                                                                color='blue'
                                                                icon='image'
                                                                onClick={handleImage2}
                                                            />
                                                            <Button
                                                                basic={colorAudioVideoButton2}
                                                                color='blue'
                                                                icon='video play'
                                                                onClick={handlePlayer2}
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
                                                                basic={!link2.respuesta}
                                                                color='green'
                                                                icon='checkmark'
                                                                onClick={handleCorrectOption2}
                                                            />
                                                            <Button
                                                                basic={link2.respuesta}
                                                                color='red'
                                                                icon='x'
                                                                onClick={handleIncorrectOption2}
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
                                                                            ((imagen2 === false && link2.url.length === 0) || (audioVideo2 === false && link2.url.length === 0))
                                                                                ?
                                                                                <Image src='https://react.semantic-ui.com/images/wireframe/image.png' size='small' centered />
                                                                                :
                                                                                (link2.url.length >= 0 && imagen2 === true)
                                                                                    ?
                                                                                    <Image src={link2.url} size='medium' centered />
                                                                                    :
                                                                                    (link2.url.length >= 0 && audioVideo2 === true)
                                                                                        ?
                                                                                        <div style={{ border: '1px', borderColor: 'green' }} >
                                                                                            <ReactPlayer
                                                                                                className='react-player'
                                                                                                url={link2.url}
                                                                                                width='100%'
                                                                                                height='100%'
                                                                                                controls={true}
                                                                                            />
                                                                                        </div>
                                                                                        :
                                                                                        <></>
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
                                {/*END OPTION 2*/}

                                {/*BEGIN OPTION 3*/}
                                <Grid>
                                    <Grid.Row>
                                        <Grid.Column width={16}>
                                            {
                                                (imagen3 === true || audioVideo3 === true)
                                                    ?
                                                    <Form.Field required>
                                                        <label>Reactivo 3</label>
                                                        <Form.Input
                                                            type="text"
                                                            name="link3.url"
                                                            placeholder="Link de Audio, Vídeo o Imagen de YouTube, Souncloud, Mixcloud, Twitch, Facebook, Google"
                                                            autoComplete="off"
                                                            value={link3.url}
                                                            onChange={handleLink3}
                                                        />
                                                    </Form.Field>
                                                    :
                                                    <></>
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
                                                                basic={colorImageButton3}
                                                                color='blue'
                                                                icon='image'
                                                                onClick={handleImage3}
                                                            />
                                                            <Button
                                                                basic={colorAudioVideoButton3}
                                                                color='blue'
                                                                icon='video play'
                                                                onClick={handlePlayer3}
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
                                                                basic={!link3.respuesta}
                                                                color='green'
                                                                icon='checkmark'
                                                                onClick={handleCorrectOption3}
                                                            />
                                                            <Button
                                                                basic={link3.respuesta}
                                                                color='red'
                                                                icon='x'
                                                                onClick={handleIncorrectOption3}
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
                                                                            ((imagen3 === false && link3.url.length === 0) || (audioVideo3 === false && link3.url.length === 0))
                                                                                ?
                                                                                <Image src='https://react.semantic-ui.com/images/wireframe/image.png' size='small' centered />
                                                                                :
                                                                                (link3.url.length >= 0 && imagen3 === true)
                                                                                    ?
                                                                                    <Image src={link3.url} size='medium' centered />
                                                                                    :
                                                                                    (link3.url.length >= 0 && audioVideo3 === true)
                                                                                        ?
                                                                                        <div style={{ border: '1px', borderColor: 'green' }} >
                                                                                            <ReactPlayer
                                                                                                className='react-player'
                                                                                                url={link3.url}
                                                                                                width='100%'
                                                                                                height='100%'
                                                                                                controls={true}
                                                                                            />
                                                                                        </div>
                                                                                        :
                                                                                        <></>
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
                                {/*END OPTION 3*/}

                                {/*BEGIN OPTION 4*/}
                                <Grid>
                                    <Grid.Row>
                                        <Grid.Column width={16}>
                                            {
                                                (imagen4 === true || audioVideo4 === true)
                                                    ?
                                                    <Form.Field required>
                                                        <label>Reactivo 4</label>
                                                        <Form.Input
                                                            type="text"
                                                            name="link4.url"
                                                            placeholder="Link de Audio, Vídeo o Imagen de YouTube, Souncloud, Mixcloud, Twitch, Facebook, Google"
                                                            autoComplete="off"
                                                            value={link4.url}
                                                            onChange={handleLink4}
                                                        />
                                                    </Form.Field>
                                                    :
                                                    <></>
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
                                                                basic={colorImageButton4}
                                                                color='blue'
                                                                icon='image'
                                                                onClick={handleImage4}
                                                            />
                                                            <Button
                                                                basic={colorAudioVideoButton4}
                                                                color='blue'
                                                                icon='video play'
                                                                onClick={handlePlayer4}
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
                                                                basic={!link4.respuesta}
                                                                color='green'
                                                                icon='checkmark'
                                                                onClick={handleCorrectOption4}
                                                            />
                                                            <Button
                                                                basic={link4.respuesta}
                                                                color='red'
                                                                icon='x'
                                                                onClick={handleIncorrectOption4}
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
                                                                            ((imagen4 === false && link4.url.length === 0) || (audioVideo4 === false && link4.url.length === 0))
                                                                                ?
                                                                                <Image src='https://react.semantic-ui.com/images/wireframe/image.png' size='small' centered />
                                                                                :
                                                                                (link4.url.length >= 0 && imagen4 === true)
                                                                                    ?
                                                                                    <Image src={link4.url} size='medium' centered />
                                                                                    :
                                                                                    (link4.url.length >= 0 && audioVideo4 === true)
                                                                                        ?
                                                                                        <div style={{ border: '1px', borderColor: 'green' }} >
                                                                                            <ReactPlayer
                                                                                                className='react-player'
                                                                                                url={link4.url}
                                                                                                width='100%'
                                                                                                height='100%'
                                                                                                controls={true}
                                                                                            />
                                                                                        </div>
                                                                                        :
                                                                                        <></>
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
                                {/*END OPTION 4*/}
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
                    disabled={uploadButton}
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
