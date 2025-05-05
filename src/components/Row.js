import { useState } from 'react';
import ActionButton from './ActionButton';
import OperationSelector from './OperationSelector';

import '../css/calculator.css'

export default function Row({ onValueChange, onRemove, onDisable }) {
    const [value, setValue] = useState('');
    const [operation, setOperation] = useState('+');
    const [disabled, setDisabled] = useState(false);

    const handleValueChange = (event) => {
        const newValue = event.target.value;
        setValue(newValue);
        onValueChange(operation, newValue, disabled);
    };

    const handleOperationChange = (newOperation) => {
        setOperation(newOperation);
        onValueChange(newOperation, value, disabled);
    };

    const handleDisable = () => {
        const newDisabled = !disabled
        setDisabled(newDisabled);
        onDisable(operation, value, newDisabled);
    }

    const handleRemove = () => {
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