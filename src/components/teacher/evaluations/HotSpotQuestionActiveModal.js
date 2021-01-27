// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Grid, Modal, Header, Image, Icon, Button } from 'semantic-ui-react';
// import { answersSetAnswer, answersUpdateAnswer } from '../../../actions/answers';
// import { activeQuestion, questionClearActiveQuestion } from '../../../../actions/questions';
// import '../../../../styles/generalStyles.css';

// export const HotSpotQuestionActiveModal = ({ id, imagen, pregunta, lados }) => {

//     const dispatch = useDispatch();

//     const answers = useSelector(state => state.answers.answers);

//     const [styles, setStyles] = useState({
//         left: '0px',
//         top: '0px',
//         opacity: 0
//     });

//     const { left, top, opacity } = styles;

//     const idReactivo = 0;

//     const [coords, setCoords] = useState({
//         xCoord: 0,
//         yCoord: 0
//     });

//     const { xCoord, yCoord } = coords;

//     const [xsd, setXsd] = useState(false);

//     const [open, setOpen] = useState(false);

//     const onSelectViewQuestion = () => {
//         dispatch(
//             activeQuestion(id, { imagen, instrucciones, pregunta, valor })//de aquí vamos al archivo questions de la carpeta actions
//         );
//     }

//     const onClose = () => {
//         setOpen(false);
//     }

//     const onOpen = () => {
//         setOpen(true);
//     }

//     const handleClose = () => {

//         dispatch(questionClearActiveQuestion());

//         setStyles({
//             ...styles,
//             left: '0px',
//             top: '0px',
//             opacity: 0
//         });

//         setCoords({
//             ...coords,
//             xCoord: 0,
//             yCoord: 0
//         });

//         setOpen(false);
//     }

//     const handleCoordinates = (event) => {

//         const xCoordinate = parseFloat(event.nativeEvent.offsetX);
//         const yCoordinate = parseFloat(event.nativeEvent.offsetY);

//         setCoords({ ...coords, xCoord: xCoordinate, yCoord: yCoordinate });

//         const imageStyles = document.getElementById("imagenId");
//         const info = window.getComputedStyle(imageStyles);

//         const marginLeft = parseFloat(info.marginLeft);
//         const marginTop = parseFloat(info.marginTop);

//         const x = marginLeft + xCoordinate;
//         const y = marginTop + yCoordinate;

//         const leftStyle = (x - 2) + "px";
//         const topStyle = (y - 15) + "px";

//         setStyles({ ...styles, left: leftStyle, top: topStyle, opacity: 1.0 });

//         let cvb = null;

//         (xCoordinate >= lados.sideD && xCoordinate <= lados.sideB && yCoordinate >= lados.sideA && yCoordinate <= lados.sideC)
//         ? cvb = true
//         : cvb = false

//         const pregunta = { id, idReactivo, respuesta: cvb };

//         answers.forEach(answer => {
//             if (answer.id === id) {
//                 console.log(xsd);
//                 dispatch( answersUpdateAnswer(pregunta) );
//             }
//         });

//     }

//     const hideIcon = () => {
//         setStyles({
//             ...styles,
//             left: '0px',
//             top: '0px',
//             opacity: 0
//         });

//         setCoords({
//             ...coords,
//             xCoord: 0,
//             yCoord: 0
//         });

//         setXsd(false);
//     }

//     const handleSubmitAnswer = () => {

//         let exists = false;

//         let cvb = null;

//         (xCoord >= lados.sideD && xCoord <= lados.sideB && yCoord >= lados.sideA && yCoord <= lados.sideC)
//         ? cvb = true
//         : cvb = false

//         const answer = { id, idReactivo, respuesta: cvb };

//         answers.forEach(answer => {
//             if (answer.id === id) {
//                 exists = true;
//             } 
//         });

//         if(!exists){
//             dispatch(answersSetAnswer(answer));
//         }
//     }

//     return (

//         <Modal
//             centered
//             onClose={onClose}
//             onOpen={onOpen}
//             open={open}
//             size='large'
//             trigger={<Button icon='eye' size='mini' onClick={onSelectViewQuestion} />}
//         >
//             <Modal.Header>Visualización de pregunta</Modal.Header>
//             <Modal.Content>

//                 <Grid centered>
//                     <Grid.Row>
//                         <Grid.Column width={16}>
//                             <Modal.Description>
//                                 <Header>Pregunta</Header>
//                                 <p>
//                                     {pregunta}
//                                 </p>
//                                 <Header>Imagen</Header>

//                             </Modal.Description>
//                         </ Grid.Column>
//                     </ Grid.Row>
//                 </ Grid>

//                 <Grid centered>
//                     <Grid.Row>
//                         <Grid.Column width={16}>
//                             <Image
//                                 src={imagen}
//                                 id="imagenId"
//                                 size='large'
//                                 accept="image/*"
//                                 onClick={handleCoordinates} centered
//                             />

//                             <Icon
//                                 circular inverted color='teal'
//                                 name='map marker alternate'
//                                 style={
//                                     {
//                                         position: 'absolute',
//                                         left: left,
//                                         top: top,
//                                         opacity: opacity
//                                     }
//                                 }
//                                 onClick={hideIcon}
//                             />

//                         </Grid.Column>
//                     </Grid.Row>
//                 </Grid>

//             </Modal.Content>

//             <Modal.Actions>
//                 <Button
//                     color='grey'
//                     content="Cerrar"
//                     labelPosition='right'
//                     icon='undo'
//                     onClick={handleClose}
//                 />

//                 <Button
//                     color='blue'
//                     content="Responder"
//                     labelPosition='right'
//                     icon='angle up'
//                     onClick={handleSubmitAnswer}
//                 />
//             </Modal.Actions>

//         </Modal>

//     );
// }
