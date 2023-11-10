import Auth from '../utils/auth';
import { useMutation } from '@apollo/client';
import { LOGOUT_USER } from '../utils/mutations';



const Logout = () => { 
    const [logoutUser] = useMutation(LOGOUT_USER);
    const handleLogout = async () => {
        try {
          const { data } = await logoutUser();
          if (data.logoutUser) {
            Auth.logout();
          }
        } catch (error) {
          console.error('Logout failed', error);
        }
      };

    return <>
        <a onClick={handleLogout}> Logout</a>
    </>;
}

  export default Logout;