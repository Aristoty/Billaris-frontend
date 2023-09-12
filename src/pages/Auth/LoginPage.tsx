import React, { useState, useEffect } from "react";
import { AuthService } from "../../components/Auth/auth.service";
import { Alert, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";


const LoginPage = (loading:any) => {

  const [values, setValues] = useState({
    email: '',
    password: ''

  })

  const [error, setError] = useState("");

  const authService = new AuthService();
  const navigate = useNavigate();

  useEffect(() => {
    if (authService.isAuthenticated()) {
      // Redirect to protected route
    }
  }, []);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

      authService.login(values.email, values.password)
      .then((response) =>{

        console.log("response",response);

        if (response.status === 200) {
          window.localStorage.setItem("token", response.data.access_token);
          window.localStorage.setItem("userId",response.data.id);
          window.localStorage.setItem("username", response.data.firstname);
          
            let user = window.localStorage.getItem("token");
            if (user) {
              navigate(`/user/${response.data.id}/start`);
              
              return true;
            } else {
              return false;
            }
          
         

          // Redirect to protected route

        } else {
          // setError(response.data.error);
          const message = "Something Wrong!Please Try Again 1";
          setError(message);

        }

      }).catch ((error: { response: { status: any; }; }) => {

      if(error && error.response){

        switch(error.response.status){
          case 403:
            console.log("403 status");
            const message1 = "Authentication Failed.Bad Credentials";
            setError(message1);
            break;
          default:
            const message2 = "Something Wrong!Please Try Again 2";
            setError(message2);
            
        }

      }else{
        const message3 = "Something Wrong!Please Try Again 3";
        setError(message3);
      }
      
    })
     //console.log("Loading again",loading);
  };

  const handleChange = (eCh: { persist: () => void; target: { name: any; value: any; }; }) => {
    eCh.persist();
    setValues(values => ({
    ...values,
    [eCh.target.name] : eCh.target.value
    }));
    
  }

  console.log("Loading", loading);

  return (


    <div className="login-page">



      <section className="h-100">
        <div className="container h-100">

          <div className="row justify-content-md-center h-100">
            <div className="card-wrapper">

              <div className="card fat">
                <div className="card-body">
                  <h4 className="card-title">Login</h4>

                  <form className="my-login-validation" onSubmit={onSubmit} noValidate={false}>

                    <div className="form-group">
                      <label htmlFor="email">Email</label>

                      <input id="email"
                        type="email"
                        placeholder="Enter your register email"
                        className="form-control"
                        minLength={6}
                        value={values.email}
                        onChange={handleChange}
                        name="email" 
                        required
                      />

                      <div className="invalid-feedback">
                        UserId is invalid
                      </div>

                    </div>

                    <div className="form-group">
                      <label>Password
                        &nbsp;<a href="forgot.html" className="float-right-2">
                          Forgot Password?
                        </a>
                      </label>

                      <input id="password" 
                        type="password" 
                        placeholder="Enter your register password" 
                        className="form-control" 
                        minLength={8} 
                        value={values.password} 
                        onChange={handleChange} 
                        name="password" 
                        required 
                        />
                        
                      <div className="invalid-feedback">
                        Password is required
                      </div>
                    </div>

                    <div className="form-group">
                      <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                      </div>
                    </div>


                    <div className="form-group m-0">
                      <button type="submit" className="btn btn-primary">
                        Login
                        {loading && (
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                          />
                        )}

                      </button>
                      <p>You don't have an account? <Link to="/register">Register</Link></p>
                    </div>
                  </form>
                  {error &&
                    <Alert style={{ marginTop: '20px' }} variant="danger">
                      {error}
                    </Alert>

                  }


                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

  );
};

export default LoginPage;
