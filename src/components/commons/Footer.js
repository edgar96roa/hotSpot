import React from 'react';
import { Segment, Container } from 'semantic-ui-react';
import '../../styles/generalStyles.css';

export const Footer = () => {

    let year = new Date().getFullYear();

    return (
        <div className="Footer">
            <Segment inverted textAlign="center">
                <Container>
                    {year}, Todos los derechos reservados
                </Container>
            </Segment>
        </div>
    )
}
