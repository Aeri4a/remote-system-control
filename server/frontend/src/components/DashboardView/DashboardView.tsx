import { FunctionComponent, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { RiInformationLine, RiSettings4Line, RiTimelineView, RiToolsLine } from "@remixicon/react";

import {
  ActionTile,
  ActionTileBar,
  Container,
  Content,
  FuncBox,
  MenuOption,
  Navbar,
  NavbarBox,
  NavbarConnection,
  NavbarOptions,
  TopBar,
} from "./DashboatdView.styles";
import ConnectionBox from "../ConnectionBox";
import { API_URL } from "../../config/config";
import Dialog from "../Dialog";
import axios from "axios";

const DashboardView: FunctionComponent = () => {
  const toast = useToast();
  const [open, setOpen] = useState(false);
  
  // Temporary functional
  const [value, setValue] = useState('');
  const devicewol = () => {
    const payload = { mac: value, broadcast: '' }

    axios.post(`${API_URL}/devicewol`, payload).then(_ => {
      toast({
        title: 'Run success',
        status: 'success'
      })
    }).catch(err => {
      toast({
        title: 'An error occured :\'(',
        status: 'error'
      })
      console.log(err);
    });
    setOpen(false);
  }

  // TODO: sort & order components to other files
  return (
    <> 
    {/* Temporary specific dialog usage */}
    <Dialog
      isOpen={open}
      onClose={() => { setOpen(false) }}
      value={value}
      changeValue={(e) => setValue(e.target.value)}
      runFunction={devicewol}
    />
    <Container>
      <Navbar>
        <NavbarBox>
          <NavbarConnection>
            <ConnectionBox/>
          </NavbarConnection>
          <NavbarOptions>
            <MenuOption>
              Tools <RiToolsLine/>
            </MenuOption>
            <MenuOption>
              Logger <RiTimelineView/>
            </MenuOption>
            <MenuOption>
              Settings <RiSettings4Line/>
            </MenuOption>
          </NavbarOptions>
        </NavbarBox>
      </Navbar>
      <FuncBox>
        <TopBar>
          Title
        </TopBar>
        <Content>
          <ActionTile
            onClick={() => { setOpen(true) }}
          >
            <ActionTileBar>
            Wake on LAN
            <RiInformationLine/>
            </ActionTileBar>
          </ActionTile>
        </Content>
      </FuncBox>
    </Container>
    </>
  );
};

export default DashboardView;
