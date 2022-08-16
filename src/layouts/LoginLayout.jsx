import React from "react";

import { Outlet } from "react-router-dom";

export default function LoginsLayout() {
  return (
    <>
      {/**app bar */}
      <div></div>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly'

      }}>
        {/**logo and title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src="img.jpg"
            alt="img.jpg"
            style={{
              height: "150px",
              width: "170px",
            }}
          />
          <h3>Information Announcement System of FNS</h3>
        </div>
        {/**login and register */}
        <div>
          <Outlet />
        </div>
      </div>
    </>
  );
}
