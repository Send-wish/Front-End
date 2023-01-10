import React from "react";
import styled from "styled-components/native";
import Sharing from "./Sharing";
import EditIcon from "./EditIcon";

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
    flex-wrap: wrap;
    align-items: center;
`;

const StyledText = styled.Text`
    margin-left: 5%;
    color: white;
    font-size: 20px;
    font-weight: bold;
`;

const ListFriend = ({nickName}) => {
    return (
        <Container>
            <StyledText>{nickName}</StyledText>
            <Sharing />
        </Container>
    );
}

export default ListFriend;