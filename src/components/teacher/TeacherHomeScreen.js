import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Grid, Header, Icon } from "semantic-ui-react";
import { MenuBar } from './MenuBar';
import { SideMenu } from './SideMenu';
import cx from 'classnames';
import '../../styles/generalStyles.css';

export const TeacherHomeScreen = () => {

    const { name } = useSelector( state => state.auth );

    const [visible, setVisible] = useState(false);

    const classes = cx(
        'pusher',
        'bottom,',
        {'dimmed': visible}
    );

    const toggleMenu = () => {
        setVisible(!visible);
    }

    return (
        <div>
            <MenuBar onToggleMenu={toggleMenu} />
            <div className="ui attached pushable" style={{height: '95vh'}}>
                <SideMenu toggleMenu={visible}/>
                <div className={classes}>
                    <Grid centered>
                        <Grid.Row  className="homeCentered">
                            <Grid.Column width={16} textAlign="center">
                                <Header as='h2' icon textAlign='center'>
                                    <Icon name='home' circular />
                                    <Header.Content>Inicio</Header.Content>
                                </Header>
                                Bienvenido {name}
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </div>
            </div>
        </div>
    );
}
