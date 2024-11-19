import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchBookList = createAsyncThunk(
  "books/fetchBookList",
  async () => {
    const response = await axios.get("http://localhost:8080/api/booklist");
    return response.data;
  }
);

export const issueBook = createAsyncThunk(
  "books/issueBook",
  async (issueRequest) => {
    const response = await axios.post(
      "http://localhost:8080/api/issuedbooks/issue",
      issueRequest
    );
    return response.data;
  }
);

export const issueBookList = createAsyncThunk(
  "books/issueBookList",
  async () => {
    const response = await axios.get("http://localhost:8080/api/issuedbooks");
    return response.data;
  }
);

export const returnBook = createAsyncThunk(
  "books/returnBook",
  async (returnRequest) => {
    const response = await axios.post(
      "http://localhost:8080/api/issuedbooks/return",
      returnRequest
    );
    return response.data;
  }
);

export const findBooksByName = createAsyncThunk(
  "books/findBooksByName",
  async (name) => {
    const response = await axios.get(
      "http://localhost:8080/api/booklist/book",
      { params: { name } }
    );
    return response.data;
  }
);

const bookSlice = createSlice({
  name: "books",
  initialState: {
    books: [],
    status: "idle",
    error: null,
    issuebooks: [],
    issueListstatus: "idle",
    issueListerror: null,
    returnStatus: "idle",
    returnError: null,
    searchResults: [],
    searchStatus: "idle",
    searchError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBookList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.books = action.payload;
      })
      .addCase(fetchBookList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(issueBook.pending, (state) => {
        state.issueStatus = "loading";
      })
      .addCase(issueBook.fulfilled, (state) => {
        state.issueStatus = "succeeded";
      })
      .addCase(issueBook.rejected, (state, action) => {
        state.issueStatus = "failed";
        state.issueError = action.error.message;
      })
      .addCase(issueBookList.pending, (state) => {
        state.issueListstatus = "loading";
      })
      .addCase(issueBookList.fulfilled, (state, action) => {
        state.issueListstatus = "succeeded";
        state.issuebooks = action.payload;
      })
      .addCase(issueBookList.rejected, (state, action) => {
        state.issueListstatus = "failed";
        state.issueListerror = action.error.message;
      })
      .addCase(returnBook.pending, (state) => {
        state.returnStatus = "loading";
      })
      .addCase(returnBook.fulfilled, (state) => {
        state.returnStatus = "succeeded";
      })
      .addCase(returnBook.rejected, (state, action) => {
        state.returnStatus = "failed";
        state.returnError = action.error.message;
      })
      .addCase(findBooksByName.pending, (state) => {
        state.searchStatus = "loading";
      })
      .addCase(findBooksByName.fulfilled, (state, action) => {
        state.searchStatus = "succeeded";
        state.searchResults = action.payload;
      })
      .addCase(findBooksByName.rejected, (state, action) => {
        state.searchStatus = "failed";
        state.searchError = action.error.message;
      });
  },
});

export default bookSlice.reducer;
