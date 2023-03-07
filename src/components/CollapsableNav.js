import React from 'react';

import {Box, Header, Menu, Nav, ResponsiveContext} from 'grommet';
import {StyledLink} from "./StyledLink";

const CollapsableNav = () => (
    <Header background="neutral-3" pad="medium">
        <Box direction="row" align="center" gap="small">
            Notenverwaltung
        </Box>
        <ResponsiveContext.Consumer>
            {(responsive) =>
                responsive === 'small' ? (
                    <Menu
                        label="Menu"
                        items={[
                            {
                                label: <StyledLink to='/'>Noten finden</StyledLink>, onClick: () => {
                                }
                            },
                            {
                                label: <StyledLink to='/pdf'>PDF erstellen</StyledLink>, onClick: () => {
                                }
                            },
                            {
                                label: <StyledLink to='/create'>Noten anlegen</StyledLink>, onClick: () => {
                                }
                            },
                        ]}
                    />
                ) : (
                    <Nav direction="row">
                        <StyledLink to='/'>Noten Finden</StyledLink>
                        <StyledLink to='/pdf'>PDF erstellen</StyledLink>
                        <StyledLink to='/create'>Noten anlegen</StyledLink>
                    </Nav>
                )
            }
        </ResponsiveContext.Consumer>
    </Header>
);

export const Collapsable = () => <CollapsableNav/>;