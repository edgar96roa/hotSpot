import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Table, Button } from 'semantic-ui-react';
import { QuestionEditModal } from './QuestionEditModal';
import { QuestionActiveModal } from './QuestionActiveModal';
import { startDeleteQuestion } from '../../../actions/questions';

export const QuestionEntry = ({ id, instrucciones, pregunta, valor, archivo }) => {
    
    const dispatch = useDispatch();

    const questionId = useRef( id );

    const handleDelete = () => {
        dispatch( startDeleteQuestion(questionId.current) );
    }

    return (
        <Table.Row>
            <Table.Cell>{id}</Table.Cell>
            <Table.Cell>{pregunta}</Table.Cell>
            <Table.Cell>{valor}</Table.Cell>
            <Table.Cell textAlign='center'>
                <QuestionEditModal id={id} instrucciones={instrucciones} pregunta={pregunta} valor={valor} />
                <QuestionActiveModal id={id} instrucciones={instrucciones} pregunta={pregunta} valor={valor} />
                <Button color='red' icon='times rectangle' size='mini' onClick={ handleDelete } />
            </Table.Cell>
        </Table.Row>
    );
}
