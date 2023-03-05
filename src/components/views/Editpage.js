import {useHistory, useParams} from "react-router-dom";
import BaseContainer from "../ui/BaseContainer";
import {api} from 'helpers/api';
import React, {useEffect, useState} from "react";
import {Spinner} from "../ui/Spinner";
import "styles/views/Game.scss";
import {DayPicker} from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import {Button} from "../ui/Button";
import { format } from 'date-fns';


export const EditField = props => {
    return (
        <div className="login field">
            <label className="login label">
                {props.label}
            </label>
            <input
                id={"change_name"}
                hidden={true}
                className="login input"
                placeholder="has to be unique"
                value={props.value}
                onChange={e => props.onChange(e.target.value)}
            />
        </div>
    );
};


const Editpage = () => {
    const history = useHistory();
    const {id} = useParams();
    const [selected, setSelected] = useState(null)
    const [newBirthday, setNewBirthday] = useState(null);
    const [newUsername, setNewUsername] = useState("");
    const [user, setUser] = useState(null);
    let token = "";
    let content = <Spinner/>;

    useEffect(() => {
        async function getUser() {
            try {
                const response = await api.get('/user/' + id.toString());
                setUser(response.data);
            } catch (error) {
                alert("couldn't find a user with this id");
            }
        }

        getUser();
    }, [id]);


    const changeUserInfo = async () => {
        try {
            token = localStorage.getItem("token");
            const requestBody = JSON.stringify({birthday: newBirthday.toDateString(), username: newUsername, token: token});
            await api.put("/user/" + user.id + "/editprofile", requestBody);
            history.push("/profile/" + user.id);
        } catch (error) {
            alert("username already taken");
        }


    }

    const selectBirthdate = async () => {
        setNewBirthday(selected);
        user.birthday = selected.toDateString();
        document.getElementById("datepicker").hidden = true;
        setSelected(null);
    }




    if (user) {

        if (!user.birthday) {
            user.birthday = "not available"
        }

        let footer = <p>Select your Birthday</p>;
        if (selected) {
            footer = <p>You picked {format(selected, 'PP')}.</p>;
        }



        content = (
            <BaseContainer>
                <h2>Edit Your Profile here</h2>
                <p></p>
                <div className="game user-list">
                    <div className="game user-item">
                        <div> current username: {user.username}
                            <Button className="game button"
                                onClick={() => document.getElementById("change_name").hidden = (!document.getElementById("change_name").hidden)}>
                                edit
                            </Button>
                            <EditField
                                id="change_name"
                                value={newUsername}
                                onChange={un => setNewUsername(un)}/>
                        </div>
                        <p>current birthday: {user.birthday} <Button
                            onClick={() => document.getElementById("datepicker").hidden = !document.getElementById("datepicker").hidden}>
                            Edit
                        </Button></p>
                    </div>
                    <div className="game user-item">
                        <div hidden={true} id="datepicker">
                            <DayPicker
                                mode="single"
                                selected={selected}
                                onSelect={setSelected}
                                captionLayout="dropdown"
                                fromYear={1930}
                                toYear={2023}
                                footer={footer}
                            />
                            <Button className="login button" onClick={() => selectBirthdate()} disabled={!selected}>
                                Confirm
                            </Button>
                        </div>
                    </div>
                </div>
                <p></p>
                <Button onClick={() => changeUserInfo()}> Save Changes </Button>
            </BaseContainer>
        );
    }
    return (
        <BaseContainer className="game container">
            {content}
        </BaseContainer>
    );
}

export default Editpage;