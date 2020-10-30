import { useState } from 'react';

export const useForm = ( initialState = { } ) => {

    const [values, setValues] = useState(initialState);

    const reset = () => {
        setValues( initialState );
    }

    const handleInputChange = ({ target }) => {

        setValues({
            ...values,//se propagarán los cambios del target hacia values
            [ target.name ] : target.value
        });

    }

    return [ values, handleInputChange, reset ];

}