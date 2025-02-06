import { Link } from "@remix-run/react";

export const Navbar = () => {
    return (
        <div className = "navbar">
            <ol className={"navbar-list"}>
                <Link to={"/play"} className = "nav-links" >  <li> Play </li></Link>
                <Link to={"/history"} className = "nav-links" > <li> Past Games</li> </Link>
                <Link to={"/account"} className = "nav-links" > <li> Account</li> </Link>
            </ol>
        </div>
    )
}