import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Menu } from 'semantic-ui-react';
import { Icon } from 'semantic-ui-react';
import { startLogout } from '../../actions/auth';

//Funciona como el Header
export const MenuBar = (props) => {

    const { name } = useSelector( state => state.auth );

    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch( startLogout() );
    }

    return (
        <div>
            <Menu>
                <Menu.Menu>
                    <Menu.Item 
                        name='menu'
                        onClick={props.onToggleMenu}
                    >
                        <Icon name='bars' size='large' />
                    </Menu.Item>
                </Menu.Menu>


                <Menu.Menu position='right'>
                    <Menu.Item>
                        {name}
                    </Menu.Item>

                    <Menu.Item
                        name='Logout'
                        onClick={ handleLogout }
                    >
                        <Icon name='sign-out' size='large' />
                        Logout
                    </Menu.Item>

                </Menu.Menu>
            </Menu>
        </div>
    );
}
