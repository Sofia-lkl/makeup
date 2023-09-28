import { colors } from './colors';
import styled from 'styled-components';
import { StyledFilterBar } from './sideBarStyle';
export const FilterButtons = styled(StyledFilterBar)`
  display: flex;
  flex-direction: row; 
  gap: 10px;
  width: 80%;
  justify-content: center;

  button {
    display: flex;
    align-items: center;
    gap: 5px; 
    padding: 8px 12px; 
    border: none;
    border-radius: 20px;
    font-size: 0.9em; 
    cursor: pointer;
    background-color: ${colors.neutralLight};
    color: ${colors.text};
    transition: background-color 0.3s, transform 0.3s;

    &.active {
      background-color: ${colors.pinkLight};
      color: white;
    }

    &:hover {
      background-color: ${colors.pinkDark};
      transform: scale(1.05);
      color: white;
    }
  }
`;
export const FilterOption = styled.button`
  background: none;
  border: 1px solid ${colors.pinkLight};
  padding: 7px 12px;
  border-radius: 15px;
  margin-right: 12px;
  margin-bottom: 12px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s, color 0.3s;
  color: ${colors.pinkDark};

  &:hover {
    background-color: ${colors.pinkDark};
    transform: scale(1.05);
    color: white;
  }

  &.active {
    background-color: ${colors.pinkDark};
    color: white;
  }
`;
