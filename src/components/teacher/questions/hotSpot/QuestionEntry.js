import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Table, Button, Loader } from 'semantic-ui-react';
import { QuestionEditModal } from './QuestionEditModal';
import { QuestionActiveModal } from './QuestionActiveModal';
import { startDeleteQuestion } from '../../../../actions/questions';

export const QuestionEntry = ({ id, instrucciones, pregunta, valor, imagen }) => {

    const dispatch = useDispatch();

    const loader = (<Loader size='small' active inline='centered' />);

    const questionId = useRef(id);

    const handleDelete = () => {
        dispatch(startDeleteQuestion(questionId.current));
    }

    return (
        <>
            {
                id === null
                    ?
                    <Table.Row>
                        <Table.Cell>{loader}</Table.Cell>
                        <Table.Cell>{loader}</Table.Cell>
                        <Table.Cell>{loader}</Table.Cell>
                        <Table.Cell>{loader}</Table.Cell>
                    </Table.Row>
                    :
                    <Table.Row>
                        <Table.Cell>{id}</Table.Cell>
                        <Table.Cell>{pregunta}</Table.Cell>
                        <Table.Cell>{valor}</Table.Cell>
                        <Table.Cell>
                            <QuestionEditModal id={id} instrucciones={instrucciones} pregunta={pregunta} valor={valor} />
                            <QuestionActiveModal id={id} instrucciones={instrucciones} pregunta={pregunta} valor={valor} imagen={imagen} />
                            <Button color='red' icon='times rectangle' size='mini' onClick={handleDelete} />
                        </Table.Cell>
                    </Table.Row>
            }
        </>
    );
}
