import React from 'react';

import {
    Link
  } from "react-router-dom";
import { paths } from '../contants';

interface Props {
    children: React.ReactNode
}

export const CommonPageWrapper: React.FC<Props> = ({children}) => {
    return (
    <div>
        <div>
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to={paths.csProjects}>CS Projects</Link></li>
              <li><Link to={paths.uiUX}>UI / UX</Link></li>
              <li><Link to={paths.art}>2D|3D ART</Link></li>
              <li><Link to={paths.about}>About</Link></li>
            </ul>
          </nav>
        </div>
        {children}
      </div>
    )
}