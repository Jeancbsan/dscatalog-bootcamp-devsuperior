import { getAccessTokenDecoded, logout } from 'core/utils/auth';
import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom'
import './styles.scss';

const Navbar = () => {
    const [currentUser, setCurrentUser] = useState('')
    
    const location = useLocation();
    useEffect(() => {
        const currentUserData = getAccessTokenDecoded();
        setCurrentUser(currentUserData.user_name);
    }, [location]) 
    
    const handlerLogout = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) =>{
        event.preventDefault();
        logout();
    }

    return (
        <nav className="row bg-primary main-nav">
            <div className="col-2">
                <Link to="/" className="nav-logo-text">
                    <h4>DS Catalog</h4>
                </Link>
            </div>
            <div className="col-6">
                <ul className="main-menu">
                    <li>
                        <NavLink to="/" activeClassName="active" exact className="nav-link">
                            HOME
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/products" activeClassName="active" className="nav-link">
                            CATÁLOGO
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin" activeClassName="active" className="nav-link">
                            ADMIN
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div className="col-3 text-right">
                {currentUser && (
                    <>
                        {currentUser}
                        <a 
                        href="#logout" 
                        className="nav-link active d-inline"
                        onClick={handlerLogout}
                        >
                            LOGOUT
                        </a>
                    </>
                )}
                {!currentUser && (
                    <NavLink to="/auth/login" activeClassName="active" className="nav-link active">
                        LOGIN
                    </NavLink>
                )}
            </div>
        </nav>
    )
}

export default Navbar;