import { useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Loading from '../componentes/Loading';

const Render = () => {
    const [data, setData] = useState(/** @type {Boolean|Error|String|null} **/ true);
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!username.length) {
            alert('Por favor, preencha o nome do usuário');
            return false;
        }
        if (!name.length) {
            alert('Por favor, preencha o nome do usuário');
            return false;
        }
        setData(null); // loading
        fetch(import.meta.env.VITE_APP_API_URL + '/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                username,
            }),
        })
            .then((response) => response.json())
            .then((response) => {
                if (!response?.data?.id) {
                    setData(
                        new Error(response.error?.description || 'Um erro desconhecido ocorreu. Por favor, tente novamente.'),
                    );
                    return;
                }
                setData(username);
            })
            .catch((error) => {
                setData(new Error(error.response?.error?.description || error.message));
            });
    };

    return (
        <>
            <Form className="mb-3" onSubmit={onSubmit}>
                <Row className="align-items-md-center">
                    <Col xs={12} md>
                        <Form.Group controlId="form-username" className="mb-3 mb-md-0">
                            <Form.Label>Nome de usuário</Form.Label>
                            <Form.Control type="text" placeholder="jose.silva" required value={username}
                                          onChange={(e) => setUsername(e.target.value)}/>
                        </Form.Group>
                    </Col>
                    <Col xs={12} md>
                        <Form.Group controlId="form-name" className="mb-3 mb-md-0">
                            <Form.Label>Nome real</Form.Label>
                            <Form.Control type="text" placeholder="José da Silva" required value={name}
                                          onChange={(e) => setName(e.target.value)}/>
                        </Form.Group>
                    </Col>
                    <Col md="auto" className="align-self-end">
                        <Button type="submit" variant="success">Cadastrar</Button>
                    </Col>
                </Row>
            </Form>
            <RenderData data={data} />
        </>
    );
};

const RenderData = ({ data }) => {
    if (data === true) {
        return null;
    }

    if (data === null) {
        return (
            <Loading/>
        );
    }

    if (data instanceof Error) {
        return (
            <div className="alert alert-danger">
                Erro: {data.message}
            </div>
        );
    }

    return (
        <Alert variant="success">
            Usuário <b>{data}</b> criado com sucesso
        </Alert>
    );
}

function UsersCreate () {
    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Criação de usuários</h1>
                <LinkContainer to="/users">
                    <Button>Listagem de usuários</Button>
                </LinkContainer>
            </div>
            <Render/>
        </>
    );
}

export default UsersCreate;
