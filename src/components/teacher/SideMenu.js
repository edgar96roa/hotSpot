import React from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import cn from 'classnames';

export const SideMenu = (props) => {

    const classes = cn(
        'ui', 'sidebar', 'left', 'overlay', 'menu', 'vertical', 'animating',
        {'visible': props.toggleMenu}
    );

    return (
        <div>
            <Menu className={classes}>
                <Menu.Item
                    name='Home'
                >
                    <Icon name='home' size='large' />
                    Inicio
                </Menu.Item>

                <Menu.Item
                    name='Profile'
                >
                    <Icon name='user' size='large' />
                    Perfil
                </Menu.Item>
                
                <Menu.Item
                    name='Groups'
                >
                    <Icon name='group' size='large' />
                    Grupos
                </Menu.Item>

                <Menu.Item
                    name='Tests'
                >
                    <Icon name='pencil' size='large' />
                    Exámenes
                </Menu.Item>

                <Menu.Item
                    name='Questions'
                    
                >
                    <Icon name='question' size='large' />
                    Preguntas
                </Menu.Item>

            </Menu>
        </div>
    );
}
