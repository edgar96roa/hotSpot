import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Image, Menu } from 'semantic-ui-react';
import '../../styles/generalStyles.css';

export const MenuBar = () => {

    const initialState = "/auth/login"

    const [activeItem, setActiveItem] = useState( initialState );

    const handleItemClick = (e, { name }) =>  {
        setActiveItem({ 
            activeItem: name
        });
    }

    return (
        <div className="MenuBar">
           <Menu inverted tabular>
                <Menu.Item>
                    <Image
                        size="tiny"
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Logo_Instituto_Polit%C3%A9cnico_Nacional.png/300px-Logo_Instituto_Polit%C3%A9cnico_Nacional.png"
                    />
                </Menu.Item>
            
                <Menu.Menu>
                    <Menu.Item 
                        name='Conocenos'
                        active={ activeItem === 'aboutUs' }
                        onClick={ handleItemClick }
                        as={Link} to='/auth/aboutUs'
                    >
                        Cónocenos
                    </Menu.Item>
                </Menu.Menu>

                <Menu.Menu position="right">
                    <Menu.Item
                        name='registrate'
                        active={ activeItem === 'register' }
                        onClick={ handleItemClick }
                        as={Link} to='/auth/register'
                    >
                        Regístrate
                    </Menu.Item>

                    <Menu.Item
                        name='registrate'
                        active={ activeItem === 'login' }
                        onClick={ handleItemClick }
                        as={Link} to='/auth/login'
                    >
                        Login
                    </Menu.Item>
                </Menu.Menu>
            
            </Menu> 
        </div>
    )
}