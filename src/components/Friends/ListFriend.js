import React from "react";
import styled from "styled-components/native";
import ShareIcon from "./ShareIcon";
import DeleteIcon from './DeleteIcon';


const Container = styled.View`
    width: 95%;
    height: 70px;
    background-color: black;
    border-radius: 15px;
    border-width: 1px;
    border-color: white;
    margin: 10px;
    padding: 10px;
    justify-content: center;
    opacity: 0.9;
    flex-direction:row;
    align-items: center;
`;

const StyledText = styled.Text`
    margin-left: 10%;
    color: white;
    font-size: 25px;
    font-weight: bold;
    margin-right: 10px;
`;

const ListFriend = ({friendName, onPress}) => {
    return (
        <Container>
            <StyledText>{friendName}</StyledText>
            <ShareIcon onPress={onPress} />
            <DeleteIcon onPress={onPress} />
        </Container>
    );
}

export default ListFriend;