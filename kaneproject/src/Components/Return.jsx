import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBookList,
  issueBookList,
  returnBook,
} from "../Service/BookListReducer";
import { Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { unwrapResult } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import TickMark from "../Animations/TickMark";
import Rejection from "../Animations/Reject";

const Return = () => {
  const dispatch = useDispatch();
  const { issuebooks, issueListstatus, issueListerror } = useSelector(
    (state) => state.books
  );
  const { books, status, error } = useSelector((state) => state.books);
  const { returnStatus, returnError } = useSelector((state) => state.books);
  const [booklist, setBookList] = useState([]);
  const [selectedBook, setSelectedBook] = useState("");
  const [bookdetails, setBookdetails] = useState({});
  const [bookflag, setBookFlag] = useState(false);
  const navigate = useNavigate();
  const [successfull, setSuccessfull] = useState(false);
  const [rejected, setRejected] = useState(false);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchBookList());
    }
  }, [status, dispatch]);
  useEffect(() => {
    if (issueListstatus === "idle") {
      dispatch(issueBookList());
    }
  }, [issueListstatus, dispatch]);
  useEffect(() => {
    if (issuebooks.length > 0) {
      const names = issuebooks
        .filter((book) => book.returnDate === null)
        .map((book) => book.book.name);

      setBookList(names);
    }
  }, [issuebooks]);
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
  const handlereturnBook = (book) => {
    const data = {
      bookName: book,
    };

    dispatch(returnBook(data))
      .then(unwrapResult)
      .then((result) => {
        setSuccessfull(true);
        dispatch(fetchBookList());
        dispatch(issueBookList());
        setTimeout(() => {
          setSuccessfull(false);
          navigate("/view");
        }, 2000);
      })
      .catch((error) => {
        setRejected(true);
        dispatch(fetchBookList());
        dispatch(issueBookList());
        setTimeout(() => {
          setRejected(false);
          navigate("/view");
        }, 2000);
      });
  };

  return (
    <>
      {successfull && <TickMark msg="Book Returned Successfully" />}
      {rejected && <Rejection msg="Book issuing failed" />}
      <div className="page">
        <div className="view">
          <h1>Return a Book</h1>
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
                    <span style={{ color: "green" }}>
                      <FontAwesomeIcon icon={faCircleCheck} color="green" /> Not
                      Issued yet
                    </span>
                  ) : (
                    <Button
                      variant="success"
                      onClick={() => handlereturnBook(bookdetails.name)}
                    >
                      <FontAwesomeIcon
                        icon={faPlus}
                        color="white"
                        style={{ marginRight: "2px" }}
                      />
                      Return
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Return;
