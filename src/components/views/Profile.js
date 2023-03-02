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

    //let birthday_content = <p>not available </p>;
    let edit_button = null;
    const editProfile = async () => {
            history.push("/profile/"+ userprofile.id + "/editprofile" );
    };
    if (userprofile) {
        if (!userprofile.birthday) {
            userprofile.birthday = "birthday is unavailable"
        }
        if(localStorage.getItem('token') === userprofile.token){
            edit_button = (<Button onClick={() => editProfile()}> Edit Profile </Button>);
        }
        //birthday_content = user.birthday;
        content = (
            <div>
                <h2> Welcome to the Profile of {userprofile.username} </h2>
                <div className="game container">
                    this profile was created on {userprofile.creationdate}
                </div>
                <div className="game container">
                    {userprofile.username} currently is {userprofile.status}
                </div>
                <div className="game container">
                    {userprofile.username}'s birthday is on the {userprofile.birthday}
                    {edit_button}
                </div>
            </div>
        );
    }
    return (
        <BaseContainer className="game container">
            {content}
        </BaseContainer>
    );
}

export default Profile;