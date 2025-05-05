export default function OperationSelector({ value, onChange, disabled}) {
    return (
        <>
            <select
                value={value}
                onChange={onChange}
                disabled={disabled}
            >
                <option value="+">+</option>
                <option value="-">-</option>
            </select>
        </>
    );
}