import React from 'react';
import styled from 'styled-components';

import { Button } from '@material-ui/core';
import Input, { InputProps } from '../Input';

interface TokenInputProps extends InputProps {
  max: number | string;
  symbol: string;
  onSelectMax?: () => void;
}

const TokenInput: React.FC<TokenInputProps> = ({ max, symbol, onChange, onSelectMax, value }) => {
  return (
    <StyledTokenInput>
      <div className="text-right mb-1 font-Poppins text-sm font-semibold">
        {max.toLocaleString()} {symbol} Available
      </div>
      <Input
        endAdornment={
          <StyledTokenAdornmentWrapper>
            <StyledSpacer />
            <div className="relative">
              <button className="btn absolute p-2 -top-5 -right-2 " onClick={onSelectMax}>
                Max
              </button>
            </div>
          </StyledTokenAdornmentWrapper>
        }
        onChange={onChange}
        placeholder="0"
        value={value}
      />
    </StyledTokenInput>
  );
};

const StyledTokenInput = styled.div``;

const StyledSpacer = styled.div`
  width: ${(props) => props.theme.spacing[3]}px;
`;

const StyledTokenAdornmentWrapper = styled.div`
  align-items: center;
  display: flex;
`;

const StyledMaxText = styled.div`
  align-items: center;
  color: ${(props) => props.theme.color.grey[400]};
  display: flex;
  font-size: 14px;
  font-weight: 700;
  height: 44px;
  justify-content: flex-end;
`;

export default TokenInput;
