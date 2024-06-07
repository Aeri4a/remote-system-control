import { Box } from "@chakra-ui/react";
import styled from "styled-components";

export const Container = styled.div({
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
});

export const Topbar = styled.div({
    display: 'flex',
    height: '60px',
    alignItems: 'center',
    backgroundColor: 'var(--chakra-colors-gray-900)',
    justifyContent: 'flex-end',
    padding: '30px'
});

export const Content = styled.div({
    display: 'flex',
    flexGrow: 1,
});

export const LogContainer = styled.div({
    display: 'flex',
    flexGrow: 1,
    padding: '20px',
    border: '1px solid gray',
    borderRadius: '5px',
    overflowY: 'auto',
    textWrap: 'wrap'
});

export const StyledHeader = styled(Box)({
    fontSize: '30px',
    backgroundColor: 'var(--chakra-colors-gray-600)',
    borderRadius: '5px',
    textAlign: 'center',
    fontWeight: '700'
});