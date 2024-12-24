import React, { useContext } from 'react';
import styled from 'styled-components';
import logo from '../../assets/logo.png';
import { ModalContext } from '../../context/ModalContext';
import { FaPlus } from 'react-icons/fa';

const StyledLeftComponent = styled.div`
  width: 300px;
  height: 100vh;
  background-color: #252526;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    padding: 1rem;
  }
`;

const ContentContainer = styled.div`
  text-align: center;
`;

const Logo = styled.img`
  width: 120px;
  height: 120px; /* Ensure height matches width for a perfect circle */
  margin-left: 25px;
  margin-bottom: 2rem;
  border-radius: 50%; /* Makes it circular */
  object-fit: cover; /* Ensures the image scales properly within the circle */
`;


const MainHeading = styled.h1`
  font-size: 2.5rem;
  font-weight: 400;
  color: #fff;
  margin-bottom: 0.75rem;

  span {
    font-weight: 700;
    color: #0078d4;
  }
`;

const SubHeading = styled.div`
  font-size: 1.2rem;
  color: #a0a0a0;
  margin-bottom: 2rem;
`;

const AddNewButton = styled.button`
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  background-color: #0078d4;
  color: #fff;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: #005a9e;
  }
`;

const LeftComponent = () => {
  const { openModal } = useContext(ModalContext);

  return (
    <StyledLeftComponent>
      <ContentContainer>
        <Logo src={logo} alt="CodeOn Logo" />
        <MainHeading>
          <span>Code</span>On
        </MainHeading>
        <SubHeading>Build - Test - Refine</SubHeading>
      </ContentContainer>
      <AddNewButton
        onClick={() =>
          openModal({
            show: true,
            modalType: 3,
            identifiers: {
              folderId: '',
              cardId: '',
            },
          })
        }
      >
        <FaPlus /> Create New Repository
      </AddNewButton>
    </StyledLeftComponent>
  );
};

export default LeftComponent;