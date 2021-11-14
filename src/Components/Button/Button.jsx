

const Button = (props) => {
    
    return (
        <button id={props.id} className="bg-purple-600 rounded w-24 h-9 text-white mx-4" onClick={props.action}>{props.description}</button>
    );
};


export default Button;