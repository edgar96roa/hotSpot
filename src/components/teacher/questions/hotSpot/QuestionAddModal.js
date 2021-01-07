import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Grid, Form, Image, Button } from 'semantic-ui-react';
import { uiCloseModal, uiOpenModal } from '../../../../actions/modal';
import { questionsStartAddNew } from '../../../../actions/questions';
import ResizableReact from 'react-resizable-rotatable-draggable';
import { showAlertWindow } from '../../../../helpers/resizeAnswerZone';
import '../../../../styles/generalStyles.css';

export const QuestionAddModal = () => {

    const dispatch = useDispatch();

    const [area, setArea] = useState({
        top: 0,
        width: 100,
        height: 100,
        left: 0,
        rotateAngle: 0
    });

    const [sides, setSides] = useState({
        sideA: area.top,
        sideB: area.width + area.left,
        sideC: area.height + area.top,
        sideD: area.left
    });

    const [formValues, setFormValues] = useState({
        instrucciones: '',
        pregunta: '',
        valor: 0,
        imagen: 'https://react.semantic-ui.com/images/wireframe/image.png',
        lados: {
            ladoA: area.top,
            ladoB: area.width + area.left,
            ladoC: area.height + area.top,
            ladoD: area.left
        }
    });

    const { instrucciones, pregunta, valor, imagen } = formValues;

    const [imageLoaded, setImageLoaded] = useState(false);

    const { sideA, sideB, sideC, sideD } = sides;

    const { width, height, top, left, rotateAngle } = area;

    const [uploadButton, setUploadButton] = useState(true);

    const handleDrag = (deltaX, deltaY) => {

        let elem = document.querySelector('#AnswerImage');
        let imageAnswer = elem.getBoundingClientRect();

        setSides({
            ...sides,
            sideA: area.top,
            sideB: area.width + area.left,
            sideC: area.height + area.top,
            sideD: area.left
        });

        setFormValues({
            ...formValues,
            lados: sides
        });

        if (sideA >= 0 && sideD >= 0) {
            setArea({
                ...area,
                top: top + deltaY,
                left: left + deltaX
            });
        }

        //when SideA is < than 0 on the top
        if (sideA < 0) {
            setArea({ ...area, top: 0 });
        }

        //when SideB is > than image's width
        if (sideB > imageAnswer.width) {
            setArea({ ...area, left: imageAnswer.width - width });
        }

        //when SideC is > than image's height
        if (sideC > imageAnswer.height) {
            setArea({ ...area, top: imageAnswer.height - area.height });
        }

        //when SideD is < than image's left
        if (sideD < 0) {
            setArea({ ...area, left: 0 });//ok
        }

    }

    const handleResize = (style, isShiftKey, type) => {

        let elem = document.querySelector('#AnswerImage');
        let imageAnswer = elem.getBoundingClientRect();

        // type is a string and it shows which resize-handler you clicked
        // e.g. if you clicked top-right handler, then type is 'tr'
        let { top, left, width, height } = style;

        top = Math.round(top);
        left = Math.round(left);
        width = Math.round(width);
        height = Math.round(height);

        setArea({
            // ...area,
            top,
            left,
            width,
            height
        });

        setSides({
            // ...sides,
            sideA: top, // top 
            sideB: area.left + area.width, // rigth
            sideC: area.top + area.height, // bottom
            sideD: left // left
        });

        setFormValues({
            ...formValues,
            lados: sides
        });

        if (sideA < 0) {
            //returns answer.top in 0 pixels
            setArea({ ...area, top: 0 });
        }

        if (sideB > imageAnswer.width && sideC > imageAnswer.height) {
            showAlertWindow();
            setTimeout(() => {
                setArea({ ...area, left: sideD, width: imageAnswer.width - sideD, top: sideA, height: imageAnswer.height - sideA });
                setSides({ ...sides, sideB: imageAnswer.width - left, sideC: imageAnswer.height - top });
                // setFormValues({ ...formValues.lados, ladoB: sideB, ladoC: sideC });
            }, 2000);
            setArea({ ...area, left: sideD, width: imageAnswer.width - sideD, top: sideA, height: imageAnswer.height - sideA });
            setSides({ ...sides, sideB: imageAnswer.width - left, sideC: imageAnswer.height - top });
        } else if (sideB > imageAnswer.width || imageAnswer.width - sideB <= 5) {
            //returns answer.width with imageAnswer.width pixels
            showAlertWindow();
            setArea({ ...area, left: sideD, width: imageAnswer.width - sideD });
            setSides({ ...sides, sideB: imageAnswer.width - left });
            setTimeout(() => {
                if (sideB > imageAnswer.width) {
                    setArea({ ...area, left: sideD, width: imageAnswer.width - sideD });
                    setSides({ ...sides, sideB: imageAnswer.width - left });
                }
            }, 2000);
            setArea({ ...area, left: sideD, width: imageAnswer.width - sideD });
            setSides({ ...sides, sideB: imageAnswer.width - left });
        } else if (sideC > imageAnswer.height || imageAnswer.height - sideC <= 5) {
            //returns answer.height with imageAnswer.height pixels
            showAlertWindow();
            setTimeout(() => {
                setArea({ ...area, top: sideA, height: imageAnswer.height - sideA });
                setSides({ ...sides, sideC: imageAnswer.height - top });
            }, 2000);
            setArea({ ...area, top: sideA, height: imageAnswer.height - sideA });
            setSides({ ...sides, sideC: imageAnswer.height - top });
        }

        if (sideD < 0) {
            //returns answer.top in 0 pixels
            setArea({ ...area, left: 0 });//ok
        }

    }

    const validateForm = () => {

        if (formValues.instrucciones.length > 0) {
            setUploadButton(false);
        } else {
            setUploadButton(true);
        }

        if (formValues.pregunta.length > 0) {
            setUploadButton(false);
        } else {
            setUploadButton(true);
        }

        if (formValues.valor > 0 && formValues.valor <= 10) {
            setUploadButton(false);
        } else {
            setUploadButton(true);
        }

        if (formValues.imagen === 'https://react.semantic-ui.com/images/wireframe/image.png') {
            setUploadButton(true);
            setImageLoaded(false);
        } else {
            setUploadButton(false);
            setImageLoaded(true);
        }

    }

    useEffect(() => {
        if (formValues.instrucciones.length > 0) {
            setUploadButton(false);
        } else {
            setUploadButton(true);
        }

        if (formValues.pregunta.length > 0) {
            setUploadButton(false);
        } else {
            setUploadButton(true);
        }

        if (formValues.valor > 0 && formValues.valor <= 10) {
            setUploadButton(false);
        } else {
            setUploadButton(true);
        }

        if (formValues.imagen === 'https://react.semantic-ui.com/images/wireframe/image.png') {
            setUploadButton(true);
            setImageLoaded(false);
        } else {
            setUploadButton(false);
            setImageLoaded(true);
        }
    }, [formValues]);

    const handleInputChange = ({ target }) => {
        validateForm();
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
    }

    const { modalOpen } = useSelector(state => state.modal);

    const openModal = () => {
        dispatch(uiOpenModal());
    }

    const closeModal = () => {
        dispatch(uiCloseModal());
        setArea({
            top: 0,
            width: 100,
            height: 100,
            left: 0,
            rotateAngle: 0
        });
        setFormValues({
            ...formValues,
            instrucciones: '',
            pregunta: '',
            valor: 0,
            imagen: 'https://react.semantic-ui.com/images/wireframe/image.png',
            lados: {
                ladoA: area.top,
                ladoB: area.width + area.left,
                ladoC: area.height + area.top,
                ladoD: area.left
            }
        });
    }

    const handleSubmitForm = (e) => {
        e.preventDefault();
        if (imageLoaded === true) {
            dispatch(questionsStartAddNew(formValues));
            dispatch(uiCloseModal());
        } else {
            dispatch(uiCloseModal());
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
                                        value={instrucciones}
                                        onChange={handleInputChange}
                                    />
                                </Form.Field>

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

                                <Form.Field required>
                                    <label>Valor</label>
                                    <Form.Input
                                        type="number"
                                        min="0.10"
                                        max="10"
                                        step="0.10"
                                        name="valor"
                                        placeholder="Valor"
                                        autoComplete="off"
                                        value={valor}
                                        onChange={handleInputChange}
                                    />
                                </Form.Field>

                                <Form.Field required>
                                    <label>Link de imagen</label>
                                    <Form.Input
                                        type="text"
                                        name="imagen"
                                        placeholder="Link de imagen"
                                        autoComplete="off"
                                        value={imagen}
                                        onChange={handleInputChange}
                                    />
                                </Form.Field>

                            </Form>

                            <Form style={{ width: '450px' }}>
                                <div id="AnswerImage" style={{ margin: '0px', width: '100%' }}>

                                    <Image src={imagen} size='large' accept='image/*' style={{ margin: '0px', width: '450px' }} centered />


                                    {
                                        (imageLoaded === true) ?
                                            <ResizableReact
                                                left={left}
                                                top={top}
                                                width={width}
                                                height={height}
                                                rotateAngle={rotateAngle}
                                                aspectRatio={false}
                                                minWidth={50}
                                                minHeight={50}
                                                zoomable='n, w, s, e, nw, ne, se, sw'
                                                rotatable={false}
                                                onResize={handleResize}
                                                onDrag={handleDrag}
                                            />
                                            : <div>{imageLoaded}</div>
                                    }

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
    );
}
