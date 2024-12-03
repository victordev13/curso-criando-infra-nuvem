import { useState, useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import Loading from '../componentes/Loading';

const Render = () => {
    const [data, setData] = useState(null);
    const [confirmDeleteUsername, setConfirmDeleteUsername] = useState(null);

    useEffect(() => {
        fetch(import.meta.env.VITE_APP_API_URL + '/users')
            .then((response) => response.json())
            .then((response) => {
                if (!response.data) {
                    setData(new Error('Um erro desconhecido ocorreu. Por favor, tente novamente.'));
                    return;
                }
                setData(response.data);
            })
            .catch(setData);
    }, []);

    if (data instanceof Error) {
        return (
            <Alert variant="danger">
                Erro: {data.message}
            </Alert>
        );
    }

    if (data === null) {
        return (
            <Loading />
        );
    }

    if (!data.length) {
        return (
            <Alert variant="primary">
                Nenhum usuário cadastrado
            </Alert>
        );
    }

    const deleteUser = (id) => {
        setConfirmDeleteUsername(null);
        setData(null);
        fetch(import.meta.env.VITE_APP_API_URL + '/users/' + id, {
            method: 'DELETE',
        })
            .then((response) => response.json())
            .then((response) => {
                if (!response.data) {
                    setData(new Error('Um erro desconhecido ocorreu. Por favor, tente novamente.'));
                    return;
                }
                setData(data.filter((user) => user.id !== id));
            })
            .catch(setData);
    };

    return (
        <>
            <Table striped className="align-middle">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nome de usuário</th>
                        <th>Nome</th>
                        <th></th>
                    </tr>
                </thead>
                <tfoot>
                    <tr>
                        <td colSpan="4">
                            <em>
                                {data.length} usuário{(data.length === 1) ? '' : 's'} encontrado{(data.length === 1) ? '' : 's'}
                            </em>
                        </td>
                    </tr>
                </tfoot>
                <tbody>
                    {data.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            <td>{user.name}</td>
                            <td className="text-end">
                                <Button variant="outline-danger" size="sm"
                                        onClick={() => setConfirmDeleteUsername(user)}>
                                    Excluir
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Modal show={confirmDeleteUsername !== null} onHide={() => setConfirmDeleteUsername(null)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar exclusão</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p className="text-danger mb-0">
                        Você tem certeza que deseja excluir o usuário <b>{confirmDeleteUsername?.username}</b>? Essa
                        ação não
                        poderá ser desfeita.
                    </p>
                </Modal.Body>

                <Modal.Footer className="justify-content-between">
                    <Button variant="danger" onClick={() => deleteUser(confirmDeleteUsername.id)}>Confirmar
                        exclusão</Button>
                    <Button variant="secondary" onClick={() => setConfirmDeleteUsername(null)}>Fechar</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

function UsersList () {
    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Listagem de usuários</h1>
                <LinkContainer to="/users/create">
                    <Button>Cadastrar usuário</Button>
                </LinkContainer>
            </div>
            <Render/>
        </>
    );
}

export default UsersList;
