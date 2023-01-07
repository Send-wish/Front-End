import React, {useState, forwardRef} from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import propTypes from 'prop-types';
import {theme} from '../theme';

const Container = styled.View`
  flex-direction: column;
  width: 100%;
  margin: 5px 0;
  padding: 0px 8px 0px 8px;
`;
const Label = styled.Text`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 6px;
  color: ${({theme, isFocused}) =>
    isFocused ? theme.tintColorPink : theme.basicText};
`;
const StyledInput = styled.TextInput.attrs(({theme}) => ({
  placeholderTextColor: theme.basicText,
}))`
  background-color: ${({theme}) => theme.mainBackground};
  color: ${({theme}) => theme.basicText};
  padding: 20px 10px;
  font-size: 16px;
  border: 1px solid
    ${({theme, isFocused}) =>
      isFocused ? theme.tintColorPink : theme.basicText};
  border-radius: 4px;
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

// Input.propTypes = {
//   label: PropTypes.string,
//   value: PropTypes.string.isRequired,
//   onChangeText: PropTypes.func,
//   onSubmitEditing: PropTypes.func,
//   onBlur: PropTypes.func,
//   placeholder: PropTypes.string,
//   returnKeyType: PropTypes.oneOf(['done', 'next']),
//   maxLength: PropTypes.number,
//   isPassword: propTypes.bool,
// };


export default Input;