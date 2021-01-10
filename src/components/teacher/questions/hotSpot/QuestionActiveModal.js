import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Modal, Header, Image, Icon, Button } from 'semantic-ui-react';
import { answersSetAnswer, answersUpdateAnswer } from '../../../../actions/answers';
import { activeQuestion, questionClearActiveQuestion } from '../../../../actions/questions';
import '../../../../styles/generalStyles.css';

export const QuestionActiveModal = ({ id, imagen, instrucciones, pregunta, valor }) => {

    const dispatch = useDispatch();

    const answers = useSelector(state => state.answers.answers);

    const [styles, setStyles] = useState({
        left: '0px',
        top: '0px',
        opacity: 0
    });

    const { left, top, opacity } = styles;

    const idReactivo = 0;

    const [coords, setCoords] = useState({
        xCoord: 0,
        yCoord: 0
    });

    const { xCoord, yCoord } = coords;

    const [open, setOpen] = useState(false);

    const onSelectViewQuestion = () => {
        dispatch(
            activeQuestion(id, { imagen, instrucciones, pregunta, valor })//de aquí vamos al archivo questions de la carpeta actions
        );
    }

    const onClose = () => {
        setOpen(false);
    }

    const onOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {

        dispatch(questionClearActiveQuestion());

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

        setOpen(false);
    }

    const handleCoordinates = (event) => {

        const xCoordinate = parseFloat(event.nativeEvent.offsetX);
        const yCoordinate = parseFloat(event.nativeEvent.offsetY);

        setCoords({
            ...coords,
            xCoord: xCoordinate,
            yCoord: yCoordinate
        });

        const imageStyles = document.getElementById("imagenId");
        const info = window.getComputedStyle(imageStyles);

        const marginLeft = parseFloat(info.marginLeft);
        const marginTop = parseFloat(info.marginTop);

        const x = marginLeft + xCoordinate;
        const y = marginTop + yCoordinate;

        const leftStyle = (x - 2) + "px";
        const topStyle = (y - 15) + "px";

        setStyles({
            ...styles,
            left: leftStyle,
            top: topStyle,
            opacity: 1.0
        });

        const respuesta = xCoordinate + "," + yCoordinate;

        const pregunta = { id, idReactivo, respuesta };

        answers.forEach(answer => {
            if (answer.id === id) {
                dispatch( answersUpdateAnswer(pregunta) );
            }
        });

    }

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

    const handleSubmitAnswer = () => {

        const respuesta = xCoord + "," + yCoord;

        let exists = false;

        const answer = { id, idReactivo, respuesta };

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
                                <Header>Instrucciones </Header>
                                <p>
                                    {instrucciones}
                                </p>
                                <Header>Pregunta</Header>
                                <p>
                                    {pregunta}
                                </p>
                                <Header>Valor</Header>
                                <p>
                                    {valor}
                                </p>
                                <Header>Imagen</Header>

                            </Modal.Description>
                        </ Grid.Column>
                    </ Grid.Row>
                </ Grid>

                <Grid centered>
                    <Grid.Row>
                        <Grid.Column width={16}>
                            <Image
                                src={imagen}
                                id="imagenId"
                                size='large'
                                accept="image/*"
                                onClick={handleCoordinates} centered
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

            </Modal.Content>

            <Modal.Actions>
                <Button
                    color='grey'
                    content="Cerrar"
                    labelPosition='right'
                    icon='undo'
                    onClick={handleClose}
                />

                <Button
                    color='blue'
                    content="Responder"
                    labelPosition='right'
                    icon='angle up'
                    onClick={handleSubmitAnswer}
                />
            </Modal.Actions>

        </Modal>

    );
}
