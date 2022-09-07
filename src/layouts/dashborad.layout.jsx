import React from 'react'
import { Outlet } from 'react-router-dom'
import './sideNav.css'

export default function DashboardLauOut() {
  return (
    <div>
        {/**side nav */}
        <nav>
            <ul>
                <a>
                    asfasd
                </a>
                <a>
                    asfasd
                </a>
            </ul>

        </nav>
        {/**body */}
        <div style={{
            marginLeft: "260px"
        }}>
            <Outlet/>

        </div>
    </div>
  )
}
