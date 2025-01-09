import s from "./Button.module.scss";

const Button= ({label, onClick}) => {

    return (
        <button className={s.btn} onClick={onClick}>{label}</button>
    );
};

export default Button;