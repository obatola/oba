import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { CommonPageWrapper } from './Home/Components/CommonPageWrapper';
import { ErrorPage } from './Home/Components/ErrorPage';
import { HomePage } from './Home/Components/Home/HomePage';
import { ExamplePage } from './Home/Components/Example/ExamplePage';
import { DynamicResumePage } from './Home/Components/Resume/ResumePage';
import { MantineProvider } from '@mantine/core';
import './App.css';
import { RESUME } from "./Home/Components/Resume/ResumePage.constants";

const router = createBrowserRouter([
  {
    path: "/example",
    element: (
      <ExamplePage />
    ),
  },
  {
    path: "/resume",
    element: (
      <DynamicResumePage resume={RESUME} />
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
    <MantineProvider>
      <RouterProvider router={router} />
    </MantineProvider>
  );
}

export default App;
