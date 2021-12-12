import React, { useContext, useMemo } from 'react';
import styled, { ThemeContext } from 'styled-components';

import { Link } from 'react-router-dom';

interface ButtonProps {
  children?: React.ReactNode;
  disabled?: boolean;
  href?: string;
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  to?: string;
  variant?: 'default' | 'secondary' | 'tertiary';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, className, disabled, href, onClick, size, text, to, variant }) => {
  return (
    <button className={`btn ${className}`} onClick={onClick}>
      {text || children}
    </button>
  );
};

interface StyledButtonProps {
  boxShadow: string;
  color: string;
  disabled?: boolean;
  fontSize: number;
  padding: number;
  size: number;
}

const StyledButton = styled.button<StyledButtonProps>`
  align-items: center;
  background-color: ${(props) => props.theme.color.grey[900]};
  border: 0;
  border-radius: 12px;
  box-shadow: ${(props) => props.boxShadow};
  color: ${(props) => (!props.disabled ? props.color : `${props.color}55`)};
  cursor: pointer;
  display: flex;
  font-size: ${(props) => props.fontSize}px;
  font-weight: 700;
  height: ${(props) => props.size}px;
  justify-content: center;
  outline: none;
  padding-left: ${(props) => props.padding}px;
  padding-right: ${(props) => props.padding}px;
  pointer-events: ${(props) => (!props.disabled ? undefined : 'none')};
  width: 100%;
  &:hover {
    background-color: ${(props) => props.color};
    color: ${(props) => props.theme.color.grey[900]};
  }
`;

const StyledLink = styled(Link)`
  align-items: center;
  color: inherit;
  display: flex;
  flex: 1;
  height: 56px;
  justify-content: center;
  margin: 0 ${(props) => -props.theme.spacing[4]}px;
  padding: 0 ${(props) => props.theme.spacing[4]}px;
  text-decoration: none;
`;

const StyledExternalLink = styled.a`
  align-items: center;
  color: inherit;
  display: flex;
  flex: 1;
  height: 56px;
  justify-content: center;
  margin: 0 ${(props) => -props.theme.spacing[4]}px;
  padding: 0 ${(props) => props.theme.spacing[4]}px;
  text-decoration: none;
`;

export default Button;
