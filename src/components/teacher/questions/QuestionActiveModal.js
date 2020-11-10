import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Header, Image, Button } from 'semantic-ui-react';
import { activeQuestion } from '../../../actions/questions';
//import { uiCloseModal, uiOpenModal } from '../../../actions/modal';
import '../../../styles/generalStyles.css';

export const QuestionActiveModal = ( { id, instrucciones, pregunta, valor } ) => {
    
    const dispatch = useDispatch();

    const onSelectViewQuestion = () => {
        dispatch( 
            activeQuestion( id, { instrucciones, pregunta, valor })
        );
    }

    const [open, setOpen] = useState(false);

    return (

        <Modal
            centered
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            size='large'
            trigger={<Button icon='eye' size='mini' onClick={onSelectViewQuestion} />}
        >
            <Modal.Header>Visualización de pregunta</Modal.Header>
            <Modal.Content>
                
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
                    <Image src="https://react.semantic-ui.com/images/wireframe/image.png" size='large' accept="image/*" centered />
                </Modal.Description>
                
            </Modal.Content>
            
            <Modal.Actions>
                <Button 
                    color='grey'
                    content="Cerrar"
                    labelPosition='right'
                    icon='undo'
                    onClick={() => setOpen(false)}
                />
            </Modal.Actions>

        </Modal>
        
    );
}
