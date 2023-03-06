import {useHistory, useParams} from "react-router-dom";
import BaseContainer from "../ui/BaseContainer";
import {api} from 'helpers/api';
import {useEffect, useState} from "react";
import {Spinner} from "../ui/Spinner";
import "styles/views/Game.scss";
import {Button} from "../ui/Button";


const Profile = () => {
    const history = useHistory();
    const {id} = useParams()
    const [userprofile, setUserprofile] = useState(null);

    useEffect(() => {
        async function getUser() {
            try {
                const response = await api.get('/user/' + id.toString(), {params: {id: id}});
                setUserprofile(response.data);
            } catch (error) {
                alert("couldn't find a user with this id");
            }
        }

        getUser();
    }, [id]);


    let content = <Spinner/>;

    let edit_button = null;

    const backToGame = async () => {
        history.push("/game/");
    };
    let back_button = (<Button onClick={() => backToGame()}> back to dashboard </Button>);
    const editProfile = async () => {
        history.push("/game/profile/" + userprofile.id + "/editprofile");
    };
    if (userprofile) {
        if (!userprofile.birthday) {
            userprofile.birthday = "birthday is unavailable"
        }
        if (localStorage.getItem('token') === userprofile.token) {
            edit_button = (<Button onClick={() => editProfile()}> Edit Profile </Button>);
        }
        //birthday_content = user.birthday;
        content = (
            <div  className="profile container">

                <h2> Welcome to the Profile of {userprofile.username} </h2>
                <div className="profile form">
                    <div className="profile field">
                        {userprofile.username} currently is {userprofile.status}
                    </div>
                    <div className="profile field">
                        {userprofile.username} was born on {userprofile.birthday}
                    </div>
                    <div className="profile field">
                        this profile was created on {userprofile.creationdate}
                    </div>
                    {edit_button}
                    {back_button}
                </div>


            </div>
        )
        ;
    }
    return (
        <BaseContainer>
            {content}
        </BaseContainer>
    );
}

export default Profile;