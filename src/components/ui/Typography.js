import styled from 'styled-components/native';

// Shared text primitives so every screen stops re-declaring its own Title/SubTitle.
export const Title = styled.Text`
  font-size: 40px;
  font-weight: 600;
  color: ${({ theme }) => theme.main};
  align-self: flex-start;
  margin: 20px;
`;

export const SubTitle = styled.Text`
  padding: 0 20px;
  color: ${({ theme }) => theme.main};
  font-size: 16px;
  font-weight: 700;
  align-self: flex-start;
`;
