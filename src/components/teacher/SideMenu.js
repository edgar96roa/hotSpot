import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon } from 'semantic-ui-react';
import cn from 'classnames';

export const SideMenu = (props) => {

    const classes = cn(
        'ui', 'sidebar', 'left', 'overlay', 'menu', 'vertical', 'animating',
        {'visible': props.toggleMenu}
    );

    const initialState = "/teacher/home"

    const [activeItem, setActiveItem] = useState( initialState );

    const handleItemClick = (e, { name }) =>  {
        setActiveItem({ 
            activeItem: name
        });
    }

    return (
        <div>
            <Menu className={classes}>
                <Menu.Item
                    name='home'
                >
                    <Icon name='home' size='large' />
                    Inicio
                </Menu.Item>

                <Menu.Item
                    name='profile'
                >
                    <Icon name='user' size='large' />
                    Perfil
                </Menu.Item>
                
                <Menu.Item
                    name='groups'
                >
                    <Icon name='group' size='large' />
                    Grupos
                </Menu.Item>

                <Menu.Item
                    name='tests'
                >
                    <Icon name='pencil' size='large' />
                    Exámenes
                </Menu.Item>

                <Menu.Item
                    name='questions'
                    active={ activeItem === 'questions' }
                    onClick={ handleItemClick }
                    as={Link} to='/teacher/questions'
                >
                    <Icon name='question' size='large' />
                    Preguntas
                </Menu.Item>

            </Menu>
        </div>
    );
}
