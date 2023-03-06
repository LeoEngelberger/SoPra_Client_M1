import {Redirect, Route} from "react-router-dom";
import Game from "components/views/Game";
import PropTypes from 'prop-types';
import {GameGuard} from "../routeProtectors/GameGuard";
import Profile from "../../views/Profile";
import Editpage from "../../views/Editpage";
import LogoutButton from "../../ui/Logout";


const GameRouter = props => {
    /**
     * "this.props.base" is "/app" because as been passed as a prop in the parent of GameRouter, i.e., App.js
     */
    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <Route exact path={`${props.base}/dashboard`}>
                <Game/>
            </Route>
            <Route exact path={`${props.base}`}>
                <Redirect to={`${props.base}/dashboard`}/>
            </Route>
            <Route exact path={`${props.base}/profile/:id`}>
                <GameGuard>
                    <Profile/>
                </GameGuard>
            </Route>
            <Route path={`${props.base}/profile/:id/editprofile`}>
                <GameGuard>
                    <Editpage/>
                </GameGuard>
            </Route>
            <div className="logout button-container">
                <LogoutButton/>

            </div>
        </div>
    );
};
/*
* Don't forget to export your component!
 */

GameRouter.propTypes = {
    base: PropTypes.string
}

export default GameRouter;
