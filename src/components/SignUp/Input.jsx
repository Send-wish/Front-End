import React, {useState, forwardRef, memo} from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
  flex-direction: column;
  width: 100%;
  margin-top: 10px
`;
const Label = styled.Text`
  font-size: 16px;
  font-weight: 600;
  margin-left : 5px;
  margin-bottom: 10px;
  color: ${({theme, isFocused}) => (isFocused ? theme.basicText : theme.basicText)};
`;
const StyledInput = styled.TextInput.attrs(({theme}) => ({
  placeholderTextColor: theme.placeholder,
}))`
  background-color: ${({theme}) => theme.lightBackground};
  color: ${({theme}) => theme.text};
  padding: 18px 10px;
  font-size: 16px;
  border: 1px solid
    ${({theme, isFocused}) => (isFocused ? theme.subBackground : theme.lightBackground )};
  border-radius: 15px;
  margin-bottom : 10px;
`;
const Input = forwardRef(
  (
    {
      label,
      value,
      onChangeText,
      onSubmitEditing,
      onBlur,
      placeholder,
      returnKeyType,
      maxLength,
      isPassword,
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    return (
      <Container>
        <Label isFocused={isFocused}>{label}</Label>
        <StyledInput
          ref={ref}
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmitEditing}
          onBlur={() => {
            setIsFocused(false);
            onBlur();
          }}
          placeholder={placeholder}
          returnKeyType={returnKeyType}
          maxLength={maxLength}
          autoCapitalize="none"
          autoCorrect={false}
          textContentType="none"
          isFocused={isFocused}
          onFocus={() => setIsFocused(true)}
          secureTextEntry={isPassword}
        />
      </Container>
    );
  },
);

Input.defaultProps = {
  onBlur: () => {},
};

export default memo(Input);