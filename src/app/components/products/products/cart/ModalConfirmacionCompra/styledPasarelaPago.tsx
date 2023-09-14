import styled from "styled-components";

export const StyledPasarelaPago = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  max-width: 550px;
  margin: 40px auto;
  padding: 35px;
  border-radius: 15px;
  background-color: #ffffff;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);

  h6 {
    font-size: 1.5em;
    margin-bottom: 20px;
    color: #2c3e50;
    border-bottom: 2px solid #e0e0e0;
    padding-bottom: 12px;
  }

  p {
    font-size: 1.05em;
    color: #34495e;
    margin-bottom: 20px;
  }

  .MuiButton-root {
    align-self: center;
    margin: 10px 0;
    padding: 12px 25px;
    font-weight: 600;
    letter-spacing: 0.5px;
    background: linear-gradient(45deg, #4ecdc4 30%, #26a69a 90%);
    color: white;
    transition: all 0.3s;

    &:hover {
      transform: scale(1.05);
      background: linear-gradient(45deg, #3db9a8 30%, #1e8875 90%);
      box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
    }
  }

  .MuiButton-containedPrimary {
    background: linear-gradient(45deg, #ff6b6b 30%, #e84141 90%);

    &:hover {
      background: linear-gradient(45deg, #e55a5a 30%, #d43a3a 90%);
    }
  }

  .payment-details {
    border-top: 2px dashed #e0e0e0;
    padding-top: 25px;
  }

  .products-list {
    list-style-type: none;
    padding: 0;
  }

  .products-list li {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 12px;
  }

  .product-image {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 10px;
  }

  .success-message,
  .error-message {
    text-align: center;
    font-weight: bold;
    font-size: 1.2em;
    margin-top: 25px;
  }

  .success-message {
    color: #2ecc71;
  }

  .error-message {
    color: #e74c3c;
  }
  .main-title {
    font-size: 2em;
    text-align: center;
    color: #2c3e50;
    margin-bottom: 30px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  
  .section-card h6 {
    font-size: 1.3em;
    margin-bottom: 20px;
    color: #34495e;
    border-bottom: 2px solid #e0e0e0;
    padding-bottom: 10px;
  }
`;
