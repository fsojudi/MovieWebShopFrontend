
import { Route, Routes, Link } from "react-router-dom";
import CrudDemo from './CrudDemo';
import MovieDetails from './MovieDetails';
import UpdateMovie from './UpdateMovie';

const DemoRouter = () => {

    return (
        <>
        <Header/>
        <Routes>
        <Route exact path="/" element={<Welcome/>} />
            <Route path="/home" element={<Home/>} />
            <Route path="/movie" element={<Movie/>} />
            <Route from="/contact" to=""/>
            <Route path="/about" element={<About/>} />
            <Route path="/crud" element={<CrudDemo/>} />
            <Route path="/details/:id" element={<MovieDetails/>} />
            <Route path="/updates/:id" element={<UpdateMovie/>} />
            <Route path="/NotFound" element={<NotFound/>} />
        </Routes>
        </>
    );

};



const Header = () => {
return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="container-fluid">
            <ul className="navbar-nav me-auto">
                <li className="nav-item">
                    <Link className="navbar-brand" to="/home">Home</Link>
                </li>
                <li className="nav-item">
                    <Link className="navbar-brand" to="/">Welcome</Link>
                </li>
                <li className="nav-item">
                    <Link className="navbar-brand" to="/movie">Movie</Link>
                </li>
                <li className="nav-item">
                    <Link className="navbar-brand" to="/about">About Us</Link>
                </li>
                <li className="nav-item">
                    <Link className="navbar-brand" to="/crud">CRUD</Link>
                </li>
            </ul>
            <form>
                <Link className="btn btn-dark" to="/movie">Sign Up</Link>
            </form>
        </div>

    </nav>
    )
};

const Welcome = () => <b><h3>Welcome Page</h3></b>
const Home = () => <b><h3>Home Page</h3></b>;
const About = () => <b><h3>About Us Page</h3></b>;
const Movie = () => <b><h3>Movie Page</h3></b>;
const NotFound = () =><b><h3>Page Not Found</h3></b>;
export default DemoRouter;