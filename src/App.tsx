import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Link
} from "react-router-dom";

import './App.css';
import { CommonPageWrapper } from './Home/Components/CommonPageWrapper';
import { ErrorPage } from './Home/Components/ErrorPage';
import { HomePage } from './Home/Components/Home/HomePage';
import { paths } from './Home/contants';
import { ExamplePage } from './Home/Components/Example/ExamplePage';

const router = createBrowserRouter([
  {
    path: "/example",
    element: (
      <ExamplePage />
    ),
  },
  {
    path: "/",
    element: (
      <CommonPageWrapper>
        <HomePage />
      </CommonPageWrapper>
    ),
    errorElement: <ErrorPage />
  },
])

function App() {
  return (
      <RouterProvider router={router} />
  );
}

export default App;
