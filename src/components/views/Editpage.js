import {useHistory, useParams} from "react-router-dom";
import BaseContainer from "../ui/BaseContainer";
import {api} from 'helpers/api';
import React, {useEffect, useState} from "react";
import {Spinner} from "../ui/Spinner";
import "styles/views/Edit.scss";
import {DayPicker} from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import {Button} from "../ui/Button";
import {format} from 'date-fns';


export const EditField = props => {
    return (
        <div className="edit">
            <label className="edit label">
                {props.label}
            </label>
            <input
                id={"change_name"}
                hidden={true}
                className="edit input"
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
    const [newUsername, setNewUsername] = useState(null);
    const [user, setUser] = useState(null);
    let token = "";
    let content = (
        <div className="edit container">
        <Spinner/>
        </div>
    );

    useEffect(() => {
        async function getUser() {
            let response;
            try {
                response = await api.get('/user/' + id.toString());
                setUser(response.data);
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    alert("username already taken");
                } else {
                    alert("hei im the problem its me");
                }
            }
        }

        getUser();
    }, [id]);


    const changeUserInfo = async () => {
        let requestBody;
        try {
            token = localStorage.getItem("token");
            if (newBirthday && newUsername !== user.username) {
                requestBody = JSON.stringify({
                    birthday: newBirthday.toDateString(),
                    username: newUsername,
                    token: token
                });

            } else if (!newBirthday && newUsername !== user.username) {
                requestBody = JSON.stringify({username: newUsername, token: token});
            } else if (newBirthday && newUsername === user.username) {
                requestBody = JSON.stringify({birthday: newBirthday.toDateString(), token: token});
            }
            await api.put("/user/" + user.id + "/editprofile", requestBody);
            history.push("/game/profile/" + user.id);

        } catch (error) {
            if (error.response && error.response.status === 404) {
                alert("username already taken");
            } else {
                alert("and me");
            }
        }


    }

    const selectBirthdate = async () => {
        setNewBirthday(selected);
        user.birthday = selected.toDateString();
        ;
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
            <div className="edit container">
                <h2>Edit Your Profile here</h2>

                <div className="edit form">
                    <div className="edit field">
                        current username: {user.username}
                        <Button className="edit button-container"
                                onClick={() => document.getElementById("change_name").hidden = (!document.getElementById("change_name").hidden)}>
                            edit
                        </Button>

                    </div>
                        <div>
                        <EditField id="change_name" hidden={true}
                                   value={newUsername}
                                   onChange={un => setNewUsername(un)}/>
                        </div>
                    <div className="edit field">
                        current birthday: {user.birthday}
                        <Button className="edit button-container"
                                onClick={() => document.getElementById("datepicker").hidden = !document.getElementById("datepicker").hidden}>
                            Edit
                        </Button></div>
                    <div hidden={true} id="datepicker" className="edit datepicker-container">
                        <DayPicker
                            className="edit datepicker"
                            mode="single"
                            selected={selected}
                            onSelect={setSelected}
                            captionLayout="dropdown"
                            fromYear={1930}
                            toYear={2023}
                            footer={footer}
                        />
                        <Button className="edit button" onClick={() => selectBirthdate()} disabled={!selected}>
                            Confirm
                        </Button>
                    </div>
                </div>
                <div className="edit button-container">
                    <Button onClick={() => changeUserInfo()}>
                        Save Changes
                    </Button>
                </div>
            </div>
        );
    }
    return (
        <BaseContainer>
            {content}
        </BaseContainer>
    );
}

export default Editpage;