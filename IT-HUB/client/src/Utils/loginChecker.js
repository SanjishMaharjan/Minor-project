import axios from 'axios'

export const Checklogin = () => {

    const checkLogin = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/users/loggedin");
            const data = await response;
            console.log(data);
            
        } catch (error) {
            console.log(error)
        }

    };

    checkLogin();
}
Checklogin();