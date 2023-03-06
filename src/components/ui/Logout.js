
import {api} from "../../helpers/api";
import {Button} from "./Button";
import {useHistory} from 'react-router-dom';
import "styles/views/Game.scss";


export const LogoutButton = () => {
    const history = useHistory();
    const logout = () => {
        let id = localStorage.getItem("currentUser");
        api.put('/logout/' + id.toString());
        localStorage.removeItem('token');
        history.push('/login')

    }
    return  (
        <div className="logout container">

    <Button
            className="logout button"
            onClick={() => logout()}
    >
        Logout
    </Button>
        </div>
        )
}

export default LogoutButton;

