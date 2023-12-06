import "./Window.css"

interface WindowProps {
    title: string
    children: React.ReactNode
}

const Window: React.FC<WindowProps> = (props: WindowProps) => {
    return (
        <div className="window" draggable={true}>
            <div className="window-head">
                <p>{props.title}</p>
            </div>
            {props.children}
        </div>
    );
};

export default Window;