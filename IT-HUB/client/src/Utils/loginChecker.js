import axios from 'axios'

export  const checkLogin = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/users/loggedin");
            // console.log(response);
            return response;
            
        } catch (error) {
            console.log(error)
        }

    };

    
