import { Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import '../css/index.css';
import '../css/bootstrap.min.css';
import Navbar from '../componentes/Navbar';
import Container from 'react-bootstrap/Container';

export default function Layout () {
    return (
        <div>
            <Navbar/>
            <Container className="mt-4">
                <Outlet/>
            </Container>
        </div>
    );
}
