import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Grid, Form, Header, Button, Image } from 'semantic-ui-react';
import { uiCloseModal, uiOpenModal } from '../../../../actions/modal';
import { questionsStartAddNew } from '../../../../actions/questions';
import ReactPlayer from 'react-player';
import '../../../../styles/generalStyles.css';

export const QuestionAddModalCopy = () => {

    const dispatch = useDispatch();

    const { modalOpen } = useSelector(state => state.modal);

    const openModal = () => {
        dispatch(uiOpenModal());
    }

    const closeModal = () => {
        dispatch(uiCloseModal());
    }

    const [url1, setUrl1] = useState('')

    const handleUrl1 = (e) => {
        setUrl1(e.target.value);
    }

    console.log('url1 ', url1);

    const [formValues, setFormValues] = useState({
        pregunta: '',
        reactivos: [],
        respuesta: ''
    });

    const { pregunta, reactivos, respuesta } = formValues;

    const [uploadButton, setUploadButton] = useState(true);

    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value,
        });
    }

    useEffect(() => {
        if (formValues.pregunta.length > 0
        ) {
            setUploadButton(false);
        } else {
            setUploadButton(true);
        }
    }, [formValues]);

    const handleSubmitForm = (e) => {
        e.preventDefault();
        console.log('formValues', formValues);
        //if (1 === 2) {
        //    dispatch(questionsStartAddNew(formValues));
        //dispatch(uiCloseModal());
        //} else {
        //dispatch(uiCloseModal());
        //}
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

                                <Button.Group size='large' widths='2' style={{ marginBottom: '8px' }}>

                                    <Button
                                        //basic={imagen}
                                        color='blue'
                                        //onClick={handleImage}
                                    >
                                        Imagen
                                    </Button>

                                    <Button.Or text='o' />

                                    <Button
                                        //basic={audioVideo}
                                        color='blue'
                                        //onClick={handlePlayer}
                                    >
                                        Audio / Vídeo
                                    </Button>

                                </Button.Group>

                                <Form.Field required>
                                    <label>Link multimedia</label>
                                    <Form.Input
                                        type="text"
                                        name="url1"
                                        placeholder="Link"
                                        autoComplete="off"
                                        value={url1}
                                        onChange={handleUrl1}
                                    />
                                </Form.Field>
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
    )
}


// import { nanoid } from 'nanoid';
// import React, { useRef, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Modal, Grid, Form, Header, Button, Image } from 'semantic-ui-react';
// import { uiCloseModal, uiOpenModal } from '../../../../actions/modal';
// import { produce } from 'immer';

// export const QuestionAddModalCopy = () => {

//     const dispatch = useDispatch();

//     const { modalOpen } = useSelector(state => state.modal);

//     const openModal = () => {
//         dispatch(uiOpenModal());
//     }

//     const closeModal = () => {
//         dispatch(uiCloseModal());
//     }

//     const [reactivos, setReactivos] = useState([]);

//     const reactivosRef= useRef();

//     const copyToForm = () => {
//         setformValues({
//             ...formValues, reactivos: reactivos
//         });
//     }

//     const [formValues, setformValues] = useState({
//         pregunta: 'Ejemplo',
//         reactivos: reactivos
//     });

//     const handleSubmitForm = () => {
//         console.log(reactivosRef.current);
//     }

//     return (
//         <Modal
//             centered
//             onClose={closeModal}
//             onOpen={openModal}
//             open={modalOpen}
//             size='large'
//             trigger={<Button positive icon='add' content='Agregar nueva pregunta' />}
//         >
//             <Modal.Header>Agregar una nueva pregunta</Modal.Header>
//             <Modal.Content>
//                 <Grid centered>
//                     <Grid.Row>
//                         <Grid.Column width={16}>

//                             <Form>
//                                 <Button
//                                     onClick={() => {
//                                         setReactivos(currentReactivos => [
//                                             ...currentReactivos,
//                                             {
//                                                 id: nanoid(1),
//                                                 reactivo: ""
//                                             }
//                                         ]);
//                                     }}
//                                 >
//                                     add new person
//                                 </Button>


//                                 {reactivos.map((r, index) => {
//                                     return (
//                                         <div key={r.id}>
//                                             <Form.Input
//                                                 onChange={e => {
//                                                     const reactivo = e.target.value;
//                                                     setReactivos(currentReactivos =>
//                                                         produce(currentReactivos, v => {
//                                                             v[index].reactivo = reactivo;
//                                                         })
//                                                     );
//                                                     copyToForm();
//                                                 }}
//                                                 value={r.reactivo}
//                                                 ref={reactivosRef}
//                                                 placeholder="Link de reactivo"
//                                             />
//                                             <Button
//                                                 onClick={() => {
//                                                     setReactivos(currentReactivos =>
//                                                         currentReactivos.filter(x => x.id !== r.id)
//                                                     );
//                                                 }}
//                                             >
//                                                 x
//                                             </Button>
//                                         </div>
//                                     );
//                                 })}
//                                 <div>{JSON.stringify(reactivos)}</div>
//                                 <div>{JSON.stringify(formValues)}</div>
//                             </Form>

//                         </Grid.Column>
//                     </Grid.Row>
//                 </Grid>

//             </Modal.Content>

//             <Modal.Actions>
//                 <Button
//                     color='grey'
//                     content="Cancelar"
//                     labelPosition='right'
//                     icon='close'
//                     onClick={closeModal}
//                 />
//                 <Button
//                     content="Subir"
//                     labelPosition='right'
//                     icon='checkmark'
//                     onClick={handleSubmitForm}
//                     positive
//                 />
//             </Modal.Actions>

//         </Modal>

//     )
// }
