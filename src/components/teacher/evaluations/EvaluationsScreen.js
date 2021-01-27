
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Header, Button, Icon, Image } from 'semantic-ui-react';
import ReactPlayer from 'react-player';
import { answersSetAnswer, answersUpdateAnswer } from '../../../actions/answers';

export const EvaluationsScreen = () => {

    const dispatch = useDispatch();

    let hotSpotQuestions = useSelector(state => state.questions.questions);

    let hotObjectQuestions = useSelector(state => state.questionsHotObject.questions);

    let test = hotObjectQuestions.concat(hotSpotQuestions);//este va a ser el objeto examen que contendrá todas las preguntas

    const [position, setPosition] = useState(0)

    let question = test[position];

    let backButton = (position === 0) ? true : false;

    let nextButton = (position >= test.length - 1) ? true : false;

    const reactiveList = useSelector(state => state.answers.reactiveList);

    const [answer, setAnswer] = useState({
        id: '',
        idReactivo: '',
        respuesta: null
    });

    /*BEGIN Hot Object*/
    let idQuestion = (question.tipo === 1) ? question.id : null;

    let reactivosHo = (question.tipo === 1) ? question.reactivos : [];

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

    const handleClickAnswer = (id, reactivo) => {
        setSelectedId(id);

        setAnswer({ ...answer, id: idQuestion, idReactivo: reactivosHo.id, respuesta: reactivo.answer });

        let pregunta = { id: idQuestion, idReactivo: reactivosHo.id, respuesta: reactivo.answer };

        answers.forEach(answer => {
            if (answer.id === idQuestion) {
                dispatch(answersUpdateAnswer(pregunta));
            }
        });
    }
    /*END Hot Object*/

    /*BEGIN Hot Spot*/
    const [styles, setStyles] = useState({
        left: '0px',
        top: '0px',
        opacity: 0
    });

    const { left, top, opacity } = styles;

    const [coords, setCoords] = useState({
        xCoord: 0,
        yCoord: 0
    });

    const { xCoord, yCoord } = coords;

    const hideIcon = () => {
        const hideIcon = () => {
            setStyles({
                ...styles,
                left: '0px',
                top: '0px',
                opacity: 0
            });

            setCoords({
                ...coords,
                xCoord: 0,
                yCoord: 0
            });

        }
    }

    const handleCoordinates = (event) => {
        const xCoordinate = parseFloat(event.nativeEvent.offsetX);
        const yCoordinate = parseFloat(event.nativeEvent.offsetY);

        setCoords({ ...coords, xCoord: xCoordinate, yCoord: yCoordinate });

        const imageStyles = document.getElementById("imagenId");
        const info = window.getComputedStyle(imageStyles);

        const marginLeft = parseFloat(info.marginLeft);
        const marginTop = parseFloat(info.marginTop);

        const x = marginLeft + xCoordinate;
        const y = marginTop + yCoordinate;

        const leftStyle = (x - 2) + "px";
        const topStyle = (y - 15) + "px";

        setStyles({ ...styles, left: leftStyle, top: topStyle, opacity: 1.0 });

        let cvb = null;

        (xCoordinate >= question.lados.sideD && xCoordinate <= question.lados.sideB 
            && yCoordinate >= question.lados.sideA && yCoordinate <= question.lados.sideC)
        ? cvb = true
        : cvb = false

        let id = question.id;

        const pregunta = { id, idReactivo: 0, respuesta: cvb };

        answers.forEach(answer => {
            if (answer.id === id) {
                dispatch( answersUpdateAnswer(pregunta) );
            }
        });
    }
    /*END Hot Spot*/

    const nextQuestion = () => {
        setTimeout(() => {
            setPosition(position + 1);
        }, 500);
    }

    const previousQuestion = () => {
        setTimeout(() => {
            setPosition(position - 1);
        }, 500);
    }

    const handleSubmitAnswers = () => {
    }

    console.log('reactivosHo', reactivosHo);

    return (
        <div>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={16}>
                        <Header as='h2' textAlign='center'>Título</Header>
                        <Header as='h3' textAlign='left'>Descripción</Header>
                        <Header as='h3' textAlign='left'>Grupo</Header>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <Grid centered>
                <Grid.Row>
                    <Grid.Column width={16}>

                        <Header>{"Pregunta N° "+(position+1)}</Header>
                        <Header as='h4' textAlign='left'>{question.pregunta}</Header>

                        {
                            (question.tipo === 0) //hot object
                                ?
                                <Grid centered>
                                    <Grid.Row>
                                        <Grid.Column width={16}>
                                            <Image
                                                src={question.imagen}
                                                id="imagenId"
                                                size='large'
                                                onClick={handleCoordinates}
                                                centered
                                            />
                                            <Icon
                                                circular inverted color='teal'
                                                name='map marker alternate'
                                                style={
                                                    {
                                                        position: 'absolute',
                                                        left: left,
                                                        top: top,
                                                        opacity: opacity
                                                    }
                                                }
                                                onClick={hideIcon}
                                            />
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                                :
                                <div></div>
                        }

                        {
                            reactivosHo.map(reactivo => (
                                <div key={reactivo.id}>
                                    <Grid>
                                        <Grid.Row centered>
                                            <Grid.Column width={16}>
                                                <Header as='h3'>Opción {reactivo.id}</Header>
                                            </Grid.Column>
                                            <Grid.Row centered>
                                                <Grid.Column
                                                    width={7}
                                                    style={(reactivo.id === selectedId) ? answerStyle : optionsStyle}
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
                                        </Grid.Row>
                                    </Grid>
                                </div>
                            ))
                        }


                        <Button.Group floated='left'>
                            <Button
                                disabled={backButton}
                                color='grey'
                                content='atrás'
                                labelPosition='left'
                                icon='left arrow'
                                onClick={previousQuestion}
                            />
                            <Button
                                disabled={nextButton}
                                color='blue'
                                content='siguiente'
                                labelPosition='right'
                                icon='right arrow'
                                onClick={nextQuestion}
                            />
                        </Button.Group>

                        <Button.Group floated='right'>
                            <Button
                                color='green'
                                content="Enviar Respuestas"
                                labelPosition='right'
                                icon='angle up'
                                onClick={handleSubmitAnswers}
                            />
                        </Button.Group>

                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    )
}
