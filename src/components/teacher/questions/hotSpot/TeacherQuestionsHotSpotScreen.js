import React, { useState } from 'react';
import { MenuBar } from '../../MenuBar';
import { SideMenu } from '../../SideMenu';
//import cx from 'classnames';
import { QuestionsEntries } from './QuestionsEntries';

export const TeacherQuestionsHotSpotScreen = () => {
    
    const [visible, setVisible] = useState(false);

    /*const classes = cx(
        'pusher',
        'bottom,',
        {'dimmed': visible}
    );*/

    const toggleMenu = () => {
        setVisible(!visible);
    }

    return (
        <div>
            <MenuBar onToggleMenu={toggleMenu} />
            <div className="ui attached pushable" style={{height: '95vh'}}>
                <SideMenu toggleMenu={visible}/>
                <div className="TableCentered">
                    <QuestionsEntries />
                </div>
            </div>
        </div>
    );

}
