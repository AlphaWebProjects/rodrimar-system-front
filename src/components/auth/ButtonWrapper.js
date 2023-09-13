import styled from 'styled-components';

export const ButtonWrapper = styled.div`
  width: ${props => props.width || "auto"};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: .6vh;
`;
