// 型指定
type ToggleButtonProps = {
    label: string,
    onChange: (checked: boolean) => void,
    checked: boolean
}

const ToggleButton = (props: ToggleButtonProps) => {
    return (
        <>
            <input 
                type="checkbox"
                name={props.label}
                id={props.label}
                checked={props.checked}
                onChange={(e) => props.onChange(e.target.checked)}
                className="sr-only peer"
            />
            <span className="absolute inset-0 bg-gray-300 rounded-full transition peer-checked:bg-blue-500"></span>
            <span className="absolute left-1 top-1 w-6 h-6 bg-white rounded-full transition peer-checked:translate-x-6"></span>
        </>
    )
}

export default ToggleButton