import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Grid, Form, Image, Button } from 'semantic-ui-react';
import RectangleSelection from 'react-rectangle-selection';
import { uiCloseModal, uiOpenModal } from '../../../actions/modal';
import '../../../styles/generalStyles.css';
import { questionsStartAddNew, startUploadingImage } from '../../../actions/questions';

export const QuestionAddModal = () => {

    const dispatch = useDispatch();

    const [formValues, setFormValues] = useState({
        instrucciones: '',
        pregunta: '',
        valor: ''
    });

    const { instrucciones, pregunta, valor } = formValues;

    const [imageLoaded, setImageLoaded] = useState(false);

    const handleInputChange = ({target}) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
        //console.log(formValues);
    }

    const [questionImage, setQuestionImage] = useState("https://react.semantic-ui.com/images/wireframe/image.png");

    const {modalOpen} = useSelector( state => state.modal );

    const openModal = () => {
        dispatch( uiOpenModal() );
    }

    const closeModal = () => {
        dispatch( uiCloseModal() );
    }

    const onChangeImage = (e) =>{
        const fileQuestion = e.target.files[0];
        if(e){
            setQuestionImage( URL.createObjectURL(fileQuestion));
            setImageLoaded(true);
            dispatch( startUploadingImage(e.target.files[0]) );
        }else {
            console.log("fallo al cargar imagen");
            setImageLoaded(false);
        }

    }

    const [coords, setState ] = useState(null);

    const handleArea = (e, coords) => {
        setState({
            origin: coords.origin,
            target: coords.target
        });
        console.log("Origen: ", coords.origin[0], coords.origin[1]);
        console.log("Fin: ", coords.target[0], coords.target[1]);
    }

    /*const validarValor = () => {
        if(valor>10){
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'La pregunta debe de tener un valor máximo de 10',
                timer: 2000
            });
            return false;
        } else {
            return true
        }
    }*/

    const handleSubmitForm = (e) => {
        e.preventDefault();
        if(imageLoaded === true) {
            dispatch( questionsStartAddNew(formValues) );
            dispatch( uiCloseModal() );
        } else {
            dispatch( uiCloseModal() );
        }
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
                                            <label>Instrucciones</label>
                                            <Form.Input
                                                required
                                                type="text"
                                                name="instrucciones"
                                                placeholder="Instrucciones"
                                                autoComplete="off"
                                                value={ instrucciones }
                                                onChange={ handleInputChange }
                                            />
                                        </Form.Field>

                                        <Form.Field required>
                                            <label>Pregunta</label>
                                            <Form.Input
                                                type="text"
                                                name="pregunta"
                                                placeholder="Pregunta"
                                                autoComplete="off"
                                                value={ pregunta }
                                                onChange={ handleInputChange }
                                            />
                                        </Form.Field>

                                        <Form.Field required>
                                            <label>Valor</label>
                                            <Form.Input
                                                type="number"
                                                min="0.01"
                                                max="10" 
                                                step="0.01"
                                                name="valor"
                                                placeholder="Valor"
                                                autoComplete="off"
                                                value={ valor }
                                                onChange={ handleInputChange }
                                            />
                                        </Form.Field>

                                        <Form.Field  className="ui centered" required>
                                            <label>Archivo</label>
                                            <input
                                                id="questionFile"
                                                type="file"
                                                name="questionImage"
                                                style={{
                                                    padding: '0px',
                                                    border: '0px'
                                                }}
                                                onChange={ onChangeImage }
                                            />
                                        </Form.Field>

                                        
                                        <div>
                                            <RectangleSelection
                                                onSelect={ handleArea }
                                                style={{
                                                backgroundColor: 'rgba(0,0,255,0.4)',
                                                borderColor: 'blue'
                                                }}
                                            >
                                                <Image src={questionImage} size='large' accept='image/*' style={{margin: '0px', minWidth: '450px'}} centered />
                                            </RectangleSelection>
                                        </div>
                                        

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
                    onClick={ closeModal }
                />
                <Button
                    content="Subir"
                    labelPosition='right'
                    icon='checkmark'
                    onClick={ handleSubmitForm }
                    positive
                />
            </Modal.Actions>

        </Modal>        
    );
}
