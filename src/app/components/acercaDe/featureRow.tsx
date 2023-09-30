import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import styled from "@emotion/styled";

const Root = styled.div<{ reverse?: boolean; marginTop?: boolean }>`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  margin-top: ${(props) => (props.marginTop ? "5rem" : "1rem")};
  flex-direction: ${(props) => (props.reverse ? "row-reverse" : "row")};
`;

const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  max-width: 100%;
  height: auto;
`;

const TextContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 2rem;
`;

const Title = styled(Typography)`
  margin-bottom: 1rem;
`;

interface FeatureRowProps {
  imageSrc: string;
  title: string;
  description: string;
  reverse?: boolean;
  marginTop?: boolean;
}

const FeatureRow: React.FC<FeatureRowProps> = ({
  imageSrc,
  title,
  description,
  reverse,
  marginTop,
}) => {
  const rootStyles: React.CSSProperties = {
    flexDirection: reverse ? "row-reverse" : "row",
    marginTop: marginTop ? "5rem" : "1rem",
  };
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <Root style={rootStyles}>
      <ImageContainer>
        <Image src={imageSrc} alt={title} />
      </ImageContainer>
      <TextContainer>
        <Title variant="h5">{title}</Title>
        <Typography variant="body1">{description}</Typography>
      </TextContainer>
    </Root>
  );
};

export default FeatureRow;
