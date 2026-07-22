import React from 'react'
import {Link, useLocation} from 'react-router-dom'

function Navbar() {
    const onClick = () => {
        localStorage.removeItem('token')
    }
    let location = useLocation()

  return (

        <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
            <Link className="navbar-brand" to="#">INoteBook</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                    <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} to="/">
                    Home
                    </Link>
                </li>

                <li className="nav-item">
                    <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`}to="/about">
                    About
                    </Link>
                </li>
            </ul>
            {!localStorage.getItem('token')? <form className="d-flex" role="search">
             <Link className="btn btn-primary mx-1" to="/login">Login</Link>
             <Link className="btn btn-primary mx-1" to="/sign-up">Sign up</Link>
            </form> : <Link className="btn btn-primary mx-1" to="/login" onClick={onClick}> Logout</Link>}
            </div>
        </div>

        </nav>

)
}

export default Navbar;