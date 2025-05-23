import { useState } from 'react';
import ActionButton from './ActionButton';
import OperationSelector from './OperationSelector';

import '../css/calculator.css'

export default function Row({ onValueChange, onRemove, onDisable }) {
    const [value, setValue] = useState('');
    const [operation, setOperation] = useState('+');
    const [disabled, setDisabled] = useState(false);

    // imposta il nuovo valore dell'input nel caso in cui cambi e notifica al padre il cambiamento
    const handleValueChange = (event) => {
        const newValue = event.target.value;
        setValue(newValue);
        // notifica il componente padre
        onValueChange(operation, newValue, disabled);
    };

    // imposta la nuova operazione nella select nel caso in cui si cambia operazione e notifica il padre
    const handleOperationChange = (newOperation) => {
        setOperation(newOperation);
        // notifica il componente padre
        onValueChange(newOperation, value, disabled);
    };

    // imposta in nuovo valore di disabled nel caso in cui si disabilita una riga e notifica il padre
    const handleDisable = () => {
        const newDisabled = !disabled
        setDisabled(newDisabled);
        // notifica il componente padre
        onDisable(operation, value, newDisabled);
    }

    // gestisce la rimozione della riga notificando il padre in caso di rimozione
    const handleRemove = () => {
        // notifica il componente padre
        onRemove();
    }

    return (
        <div className={`row ${disabled ? 'disabled' : '' }`}>
            <OperationSelector
                value={operation}
                onChange={(event) => handleOperationChange(event.target.value)}
                disabled={disabled}
            />

            <input
                type='number'
                value={value}
                onChange={handleValueChange}
                disabled={disabled}
            />

            <div>
                <ActionButton
                    onClick={handleDisable}
                    label={disabled ? 'Enable' : 'Disable'}
                />

                <ActionButton
                    onClick={handleRemove}
                    label='Remove'
                />
            </div>
        </div>
    );
}