import { Alert } from "react-bootstrap";
import LoginPage from "./LoginPage";


const LoginPageAlert = (loading:any) => {

  
  return(
    <div>
        <Alert variant="danger" > You are not connected. Please login first !!</Alert>
        <LoginPage/>
    </div>
  )
};

export default LoginPageAlert;
