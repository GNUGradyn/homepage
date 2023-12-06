import "./Window.css"

interface WindowProps {
    title: string
    children: React.ReactNode
}

const Window: React.FC<WindowProps> = (props: WindowProps) => {
    return (
        <div className="window" title="Starting Up">
        </div>
    );
};

export default Window;