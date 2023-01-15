import React, {useState, forwardRef} from 'react';
import styled from 'styled-components/native';
import {theme} from '../../theme';
import PropTypes from 'prop-types';

const Container = styled.View`
  flex-direction: column;
  width: 85%;
`;
const StyledInput = styled.TextInput.attrs(({theme}) => ({
  placeholderTextColor: theme.placeholder,
}))`
  color: ${({theme}) => theme.basicText};
  padding: 0;
  font-size: 19px;
  border-left-width: 0;
  border-right-width: 0;
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
      isPassword,
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
          secureTextEntry={isPassword}
        />
      </Container>
    );
  },
);

Input.defaultProps = {
  onBlur: () => {},
};

// Input.propTypes = {
//   label: PropTypes.string,
//   value: PropTypes.string.isRequired,
//   onChangeText: PropTypes.func,
//   onSubmitEditing: PropTypes.func,
//   onBlur: PropTypes.func,
//   placeholder: PropTypes.string,
//   returnKeyType: PropTypes.oneOf(["done", "next"]),
//   maxLength: PropTypes.number,
//   isPassword:PropTypes.bool,
// };

export default Input;
