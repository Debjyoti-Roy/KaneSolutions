import {
  faCircleCheck,
  faCircleXmark,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Col, Form, InputGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { findBooksByName } from "../Service/BookListReducer";
import { unwrapResult } from "@reduxjs/toolkit";

const Search = () => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const [searchResultsArray, setSearchResultsArray] = useState([{}]);
  const [flag, setFlag] = useState(false);
  const [flag2, setFlag2] = useState(false);
  const { searchResults, searchStatus, searchError } = useSelector(
    (state) => state.books
  );
  const handleSearch = () => {
    if (searchText.trim() !== "") {
      dispatch(findBooksByName(searchText))
        .then(unwrapResult)
        .then((results) => {
          setFlag(true);
          if (results.length > 0) {
            setSearchResultsArray(results);
            setFlag2(false);
          } else {
            setFlag2(true);
          }
        })
        .catch((error) => {
          setFlag(false);
        });
    }
  };
  return (
    <div className="page">
      <div className="view">
        <h1>Search</h1>
      </div>
      <div className="list">
        <div className="search2">
          <Form>
            {" "}
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              {" "}
              <InputGroup style={{ cursor: "pointer" }}>
                {" "}
                <Form.Control
                  type="text"
                  placeholder="Search"
                  className="searchText"
                  onChange={(e) => setSearchText(e.target.value)}
                />{" "}
                <InputGroup.Text onClick={handleSearch}>
                  {" "}
                  <FontAwesomeIcon icon={faSearch} />{" "}
                </InputGroup.Text>{" "}
              </InputGroup>{" "}
            </Form.Group>{" "}
          </Form>
        </div>
        {flag && (
          <div className="booklistview">
            {!flag2 && (
              <>
                {searchResultsArray.map((e, id) => (
                  <Row key={id} className="bookitems">
                  <Col xs={12} md={6}>
                    <h2>{e.name}</h2>
                    <small>Written By: {e.author}</small>
                    <br />
                    <small>{e.description}</small>
                  </Col>
                  <Col xs={6} md={5} className="d-flex align-items-center justify-content-start">
                  {e.issuername && <div>Issued By: {e.issuername}</div>}
                  </Col>
                  <Col xs={6} md={1} className="d-flex align-items-center justify-content-start">
                    {e.status ? (
                      <span style={{ color: "green" }}>
                        <FontAwesomeIcon icon={faCircleCheck} color="green" /> Available
                      </span>
                    ) : (
                      <span style={{ color: "red" }}>
                        <FontAwesomeIcon icon={faCircleXmark} color="red" /> Not Available
                      </span>
                    )}
                  </Col>
                </Row>
                ))}
              </>
            )}
            {flag2 && (
              <div style={{ display: "flex", justifyContent: "center" }}>
                No Book Found
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
