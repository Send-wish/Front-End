import React from "react";
import styled from "styled-components/native";

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
            {/* <StyledText>{email}</StyledText> */}
        </Container>
    );
}

export default ListFriend;