import styled from "styled-components";
import { colors } from "../../bar/sideBarStyles/sideBarStyle";

const breakpoints = {
  tablet: '768px',
  mobile: '480px'
};

export const HighlightedContainer = styled.div`
  background-color: #EFEFEF;
  padding: 20px;
  border-radius: 10px;

  @media only screen and (max-width: ${breakpoints.tablet}) {
    padding: 15px;
  }

  @media only screen and (max-width: ${breakpoints.mobile}) {
    padding: 10px;
  }
`;

export const SectionTitle = styled.h2`
  font-size: 2em;
  color: ${colors.pinkDark};
  margin-top: 1rem;
  text-align: center;

  @media only screen and (max-width: ${breakpoints.tablet}) {
    font-size: 1.8em;
    margin-top: 0.8rem;
  }

  @media only screen and (max-width: ${breakpoints.mobile}) {
    font-size: 1.6em;
    margin-top: 0.6rem;
  }
`;

export const SectionDescription = styled.p`
  font-size: 1.2em;
  color: ${colors.darkerGray};
  margin-bottom: 2rem;
  text-align: center;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;

  @media only screen and (max-width: ${breakpoints.tablet}) {
    font-size: 1.1em;
    max-width: 700px;
    margin-bottom: 1.5rem;
  }

  @media only screen and (max-width: ${breakpoints.mobile}) {
    font-size: 1em;
    max-width: 90%;
    margin-bottom: 1rem;
  }
`;
