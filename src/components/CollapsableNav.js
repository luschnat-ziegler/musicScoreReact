import React from 'react';

import {Box, Header, Menu, Nav, ResponsiveContext} from 'grommet';
import {Link} from "react-router-dom";
import styled from "styled-components";

const CollapsableNav = () => (
    <Header background="neutral-3" pad="medium">
        <Box direction="row" align="center" gap="small">
            GV Hofbieber Notenmanagement
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

const StyledLink = styled(Link)`
  color: White;
  text-decoration: none;
  margin: .5rem;
  position: relative;
`;