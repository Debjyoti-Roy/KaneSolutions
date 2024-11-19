import { configureStore } from "@reduxjs/toolkit";
import BookListReducer from "./BookListReducer";

export const store = configureStore({
    reducer: {
        books: BookListReducer,
    },
});