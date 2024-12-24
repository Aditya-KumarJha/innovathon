import React from 'react';
import styled from 'styled-components';

const StyledLabel = styled.label`
  display: inline-block;
  font-size: 14px;
  font-weight: 500;
  color: #333333;
  margin-bottom: 8px;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: #0078d4;
  }

  &:focus-within {
    color: #005a9e;
  }
`;

export const Label = ({ children, className, htmlFor, ...props }) => {
  return (
    <StyledLabel className={className} htmlFor={htmlFor} {...props}>
      {children}
    </StyledLabel>
  );
};
