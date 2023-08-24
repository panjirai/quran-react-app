import  { useState,useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import '../Bootstrap.css'
import '../css/Quran.css'
import * as Icon  from "react-icons/bs";

export default function Header() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Retrieve theme preference from local storage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      document.documentElement.setAttribute('data-bs-theme', savedTheme);
      setDarkMode(savedTheme === 'dark');
    }
  }, []);

  const handleModeToggle = () => {
    const newTheme = darkMode ? 'light' : 'dark';
    setDarkMode(!darkMode);
    
    // Update theme preference in local storage
    localStorage.setItem('theme', newTheme);

    document.documentElement.setAttribute('data-bs-theme', newTheme);
  };
    return (
        <>
        <Navbar collapseOnSelec expand="md" className="bg-body-tertiary justify-content-center" sticky="top">
      <Container >
      <Navbar.Brand href="/">
      <img
              alt=""
              src="../vite.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />
            {' '}
            Quran App
            {' '}
            <img
              alt=""
              src="../react.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />
          </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link target="_blank" href="https://github.com/panjirai/">Github <Icon.BsGithub/> </Nav.Link>
            <Nav.Link target="_blank" href="https://www.linkedin.com/in/setiawan-panjirai-6b93a6132/">LinkedIn <Icon.BsLinkedin/> </Nav.Link>
          </Nav>
          <Nav className='nav-icon'>
              <Nav.Link onClick={handleModeToggle} >
                {darkMode ? (
                  <Icon.BsSunFill /> // Use the appropriate light mode icon
                ) : (
                  <Icon.BsFillMoonStarsFill /> // Use the appropriate dark mode icon
                )}
              </Nav.Link>
              
            </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
    );
}