import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useLocation } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

function LayoutNavbar () {
    const { pathname } = useLocation();
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <LinkContainer to="/">
                    <Navbar.Brand>
                        <img src="/favicon-512x512.png" alt="CIN" className="d-inline-block align-top"
                             height={30}/> Painel CIN
                    </Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <LinkContainer to="/">
                            <Nav.Link active={pathname === '/'}>Início</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/users">
                            <Nav.Link active={pathname === '/users' || pathname === '/users/create'}>Usuários</Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default LayoutNavbar;
