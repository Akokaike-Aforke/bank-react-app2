import React from 'react'
import { Outlet } from 'react-router-dom';

const SharedSignup = () => {
  return (
    <article className="signup-article">
      <Outlet />
    </article>
  );
}

export default SharedSignup