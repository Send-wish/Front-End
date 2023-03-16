import React, {forwardRef, memo} from 'react';
import styled from 'styled-components/native';
import {theme} from '../../theme';
import PropTypes from 'prop-types';

const Container = styled.View`
  flex-direction: column;
  width: 70%;
  height: 50px;
  margin-top: 25px;
`;
const StyledInput = styled.TextInput.attrs(({theme}) => ({
  placeholderTextColor: theme.placeholder,
}))`
  color: ${({theme}) => theme.basicText};
  padding: 0;
  font-size: 20px;

`;
const Input = forwardRef(
  (
    {
      value,
      onChangeText,
      onSubmitEditing,
      onBlur,
      returnKeyType,
      maxLength,
    },
    ref,
  ) => {

    return (
      <Container>
        <StyledInput
          ref={ref}
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmitEditing}
          onBlur={() => {
            onBlur();
          }}
          returnKeyType={returnKeyType}
          maxLength={maxLength}
          autoCapitalize="none"
          autoCorrect={false}
          textContentType="none"
          autoFocus={true}
          blurOnSubmit={false}
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

export default memo(Input);
