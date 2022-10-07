import React from 'react';
import { Container } from '@mantine/core';
import { Navbar } from './Navbar';

const Layout = ({ children }) => {
    return (
        <div>
            <Navbar />
            <Container size="95%">
                {
                    children
                }
            </Container>

        </div>
    )
}

export default Layout;
