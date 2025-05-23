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

    // aggiorna solo la riga che corrisponde a quella selezionata
    const handleRowValueChange = (id, operation, value, disabled) => {
        setRows(rows.map(row => 
            //aggiorna la row con i nuovi valori, oppure rimane invariata
            row.id === id ? {...row, operation, value, disabled} : row
        ));
    };

    // aggiunge una nuova riga trovando il massimo tra gli id delle righe esistenti 
    // e aggiungendo la riga in fondo, oppure all'inizio nel caso in cui non ci sia un massimo
    const addRow = () => {
        const newId = rows.length > 0 ? Math.max(...rows.map(row => row.id)) + 1 : 1;
        setRows([...rows, { id: newId, operation: '+', value: '', disabled: false }]);
    };

    // esclude la riga con l'id specificato
    const removeRow = (id) => {
        setRows(rows.filter(row => row.id !== id));
    };

    // attiva o disattiva la riga selezionata, modificando solo disabled
    const toggleDisableRow = (id, _operation, _value, disabled) => {
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