import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Modal, Header, Image, Button } from 'semantic-ui-react';
import ReactPlayer from 'react-player';
import { answersSetAnswer, answersUpdateAnswer } from '../../../../actions/answers';
import { activeQuestion, questionClearActiveQuestion } from '../../../../actions/questions';
import '../../../../styles/generalStyles.css';

export const QuestionActiveModal = ({ id, pregunta, reactivos }) => {

    const dispatch = useDispatch();

    const answers = useSelector(state => state.answers.answers);

    const [answer, setAnswer] = useState({
        id: '',
        idReactivo: '',
        respuesta: null
    });

    const [open, setOpen] = useState(false);

    const idQuestion = useRef(id);

    const [selectedId, setSelectedId] = useState(0);

    const optionsStyle = { 
        borderRadius: '10px',
        border: '2px solid #1D97F2',
        padding: '30px',
        marginLeft: '12px' 
    };

    const answerStyle = { 
        borderRadius: '10px',
        border: '3px solid #1DFF00',
        padding: '30px',
        marginLeft: '12px' 
    };

    const onSelectViewQuestion = () => {
        dispatch(
            activeQuestion(id, { pregunta, reactivos })//de aquí vamos al archivo questions de la carpeta actions
        );
    }

    const onClose = () => {
        setOpen(false);
    }

    const onOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {

        setSelectedId(0);

        dispatch(questionClearActiveQuestion());

        setOpen(false);
    }

    const handleClickAnswer = (id, reactivo) => {
        setSelectedId(id);

        setAnswer({...answer, id: idQuestion.current, idReactivo: reactivo.id, respuesta: reactivo.answer});

        let pregunta = { id: idQuestion.current, idReactivo: reactivo.id, respuesta: reactivo.answer };

        answers.forEach(answer => {
            if (answer.id === idQuestion.current) {
                dispatch( answersUpdateAnswer(pregunta) );
            }
        });
    }

    const handleSubmitAnswer = () => {

        let exists = false;

        answers.forEach(answer => {
            if (answer.id === id) {
                exists = true;
            } 
        });

        if(!exists){
            dispatch(answersSetAnswer(answer));
        }
    }

    return (

        <Modal
            centered
            onClose={onClose}
            onOpen={onOpen}
            open={open}
            size='large'
            trigger={<Button icon='eye' size='mini' onClick={onSelectViewQuestion} />}
        >
            <Modal.Header>Visualización de pregunta</Modal.Header>
            <Modal.Content>

                <Grid centered>
                    <Grid.Row>
                        <Grid.Column width={16}>
                            <Modal.Description>
                                <Header>Pregunta</Header>
                                <p>
                                    {pregunta}
                                </p>
                            </Modal.Description>
                            <br/>
                        </ Grid.Column>
                    </ Grid.Row>
                </ Grid>

                <Grid>
                    <Grid.Row>
                        <Grid.Column width={16}>
                            <Header>Opciones</Header>
                            <label>Selecciona tu respuesta dando clic en el área que rodea al contenido multimedia</label>
                            {
                                reactivos.map(reactivo => (
                                    <div key={reactivo.id}>
                                        <Grid>
                                            <Grid.Row>
                                                <Grid.Column width={16}>
                                                    <Header as='h3'>Opción {reactivo.id}</Header>
                                                </Grid.Column>
                                            </Grid.Row>
                                            <Grid.Row centered>
                                                <Grid.Column 
                                                    width={7} 
                                                    style={ (reactivo.id === selectedId) ? answerStyle : optionsStyle } 
                                                    onClick={() => handleClickAnswer(reactivo.id, reactivo)}
                                                >
                                                    {
                                                        (reactivo.isImage === true) ?
                                                            <Grid.Row>
                                                                <Grid.Column width={16}>
                                                                    <Image src={reactivo.url} size='medium' centered />
                                                                </Grid.Column>
                                                            </Grid.Row> :
                                                            <Grid.Row>
                                                                <Grid.Column>
                                                                    <div style={{ border: '1px', borderColor: 'green' }} >
                                                                        <ReactPlayer
                                                                            className='react-player'
                                                                            url={reactivo.url}
                                                                            width='100%'
                                                                            height='100%'
                                                                            controls={true}
                                                                        />
                                                                    </div>
                                                                </Grid.Column>
                                                            </Grid.Row>
                                                    }
                                                </Grid.Column>
                                                </Grid.Row>                                                
                                            </Grid>
                                    </div>
                                ))
                            }
                        </Grid.Column>
                    </Grid.Row>
                </Grid>

            </Modal.Content>

            <Modal.Actions>
                <Button
                    color='grey'
                    content='Cerrar'
                    labelPosition='right'
                    icon='undo'
                    onClick={handleClose}
                />

                <Button
                    color='blue'
                    content='Responder'
                    labelPosition='right'
                    icon='angle up'
                    onClick={handleSubmitAnswer}
                />
            </Modal.Actions>

        </Modal>

    );
}
