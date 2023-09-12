import React from 'react';
import { AuthService } from '../components/Auth/auth.service';
import { Navigate } from 'react-router-dom';
import { Carousel, Container } from 'react-bootstrap';
import logo from "../images/invoice1.png"
import img1 from "../images/AdobeStock.jpg"
import img2 from "../images/invoice.png"
import img3 from "../images/istockphoto.jpg"
import img4 from "../images/kuenstliche-intelligenz_0.jpg"
// import "./Home.css"

const authServise = new AuthService();

const Home: React.FC = () => {

  const isAuthenticated = authServise.isAuthenticated();
  const userId = localStorage.getItem("userId");

  return (
    <Container>
      {!isAuthenticated ? (
        <Carousel data-bs-theme="dark"  >
          {/* Slide 1 */}
          <Carousel.Item  >
            <img
              className="d-block w-100"
              src={img1}
              alt="First slide"
              
            />
            <Carousel.Caption>

              <h1 className="display-4">Welcome to Billaris</h1>
              <p className="lead">Your Electronic Invoicing Solution for Businesses.</p>
              <hr className="my-4" />
              <p>Simplify your invoice and client management with our intuitive platform.</p>
              <a className="btn btn-primary btn-lg" href="/products" role="button">Discover Our Products</a>
              <a className="btn btn-outline-primary btn-lg" href="/login" role="button">Start Now</a>


            </Carousel.Caption>


          </Carousel.Item>

          {/* Slide 2 */}
          <Carousel.Item>

            <img
              className="d-block w-100"
              src={img2}
              alt="First slide"
            />
            <Carousel.Caption>

              <h1 className="display-4">Welcome to Billaris</h1>
              <p className="lead">Your Electronic Invoicing Solution for Businesses.</p>
              <hr className="my-4" />
              <p>Simplify your invoice and client management with our intuitive platform.</p>
              <a className="btn btn-primary btn-lg" href="/products" role="button">Discover Our Products</a>
              <a className="btn btn-outline-primary btn-lg" href="/login" role="button">Start Now</a>


            </Carousel.Caption>
          </Carousel.Item>

          {/* Slide 3 */}
          <Carousel.Item>

            <img
              className="d-block w-100"
              src={img3}
              alt="First slide"
            />
            <Carousel.Caption>

              <h1 className="display-4">Welcome to Billaris</h1>
              <p className="lead">Your Electronic Invoicing Solution for Businesses.</p>
              <hr className="my-4" />
              <p>Simplify your invoice and client management with our intuitive platform.</p>
              <a className="btn btn-primary btn-lg" href="/products" role="button">Discover Our Products</a>
              <a className="btn btn-outline-primary btn-lg" href="/login" role="button">Start Now</a>


            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>

        // <div className="cb-slideshow">
        //   <div>
        //     <span></span>
        //   </div>
        //   <div>
        //     <span></span>
        //   </div>
        //   <div>
        //     <span></span>
        //   </div>
        //   <div>
        //     <span></span>
        //   </div>
        //   <div>
        //     <span></span>
        //   </div>
        //   <div>
        //     <span></span>
        //   </div>
          


        // </div>


      ) : (
        <Navigate to={`/user/${userId}/start`} />
      )}
    </Container>

  );
};

export default Home;
