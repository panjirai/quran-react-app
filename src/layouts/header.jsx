import  { useState,useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import '../Bootstrap.css'
import '../css/Quran.css'
import * as Icon  from "react-icons/bs";
import DarkModeToggle from "react-dark-mode-toggle";

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
    const newTheme = darkMode ? 'dark' : 'light';
    setDarkMode(!darkMode);
    
    // Update theme preference in local storage
    localStorage.setItem('theme', newTheme);

    document.documentElement.setAttribute('data-bs-theme', newTheme);
  };
    return (
        <>
        <Navbar collapseOnSelec expand="md" className="bg-body-tertiary justify-content-center" sticky="top">
      <Container >
      <Navbar.Brand href="/quran-react-app/">
      <img
              alt=""
              src="./vite.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />
            {' '}
            Quran App V2
            {' '}
            <img
              alt=""
              src="./react.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />
          </Navbar.Brand>
          
            <DarkModeToggle
              onChange={handleModeToggle}
              checked={darkMode}
              size={80}
            />
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
       
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav >
            <Nav.Link target="_blank" href="https://github.com/panjirai/">Github <Icon.BsGithub/> </Nav.Link>
            <Nav.Link target="_blank" href="https://www.linkedin.com/in/setiawan-panjirai-6b93a6132/">LinkedIn <Icon.BsLinkedin/> </Nav.Link>
          </Nav>
       
        </Navbar.Collapse>
       
      </Container>
    </Navbar>
    </>
    );
}