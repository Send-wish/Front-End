import React, {useState, forwardRef, memo} from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
  flex-direction: column;
  width: 100%;
  margin-top: 10px;
`;
const StyledInput = styled.TextInput.attrs(({theme}) => ({
  placeholderTextColor: theme.placeholder,
}))`
  background-color: ${({theme}) => theme.mainBackground};
  color: ${({theme}) => theme.basicText};
  padding: 18px 10px;
  font-size: 18px;
  border: ${({theme}) => theme.basicText};
  border-top-width: 0;
  border-bottom-width: 0.5px;
  border-left-width: 0;
  border-right-width: 0;
  margin-bottom: 130px;
`;
const Input = forwardRef(
  (
    {
      value,
      onChangeText,
      onSubmitEditing,
      onBlur,
      placeholder,
      returnKeyType,
      maxLength,
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(true);
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
          placeholder={placeholder}
          returnKeyType={returnKeyType}
          maxLength={maxLength}
          autoCapitalize="none"
          autoCorrect={false}
          textContentType="none"
          isFocused={isFocused} 
          onFocus={() => setIsFocused(true)}  
          autoFocus={true}
        />
      </Container>
    );
  },
);

Input.defaultProps = {
  onBlur: () => {},
};

export default memo(Input);