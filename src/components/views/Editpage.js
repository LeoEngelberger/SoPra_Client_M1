import {useHistory, useParams} from "react-router-dom";
import BaseContainer from "../ui/BaseContainer";
import {api} from 'helpers/api';
import {useEffect, useState} from "react";
import {Spinner} from "../ui/Spinner";
import "styles/views/Game.scss";
import {DayPicker} from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import {Button} from "../ui/Button";
import {FormField} from "../views/Login";



const Editpage = () => {
    const history = useHistory();
    const {id} = useParams();
    const [selected, setSelected] = useState(null)
    const [newBirthday, setNewBirthday] = useState(null);
    const [newUsername, setNewUsername] = useState(null);
    const [user, setUser] = useState(null);
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
        try{
        const requestBody = JSON.stringify({birthday: newBirthday, username: newUsername});
        const response = await api.put("/user/" + user.id + "/editprofile", requestBody);

        }catch(error){
            alert("username already taken");
        }


    }

    const selectBirthdate = async () => {
        setNewBirthday(selected.toDateString());
        setSelected(null);
    }

    if (user) {
        let footer = <p>Please pick a day.</p>;
        if (!user.birthday) {
            user.birthday = "birthday is unavailable"
        }
        if (newBirthday) {
            footer = <p>You picked {newBirthday}.</p>;
        }


        content = (
            <BaseContainer className="game container">
                <div className="game container">
                    <h2>Edit Your Profile here</h2>
                    <p>remember your username has to be unique</p>
                    <p>current username: {user.username}</p>
                    <FormField
                        label="Username"
                        value={newUsername}
                        onChange={un => setNewUsername(un)}/>
                    <p>current birthday: {user.birthday}</p>
                    <p>new birthday: </p>
                    <div>

                        <DayPicker
                            mode="single"
                            selected={selected}
                            onSelect={setSelected}
                        />
                        <Button onClick={() => selectBirthdate()} disabled={!selected}>
                            Confirm new date
                        </Button>
                    </div>
                </div>
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