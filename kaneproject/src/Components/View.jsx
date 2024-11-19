import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookList } from "../Service/BookListReducer";
import { Col, Form, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";

const View = () => {
  const dispatch = useDispatch();
  const { books, status, error } = useSelector((state) => state.books);
  const [booklist, setBookList] = useState([{}]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchBookList());
    }
  }, []);

  useEffect(() => {
    if (books.length > 0) {
      console.log(books)
      setBookList(books);
    }
  }, [books]);

  const filteredBooks = booklist.filter(
    (book) =>
      book.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page">
      <div className="view">
        <h1>OUR COLLECTION</h1>
      </div>
      <div className="list">
        <div className="search">
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Form.Group>
          </Form>
        </div>
        <div className="booklistview">
          {/* {filteredBooks.map((e, id) => (
            <div key={id} className="bookitems">
              <div className="listdesign">
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <h2>{e.name}</h2>
                  <small>Written By: {e.author}</small>
                  <small>{e.description}</small>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        Issued By: {e.issuername}
      </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  {e.status ? (
                    <span style={{ color: "green" }}>
                      <FontAwesomeIcon icon={faCircleCheck} color="green" />{" "}
                      Available
                    </span>
                  ) : (
                    <span style={{ color: "red" }}>
                      <FontAwesomeIcon icon={faCircleXmark} color="red" /> Not
                      Available
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))} */}
          {filteredBooks.map((e, id) => (
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
        </div>
      </div>
    </div>
  );
};

export default View;
