import styled from "styled-components";
import { Colors } from "../../config/config";
import { Box } from "@chakra-ui/react";

export const Container = styled.div({
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'row',
});

export const Navbar = styled.div({
    display: 'flex',
    flex: 1,
    padding: '20px',
});

export const NavbarBox = styled.div({
    flex: 1,
    borderRadius: '8px',
    padding: '15px',
    backgroundColor: Colors.C3,
});

export const NavbarConnection = styled.div({
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: '15px',
    borderBottom: `1px solid ${Colors.C2}`
});

export const NavbarOptions = styled.div({
    display: 'flex',
    flex: 10,
    flexDirection: 'column',
    gap: '10px',
    paddingTop: '15px'
})

export const MenuOption = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '20px',
    padding: '5px 20px',
    backgroundColor: Colors.C4,
    borderRadius: '8px',
    borderWidth: '1px',
    cursor: 'pointer',
    '&:hover': {
        backgroundColor: Colors.C5,
        borderColor: Colors.C1,
        borderWidth: '1px'
    },
    transition: '0.5s'
}));

export const FuncBox = styled.div({
    display: 'flex',
    flex: 5,
    flexDirection: 'column',
    gap: '20px',
    padding: '20px',
});

export const TopBar = styled.div({
    display: 'flex',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: '25px',
    fontSize: '25px',
    borderRadius: '8px',
    backgroundColor: Colors.C4
});

export const Content = styled.div({
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gap: '20px',
    flex: '10 0 0',
    overflowY: 'auto'
})

export const ActionTile = styled.div({
    height: '120px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundColor: Colors.C5,
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '18px',
    '&:hover': {
        backgroundColor: Colors.C6
    },
    transition: '0.5s'
});

export const ActionTileBar = styled.div({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 15px',
    backgroundColor: Colors.C4,
    borderRadius: '8px',
});