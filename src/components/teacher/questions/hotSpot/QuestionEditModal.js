import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Grid, Form, Image, Button } from 'semantic-ui-react';
import { activeQuestion, questionClearActiveQuestion, questionStartUpdate } from '../../../../actions/questions';
import ResizableReact from 'react-resizable-rotatable-draggable';
import { showAlertWindow } from '../../../../helpers/resizeAnswerZone';

export const QuestionEditModal = ({ id, pregunta, imagen, lados }) => {

    const dispatch = useDispatch();

    const { active: question } = useSelector((state) => state.questions);

    const [uploadButton, setUploadButton] = useState(true)

    const [area, setArea] = useState({
        top: lados.sideA,
        width: lados.sideB-lados.sideD,
        height: lados.sideC-lados.sideA,
        left: lados.sideD,
        rotateAngle: 0
    });

    const { width, height, top, left, rotateAngle } = area;

    const [sides, setSides] = useState({
        sideA: area.top,
        sideB: area.width + area.left,
        sideC: area.height + area.top,
        sideD: area.left
    });

    const { sideA, sideB, sideC, sideD } = sides;

    const [formValues, setFormValues] = useState({
        pregunta: pregunta,
        imagen: imagen,
        lados: {
            ladoA: area.top,
            ladoB: area.width + area.left,
            ladoC: area.height + area.top,
            ladoD: area.left
        }
    });

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

    const handlePreguntaChange = (e) => {
        setFormValues({
            ...formValues,
            pregunta: e.target.value
        });
        if(e.target.value.length > 0){
            setUploadButton(false);
        }else{
            setUploadButton(true);
        }
    }

    const handleImagenChange = (e) => {
        setFormValues({
            ...formValues,
            imagen: e.target.value
        });
        if(e.target.value.length > 0){
            setUploadButton(false);
        } else {
            setUploadButton(true);
        }
    }

    const handleActiveQuestion = () => {
        dispatch(activeQuestion(id, { pregunta, lados }));
    }

    const [open, setOpen] = useState(false);

    useEffect(() => {

        dispatch(activeQuestion(id, { ...formValues }));

    }, [formValues, dispatch, id])

    const onClose = () => {
        setOpen(false);
    }

    const onOpen = () => {
        setOpen(true);
    }

    const handleCancelar = () => {
        setOpen(false);
        dispatch(questionClearActiveQuestion());
    }

    const handleEditar = () => {
        dispatch(questionStartUpdate({ ...formValues, id }));
        dispatch(questionClearActiveQuestion());
        setOpen(false);
    }

    return (
        <Modal
            centered
            onClose={onClose}
            onOpen={onOpen}
            open={open}
            size='large'
            trigger={<Button color='blue' icon='edit' size='mini' onClick={handleActiveQuestion} />}
        >

            <Modal.Header>Editar pregunta</Modal.Header>
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
                                        defaultValue={pregunta}
                                        onChange={handlePreguntaChange}
                                    />
                                </Form.Field>

                                <Form.Field required>
                                    <label>Link de imagen</label>
                                    <Form.Input
                                        type="text"
                                        name="imagen"
                                        placeholder="Link de imagen"
                                        autoComplete="off"
                                        defaultValue={imagen}
                                        onChange={handleImagenChange}
                                    />
                                </Form.Field>

                            </Form>

                            <Form style={{ width: '450px' }}>
                                <div id="AnswerImage" style={{ margin: '0px', width: '100%' }}>

                                    <Image src={(formValues.imagen === imagen || formValues.imagen.length === 0) ? imagen : formValues.imagen} size='large' accept='image/*' style={{ margin: '0px', width: '450px' }} centered />


                                    {
                                        //(imageLoaded === true) ?
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
                                        //    : <div>{imageLoaded}</div>
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
                    content='Cancelar'
                    labelPosition='right'
                    icon='close'
                    onClick={handleCancelar}
                />
                <Button
                    disabled={uploadButton}
                    content='Editar'
                    labelPosition='right'
                    icon='checkmark'
                    onClick={handleEditar}
                    positive
                />
            </Modal.Actions>
        </Modal>
    );
}