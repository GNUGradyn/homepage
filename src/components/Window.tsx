import "./Window.css"

interface WindowProps {
    title: string
    children: React.ReactNode
    width: string
    height: string
}

const Window: React.FC<WindowProps> = (props: WindowProps) => {
    return (
        <div style={{width: props.width, height: props.height}} className="window" draggable={true}>
            <div className="window-head">
                <p>{props.title}</p>
            </div>
            {props.children}
        </div>
    );
};

export default Window;