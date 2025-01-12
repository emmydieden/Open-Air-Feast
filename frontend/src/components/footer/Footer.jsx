// The Footer.jsx component is mounted in App.jsx

import "./footer.css";
import { Link } from 'react-router-dom';
import { CiHome } from "react-icons/ci";
import { CiCircleInfo } from "react-icons/ci";

export const Footer = () => {
    return (
        <div className="footer">
            <Link to="/"><img className="footer-logo" src="/logo10.png" alt="logo" /></Link>
            <p>Crafted by Emmy Dieden and Idah Collin <a href="https://www.technigo.io/web-development-boot-camp?utm_source=google&utm_medium=cpc&utm_campaign=SE_Web_BC_PMaxFall2022&utm_adgroup=&utm_keyword=&device=c&gad_source=1&gclid=CjwKCAiAnL-sBhBnEiwAJRGignEdI26zEcDhy8PaJwGSgwQnfi6Q73Ac7nU-wog6RJga0mdReZc8VhoCdsYQAvD_BwE" target="_blank" rel="noopener noreferrer">Technigo</a> 23/24</p>
            <nav className="footer-nav">
                <ul>
                    <li><Link to="/"><CiHome /></Link></li>
                    <li><Link to="/about"><CiCircleInfo /></Link></li>
                </ul>
            </nav>
        </div>
    )
}