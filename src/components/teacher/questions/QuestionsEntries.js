import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, Segment, Table } from 'semantic-ui-react';
import '../../../styles/generalStyles.css';
import { QuestionEntry } from './QuestionEntry';
import { QuestionAddModal } from './QuestionAddModal';

export const QuestionsEntries = () => {

    const { questions: preguntas } = useSelector( state => state.questions );

    return (
        <div>

            <Grid centered className="TableCentered">
                <Grid.Row>
                    <Grid.Column mobile={14} tablet={14} computer={12}>
                        
                        <Segment.Group>
                        <Segment size='massive' textAlign='center'><b>Questions</b></Segment>
                            <Segment.Group>
                                <Table celled>
                                    <Table.Header>
                                        <Table.Row>
                                            <Table.HeaderCell >Id</Table.HeaderCell>
                                            <Table.HeaderCell >Pregunta</Table.HeaderCell>
                                            <Table.HeaderCell >Valor</Table.HeaderCell>
                                            <Table.HeaderCell width={3}>Acciones</Table.HeaderCell>                                        
                                        </Table.Row>
                                    </Table.Header>

                                    <Table.Body>
                                        {
                                            preguntas.map( pregunta => (
                                                <QuestionEntry
                                                    key={pregunta.id} 
                                                    { ...pregunta }
                                                />
                                            ))
                                        }
                                    </Table.Body>
                                    
                                </Table>
                            </Segment.Group>

                            <Segment>
                                <QuestionAddModal />
                            </Segment>

                        </Segment.Group>
                    </Grid.Column>
                </Grid.Row>
            </Grid>

        </div>
    );
}