import { useState, useEffect } from "react";
import Row from "./Row";

import '../css/calculator.css'

export default function Calculator() {
    const [rows, setRows] = useState([{ id: 1, operation: '+', value: '', disabled: false }]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        calculateTotal();
    }, [rows]);

    const calculateTotal = () => {
        let sum = 0;
        rows.forEach(row => {
            if(!row.disabled && row.value !== '') {
                const numValue = parseFloat(row.value) || 0;
                sum += row.operation === '+' ? numValue : -numValue;
            }
        });
        setTotal(sum);
    };

    const handleRowValueChange = (id, operation, value, disabled) => {
        setRows(rows.map(row => 
            row.id === id ? {...row, operation, value, disabled} : row
        ));
    };

    const addRow = () => {
        const newId = rows.length > 0 ? Math.max(...rows.map(row => row.id)) + 1 : 1;
        setRows([...rows, { id: newId, operation: '+', value: '', disabled: false }]);
    };

    const removeRow = (id) => {
        setRows(rows.filter(row => row.id !== id));
    };

    const toggleDisableRow = (id, operation, value, disabled) => {
        setRows(rows.map(row => 
            row.id === id ? {...row, disabled} : row
        ));
    };

    return (
        <div className="calculator">
            <h1>React Calculator</h1>

            <button className="add-row-btn" onClick={addRow}>Add Row</button>

            <div className="rows-container">
                {rows.map(row => (
                    <Row
                        key={row.id}
                        onValueChange={(op, val, dis) => handleRowValueChange(row.id, op, val, dis)}
                        onRemove={() => removeRow(row.id)}
                        onDisable={(op, val, dis) => toggleDisableRow(row.id, op, val, dis)}
                    />
                ))}
            </div>

            <div className="total">
                <h2>Total: {total}</h2>
            </div>
        </div>
    );
}