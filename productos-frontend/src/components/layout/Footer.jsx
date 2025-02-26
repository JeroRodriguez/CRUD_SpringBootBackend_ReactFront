import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => {
    return (
        <footer className="py-3 mt-5 bg-dark">
            <Container className="text-center">
                <p className="mb-0 text-muted">
                    &copy; {new Date().getFullYear()} Aplicación de Gestión de Productos
                </p>
            </Container>
        </footer>
    );
};

export default Footer;