import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Link
} from "react-router-dom";

import './App.css';
import { AboutPage } from './Home/Components/About/Components/AboutPage';
import { ArtPage } from './Home/Components/Art/Components/ArtPage';
import { CommonPageWrapper } from './Home/Components/CommonPageWrapper';
import { ErrorPage } from './Home/Components/ErrorPage';
import { HomePage } from './Home/Components/Home/HomePage';
import { paths } from './Home/contants';
import { CSProjectsPage } from './Home/Components/CSProjects/Components/CSProjectsPage';
import { ExamplePage } from './Home/Components/Example/ExamplePage';
import { UIUXPage } from './Home/Components/UIUX/Components/UIUXPage';

const router = createBrowserRouter([
  {
    path: paths.csProjects,
    element: (
      <CommonPageWrapper>
        <CSProjectsPage />
      </CommonPageWrapper>
    ),
  },
  {
    path: paths.uiUX,
    element: (
      <CommonPageWrapper>
        <UIUXPage />
      </CommonPageWrapper>
    ),
  },
  {
    path: paths.art,
    element: (
      <CommonPageWrapper>
        <ArtPage />
      </CommonPageWrapper>
    ),
  },
  {
    path: paths.about,
    element: (
      <CommonPageWrapper>
        <AboutPage />
      </CommonPageWrapper>
    ),
  },
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
