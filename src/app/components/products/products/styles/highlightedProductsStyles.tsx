import styled from "styled-components";
import { colors } from "../../bar/sideBarStyles/sideBarStyle";

export const HighlightedContainer = styled.div`
  background-color: #EFEFEF;
  padding: 20px;
  border-radius: 10px;

`;

export const SectionTitle = styled.h2`
  font-size: 2em;
  color: ${colors.pinkDark};
  margin-top: 1rem;
  text-align: center;
`;

export const SectionDescription = styled.p`
  font-size: 1.2em;
  color: ${colors.darkerGray};
  margin-bottom: 2rem;
  text-align: center;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;