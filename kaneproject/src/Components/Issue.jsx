import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBookList,
  issueBook,
  issueBookList,
} from "../Service/BookListReducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faPlus } from "@fortawesome/free-solid-svg-icons";
import { unwrapResult } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import TickMark from "../Animations/TickMark";
import Rejection from "../Animations/Reject";

const Issue = () => {
  const dispatch = useDispatch();
  const { books, status, error } = useSelector((state) => state.books);
  const { issueStatus, issueError } = useSelector((state) => state.books);
  const [booklist, setBookList] = useState([]);
  const [selectedBook, setSelectedBook] = useState("");
  const [bookdetails, setBookdetails] = useState({});
  const [bookflag, setBookFlag] = useState(false);
  const [modal, setModal] = useState(false);
  const [name, setName] = useState("");
  const [successfull, setSuccessfull] = useState(false);
  const [rejected, setRejected] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchBookList());
    }
  }, [status, dispatch]);
  useEffect(() => {
    if (books.length > 0) {
      // const names = books.map((book) => book.name);
      const names = books
        .filter((book) => book.status === true)
        .map((book) => book.name);
      setBookList(names);
    }
  }, [books]);
  const bookSelect = (book) => {
    setSelectedBook(book);

    const details = books.find((b) => b.name === book);

    if (details === undefined) {
      setBookFlag(false);
    } else {
      setBookdetails(details);
      setBookFlag(true);
    }
  };
  const handleIssueBook = () => {
    const data = {
      bookName: selectedBook,
      userName: name,
    };

    dispatch(issueBook(data))
      .then(unwrapResult)
      .then((result) => {
        setModal(false);
        setSuccessfull(true);
        dispatch(fetchBookList());
        dispatch(issueBookList());
        setTimeout(() => {
          setSuccessfull(false);
          navigate("/view");
        }, 2000);
      })
      .catch((error) => {
        setModal(false);
        setRejected(true);
        dispatch(fetchBookList());
        setTimeout(() => {
          setRejected(false);
          navigate("/view");
        }, 2000);
      });
  };
  return (
    <>
      {successfull && <TickMark msg="Issued Successfully" />}
      {rejected && <Rejection msg="Book issuing failed" />}
      <div className="page">
        <div className="view">
          <h1>Issue a Book</h1>
        </div>
        <div className="list">
          <div className="search2">
            <Form>
              {" "}
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                {" "}
                <Form.Select
                  aria-label="Select a book"
                  value={selectedBook}
                  onChange={(e) => bookSelect(e.target.value)}
                >
                  {" "}
                  <option value="">Select a book</option>{" "}
                  {booklist.map((name, index) => (
                    <option key={index} value={name}>
                      {" "}
                      {name}{" "}
                    </option>
                  ))}{" "}
                </Form.Select>{" "}
              </Form.Group>{" "}
            </Form>
          </div>
          {bookflag && (
            <div className="bookitems">
              <div className="listdesign">
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <h2>{bookdetails.name}</h2>
                  <small>Written By: {bookdetails.author}</small>
                  <small>{bookdetails.description}</small>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  {bookdetails.status ? (
                    <Button variant="success" onClick={() => setModal(true)}>
                      <FontAwesomeIcon
                        icon={faPlus}
                        color="white"
                        style={{ marginRight: "2px" }}
                      />
                      Issue
                    </Button>
                  ) : (
                    <span style={{ color: "red" }}>
                      <FontAwesomeIcon icon={faCircleXmark} color="red" /> Not
                      Available
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {modal && (
        <Modal
          size="lg"
          show={modal}
          onHide={() => setModal(false)}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          {" "}
          <Modal.Header closeButton>
            {" "}
            <Modal.Title id="example-modal-sizes-title-lg">
              {" "}
              Please Enter Your Name{" "}
            </Modal.Title>{" "}
          </Modal.Header>{" "}
          <Modal.Body>
            {" "}
            <Form>
              {" "}
              <Row>
                {" "}
                <Col xs={12} md={10}>
                  {" "}
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    {" "}
                    <Form.Control
                      type="text"
                      placeholder="Enter Your Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="custom-input"
                    />{" "}
                  </Form.Group>{" "}
                </Col>{" "}
                <Col
                  xs={12}
                  md={2}
                  className="text-right text-md-left mt-3 mt-md-0"
                >
                  {" "}
                  <Button
                    variant="success"
                    onClick={handleIssueBook}
                    className="w-100"
                  >
                    {" "}
                    <FontAwesomeIcon
                      icon={faPlus}
                      color="white"
                      style={{ marginRight: "2px" }}
                    />{" "}
                    Issue{" "}
                  </Button>{" "}
                </Col>{" "}
              </Row>{" "}
            </Form>{" "}
          </Modal.Body>{" "}
        </Modal>
      )}
    </>
  );
};

export default Issue;
