import React, {useEffect, useState} from "react";
import { Link, NavLink } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
import { throttleFunc} from "../../utilities";
import classes from "./index.module.scss";

type Props = {};

const Header: React.FC<Props> = () => {
  const [colorChange, setColorChange] = useState(false);
  useEffect(() => {
    const changeNavbarColor = throttleFunc(() => {
        if (document.body.scrollTop >= 80) {
            setColorChange(true);
        } else {
            setColorChange(false);
        }
    }
    , 500);
    document.body.addEventListener("scroll", changeNavbarColor);

    return () => {
      document.body.removeEventListener("scroll", changeNavbarColor);
    };
  }, []);

  return (
    <Navbar
      fixed="top"
      bg="light"
      expand="lg"
      id={"navbarId"}
      className={classes.navbar}
      style={{ boxShadow: colorChange ? "0 3px 5px rgba(0,0,0,0.2)" : "" }}
    >
      <Container>
        <Navbar.Brand>
          <Link className={`${classes.navbar_link}`} to="/">
            <img
              className={classes.navbar_img}
              src="/images/logo.svg"
              alt="logo"
            />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <NavLink
              className={`${classes.navbar_nav} me-3`}
              style={({ isActive }) => {
                return {
                  fontWeight: isActive ? "bold" : "",
                  backgroundColor: isActive ? "#00B0B0" : "",
                  color: isActive ? "#fff" : "",
                };
              }}
              to="/"
            >
              Home
            </NavLink>
            <NavLink
              style={({ isActive }) => {
                return {
                  fontWeight: isActive ? "bold" : "",
                  backgroundColor: isActive ? "#00B0B0" : "",
                  color: isActive ? "#fff" : "",
                };
              }}
              className={`${classes.navbar_nav} me-3`}
              to="/heatmap"
            >
              Heatmap
            </NavLink>
            <NavLink
              style={({ isActive }) => {
                return {
                  fontWeight: isActive ? "bold" : "",
                  backgroundColor: isActive ? "#00B0B0" : "",
                  color: isActive ? "#fff" : "",
                };
              }}
              className={`${classes.navbar_nav}`}
              to="/search"
            >
              Search
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
