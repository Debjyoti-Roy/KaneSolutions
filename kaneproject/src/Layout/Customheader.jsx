import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "./../Assets/Logo.png";
import { Col, Container, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const CustomHeader = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navigate = useNavigate();

  const navigateToPage = (navi) => {
    navigate(navi);
  };

  const getMenuOptions = () => {
    switch (currentPath) {
      case "/view":
        return (
          <>
            <div className="button-list">
              <button
                className="navibutton"
                onClick={() => {
                  navigateToPage("/issue");
                }}
              >
                Issue
              </button>
              <button
                className="navibutton"
                onClick={() => {
                  navigateToPage("/return");
                }}
              >
                Return
              </button>
              <button
                className="navibutton"
                onClick={() => {
                  navigateToPage("/search");
                }}
              >
                Search
              </button>
            </div>
          </>
        );
      case "/issue":
        return (
          <>
            <div className="button-list">
              <button
                className="navibutton"
                onClick={() => {
                  navigateToPage("/view");
                }}
              >
                Home
              </button>
              <button
                className="navibutton"
                onClick={() => {
                  navigateToPage("/return");
                }}
              >
                Return
              </button>
              <button
                className="navibutton"
                onClick={() => {
                  navigateToPage("/search");
                }}
              >
                Search
              </button>
            </div>
          </>
        );
      case "/return":
        return (
          <>
            <div className="button-list">
              <button
                className="navibutton"
                onClick={() => {
                  navigateToPage("/view");
                }}
              >
                Home
              </button>
              <button
                className="navibutton"
                onClick={() => {
                  navigateToPage("/issue");
                }}
              >
                Issue
              </button>
              <button
                className="navibutton"
                onClick={() => {
                  navigateToPage("/search");
                }}
              >
                Search
              </button>
            </div>
          </>
        );
      case "/search":
        return (
          <>
            <div className="button-list">
              <button
                className="navibutton"
                onClick={() => {
                  navigateToPage("/view");
                }}
              >
                Home
              </button>
              <button
                className="navibutton"
                onClick={() => {
                  navigateToPage("/issue");
                }}
              >
                Issue
              </button>
              <button
                className="navibutton"
                onClick={() => {
                  navigateToPage("/return");
                }}
              >
                Return
              </button>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <header>
      <Container>
        <Row className="align-items-center">
          <Col xs={4} className="header-left" style={{cursor:"default"}} onClick={() => {
                  navigateToPage("/view");
                }}>
            <img src={logo} alt="Logo"  />
            <h4 className="header-title">Library Management</h4>
          </Col>
          <Col xs={4} className="header-center d-flex justify-content-center">
            {getMenuOptions()}
          </Col>
          <Col xs={4} className="admin">
            <h5 className="welcome-text">Welcome admin</h5>
            <FontAwesomeIcon icon={faUser} className="user-icon" />
          </Col>
        </Row>
      </Container>
    </header>
  );
};

export default CustomHeader;
