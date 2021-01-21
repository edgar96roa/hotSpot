import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Grid, Modal, Header, Button } from 'semantic-ui-react';
//import { answersSetAnswer, answersUpdateAnswer } from '../../../../actions/answers';
import { activeQuestion, questionClearActiveQuestion } from '../../../../actions/questions';
import '../../../../styles/generalStyles.css';

export const QuestionActiveModal = ({ id, pregunta, reactivos }) => {

    const dispatch = useDispatch();

    //const answers = useSelector(state => state.answers.answers);

    const [open, setOpen] = useState(false);

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

        dispatch(questionClearActiveQuestion());

        setOpen(false);
    }

    const handleSubmitAnswer = () => {

        console.log("respondiendo...");

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
                                <Header>Imagen</Header>

                            </Modal.Description>
                        </ Grid.Column>
                    </ Grid.Row>
                </ Grid>

                <Grid centered>
                    <Grid.Row>
                        <Grid.Column width={16}>
                            {
                                reactivos.map(reactivo => (
                                    <div key={reactivo.id}>
                                        {reactivo.id}
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
