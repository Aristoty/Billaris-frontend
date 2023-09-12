import React, { useState, useEffect } from "react";
import { AuthService } from "../../components/Auth/auth.service";
import { Alert, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";


const RegisterPage = (loading:any, ...props: any[]) => {

  const navigate = useNavigate ();

  const [values, setValues] = useState({
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    username: '',
    role:'USER',
    about: ''

  })

  const [error, setError] = useState("");

  const authService = new AuthService();

  useEffect(() => {
    if (authService.isAuthenticated()) {
      // Redirect to protected route
    }
  }, []);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

      authService.signup(values)
      .then((response) =>{

        console.log("response",response);

        // if (response.status == 200 || ) {
          // Redirect to protected route
          navigate("/login");


        // } 
        // else {
        //   // setError(response.data.error);
        //   const message = "Something Wrong!Please Try Again 3";
        //   setError(message);

        // }

      }).catch ((error: { response: { status: any; }; }) => {

      if(error && error.response){

        switch(error.response.status){
          case 400:
            console.log("400 status");
            const message1 = "Bad Request.Please check your credentials";
            setError(message1);
            break;
          case 409:
            console.log("409 status");
            const message2 = "Username already exists";
            setError(message2);
            break;
          default:
            const message3 = "Something Wrong!Please Try Again 1";
            setError(message3);
            
        }

      }else{
        const message3 = "Something Wrong!Please Try Again 2";
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
                  <h4 className="card-title">Signup</h4>

                  <form className="my-login-validation" onSubmit={onSubmit} noValidate={false}>

                  <div className="form-group">
                      <label>First Name</label>

                      <input id="firstname"
                        type="text"
                        placeholder="Enter your first name"
                        className="form-control"
                        minLength={2}
                        value={values.firstname}
                        onChange={handleChange}
                        name="firstname"
                        required
                      />

                      <div className="invalid-feedback">
                        First name is required and must be at least 2 characters long
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Last Name</label>

                      <input id="lastname"
                        type="text"
                        placeholder="Enter your last name"
                        className="form-control"
                        minLength={2}
                        value={values.lastname}
                        onChange={handleChange}
                        name="lastname"
                        required
                      />

                      <div className="invalid-feedback">
                        Last name is required and must be at least 2 characters long
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Username</label>

                      <input id="username"
                        type="text"
                        placeholder="Enter your username"
                        className="form-control"
                        minLength={4}
                        value={values.username}
                        onChange={handleChange}
                        name="username"
                        required
                      />

                      <div className="invalid-feedback">
                        Username is required and must be at least 4 characters long
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">Email</label>

                      <input id="email"
                        type="email"
                        placeholder="Enter your email"
                        className="form-control"
                        minLength={5}
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

                      </label>

                      <input id="password"
                        type="password"
                        placeholder="Enter your password"
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
                      <label>About</label>

                      <textarea id="about"
                        placeholder="Enter a brief description about yourself"
                        className="form-control"
                        value={values.about}
                        onChange={handleChange}
                        name="about"
                      />
                    </div>


                    <div className="form-group m-0">
                      <button type="submit" className="btn btn-primary">
                        Signup
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
                      <p>Already have an account? <Link to="/login">Login</Link></p>
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

export default RegisterPage;

