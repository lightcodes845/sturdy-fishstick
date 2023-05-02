import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
import classes from "./index.module.scss";

type Props = {};

const Header: React.FC<Props> = (props: Props) => {

  return (
    <Navbar
      fixed="top"
      bg="light"
      expand="lg"
      id={"navbarId"}
      className={classes.navbar}
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
