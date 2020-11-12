import React, { useState } from 'react';
import { Grid } from "semantic-ui-react";
import { MenuBar } from '../MenuBar';
import { SideMenu } from '../SideMenu';
import cx from 'classnames';
import '../../../styles/generalStyles.css';

export const TeacherGroupsScreen = () => {

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
                        <Grid.Row>
                            <Grid.Column width={16}>
                                Grupos del profesor
                            </Grid.Column>
                    </Grid.Row>
                </Grid>
                </div>
            </div>
        </div>
    );
}
