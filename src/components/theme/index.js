import './style.css';

const Theme = ({ setIsDarkTheme }) => {
    const appearance = () => {
        setIsDarkTheme(prevTheme => !prevTheme);
    };
    
    return (
        <>
            <button className="theme-button" onClick={appearance}>Change Theme</button>
        </>
    )
}

export default Theme;