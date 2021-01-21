// import React, { useState } from 'react';
// import { Grid, Form, Button, Image } from 'semantic-ui-react';
// import ReactPlayer from 'react-player';

// export const FileOption = () => {

//     const [link, setLink] = useState('');

//     const [hideColorButtons, setHideColorButton] = useState({
//         colorImageButton: true,
//         colorAudioVideoButton: true
//     });

//     const { colorImageButton, colorAudioVideoButton } = hideColorButtons;

//     const [opciones, setOpciones] = useState({
//         imagen: false,
//         audioVideo: false,
//     });

//     const { imagen, audioVideo } = opciones;

//     const [optionButtons, setOptionButtons] = useState({
//         correctButton: false,
//         incorrectButton: false,
//         colorCorrectButton: true,
//         colorIncorrectButton: true
//     });

//     const { correctButton, incorrectButton, colorCorrectButton, colorIncorrectButton } = optionButtons;

//     const handleInputChange = (e) => {
//         setLink(e.target.value);
//     }

//     const handleImage = () => {
//         setOpciones({
//             ...opciones,
//             imagen: true,
//             audioVideo: false
//         });
//         setHideColorButton({
//             ...hideColorButtons,
//             colorImageButton: false,
//             colorAudioVideoButton: true
//         });
//     }

//     const handlePlayer = () => {
//         setOpciones({
//             ...opciones,
//             imagen: false,
//             audioVideo: true
//         });
//         setHideColorButton({
//             ...hideColorButtons,
//             colorImageButton: true,
//             colorAudioVideoButton: false
//         });
//     }

//     const handleCorrect = () => {
//         setOptionButtons({
//             ...optionButtons,
//             correctButton: true,
//             incorrectButton: false,
//             colorCorrectButton: false,
//             colorIncorrectButton: true
//         });
//     }

//     const handleIncorrect = () => {
//         setOptionButtons({
//             ...optionButtons,
//             incorrectButton: true,
//             correctButton: false,
//             colorCorrectButton: true,
//             colorIncorrectButton: false
//         });
//     }

//     return (
//         <div>
//             <Grid centered>
//                 <Grid.Row>
//                     <Grid.Column width={14} style={{ border: '8px solid #1D97F2', borderRadius: '10px' }}>
//                         <Form.Field required style={{ marginBottom: '4px', marginTop: '8px' }}>
//                             <label>Link multimedia</label>
//                         </Form.Field>

//                         <Button.Group size='large' widths='2' style={{ marginBottom: '8px' }}>

//                             <Button
//                                 basic={colorImageButton}
//                                 color='blue'
//                                 onClick={handleImage}
//                             >
//                                 Imagen
//                             </Button>

//                             <Button.Or text='o' />

//                             <Button
//                                 basic={colorAudioVideoButton}
//                                 color='blue'
//                                 onClick={handlePlayer}
//                             >
//                                 Audio / Vídeo
//                             </Button>

//                         </Button.Group>

//                         {
//                             (imagen === true || audioVideo === true)
//                                 ?
//                                 <Form.Field required>
//                                     <Form.Input
//                                         type="text"
//                                         name="link"
//                                         placeholder="Link de YouTube, Souncloud, Mixcloud, Twitch, Facebook, Google"
//                                         autoComplete="off"
//                                         value={link}
//                                         onChange={handleInputChange}
//                                     />
//                                 </Form.Field>
//                                 :
//                                 <></>
//                         }

//                         {
//                             ((imagen === false && link.length === 0) || (audioVideo === false && link.length === 0))
//                                 ?
//                                 <Image src='https://react.semantic-ui.com/images/wireframe/image.png' size='large' centered />
//                                 :
//                                 (link.length >= 0 && imagen === true)
//                                     ?
//                                     <Image src={link} size='medium' centered />
//                                     :
//                                     (link.length >= 0 && audioVideo === true)
//                                         ?
//                                         <div style={{ border: '1px', borderColor: 'green' }} >
//                                             <ReactPlayer
//                                                 className='react-player'
//                                                 url={link}
//                                                 width='100%'
//                                                 controls={true}
//                                             />
//                                         </div>
//                                         :
//                                         <></>
//                         }

//                         <Button.Group size='large' widths='2' style={{ marginTop: '8px', marginBottom: '8px' }}>

//                             <Button
//                                 basic={colorCorrectButton}
//                                 color='green'
//                                 onClick={handleCorrect}
//                             >
//                                 Correcto
//                             </Button>
//                             <Button
//                                 basic={colorIncorrectButton}
//                                 color='red'
//                                 onClick={handleIncorrect}
//                             >
//                                 Incorrecto
//                             </Button>

//                         </Button.Group>

//                     </Grid.Column>
//                 </Grid.Row>

//             </Grid>

//         </div >
//     );
// }