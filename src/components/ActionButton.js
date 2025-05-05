export default function ActionButton({ onClick, label }) {
    return (
        <>
            <button onClick={onClick}>
                {label}
            </button>
        </>
    );
} 