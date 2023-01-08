import React, {useState, forwardRef} from 'react';
import styled from 'styled-components/native';
import {theme} from '../../theme';

const Container = styled.View`
  flex-direction: column;
  width: 270px;
`;
const StyledInput = styled.TextInput.attrs(({theme}) => ({
  placeholderTextColor: theme.placeholder,
}))`
  background-color: ${({theme}) => theme.subBackground};
  color: ${({theme}) => theme.text};
  padding: 10px 10px;
  font-size: 20px;
  color: ${({theme}) => theme.basicText};
  border-radius: 15px;
`;
const Input = forwardRef(
  (
    {
      value,
      onChangeText,
      onSubmitEditing,
      onBlur,
      returnKeyType,
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    return (
      <Container>
        <StyledInput
          ref={ref}
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmitEditing}
          onBlur={() => {
            setIsFocused(false);
            onBlur();
          }}
          returnKeyType={returnKeyType}
          autoCapitalize="none"
          autoCorrect={false}
          textContentType="none"
        />
      </Container>
    );
  },
);

Input.defaultProps = {
  onBlur: () => {},
};

export default Input;
