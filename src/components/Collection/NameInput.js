// import React from "react";
// import styled from "styled-components";
// import { Dimensions, useWindowDimensions } from "react-native";
// import PropTypes from 'prop-types'
// import { theme } from "../../theme";

// const StyledInput = styled.TextInput.attrs(({ theme }) => ({
//   placeholderTextColor: theme.main,
// }))`
//   width: ${({ width }) => width - 40}px;
//   height: 60px;
//   margin: 3px 0;
//   padding: 15px 20px;
//   border-radius: 10px;
//   font-size: 25px;
//   background-color: ${({ theme }) => theme.itemBackground};
//   color: ${({ theme }) => theme.text};
// `;

// const NameInput = ({ placeholder, value, onChangeText, onSubmitEditing, onBlur }) => {
//   const width = useWindowDimensions().width;

//   // const width = Dimensions.get('window').width;
//   return (
//     <StyledInput
//       width={width}
//       placeholder={placeholder}
//       maxLength={50}
//       autoCapitalize="none"
//       autoCorrect={false}
//       returnKeyType="done"
//       keyboardAppearance="dark"
//       value={value}
//       onChangeText={onChangeText}
//       onSubmitEditing={onSubmitEditing}
//       onBlur = {onBlur}
//     />
//   );
// };

// Input.propTypes = {
//     placeholder: PropTypes.string,
//     value: PropTypes.string.isRequired,
//     onChangeText:PropTypes.func.isRequired,
//     onSubmitEditing: PropTypes.func.isRequired,
//     onBlur: PropTypes.func,
// }

// export default NameInput;
