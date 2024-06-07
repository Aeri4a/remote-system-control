import { FunctionComponent } from "react";
import { Box, Button, Text } from "@chakra-ui/react";
import styled from "styled-components";

export enum StatusColor {
    ACTIVE = '#4DE85D',
    WAITING = '#F3961B',
    CLOSED = '#E93131'
};

export enum ConnectionText {
    ACTIVE = 'Disallow connections',
    WAITING = 'Waiting for the connection',
    CLOSED = 'Allow connections'
};

const StatusCirle = styled.div<{ $color: StatusColor }>`
    width: 20px;
    height: 20px;
    border-radius: 10px;
    background-color: ${({ $color }) => $color};
`;

interface CBProps {
    statusColor: StatusColor;
    contentText: ConnectionText;
};

const ConnectionBox: FunctionComponent<CBProps> = ({ statusColor, contentText }) => {
    return (
        <Box display='flex' alignItems='center' gap={5}>
            <StatusCirle $color={statusColor}/>
            <Button size='lg'>
                <Text fontSize={25}>
                    {contentText}
                </Text>
            </Button>
        </Box>
    );
};

export default ConnectionBox;
