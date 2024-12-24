import React, { useContext } from 'react';
import styled from 'styled-components';
import { IoTrashOutline } from 'react-icons/io5';
import { BiEditAlt } from 'react-icons/bi';
import { FcOpenedFolder } from 'react-icons/fc';
import { FaPlus } from 'react-icons/fa';
import logo from '../../assets/logo-small.png';
import { ModalContext } from '../../context/ModalContext';
import { PlaygroundContext } from '../../context/PlaygroundContext';
import { useNavigate } from 'react-router-dom';

const StyledRightComponent = styled.div`
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 0;
  border-bottom: 1px solid #4a4a4a;
  margin-bottom: 1.5rem;
`;

const Heading = styled.h3`
  font-size: ${(props) => (props.size === 'small' ? '1.25rem' : '1.75rem')};
  font-weight: 400;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #e0e0e0;

  span {
    font-weight: 700;
    color: #0078d4;
  }
`;

const AddButton = styled.button`
  font-size: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  background-color: #0078d4;
  color: #fff;
  border: none;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #005a9e;
  }
`;

const FolderCard = styled.div`
  margin-bottom: 2rem;
  background-color: #2d2d2d;
  border-radius: 8px;
  padding: 1rem;
`;

const FolderIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const PlayGroundCards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
`;

const Card = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 8px;
  background-color: #3c3c3c;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
  }
`;

const CardContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const CardContent = styled.div`
  flex: 1;
`;

const Logo = styled.img`
  width: 40px;
  height: 40px; /* Ensure height matches width for a perfect circle */
  margin-right: 1rem;
  border-radius: 50%; /* Makes it circular */
  object-fit: cover; /* Ensures the image scales properly within the circle */
`;


const Language = styled.span`
  font-size: 0.8rem;
  color: #0078d4;
  background-color: rgba(0, 120, 212, 0.1);
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  color: #a0a0a0;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: #e0e0e0;
  }
`;

const RightComponent = () => {
  const navigate = useNavigate();
  const { openModal } = useContext(ModalContext);
  const { folders, deleteFolder, deleteCard } = useContext(PlaygroundContext);

  return (
    <StyledRightComponent>
      <Header>
        <Heading size="large">
          My <span>Repository</span>
        </Heading>
        <AddButton
          onClick={() =>
            openModal({
              show: true,
              modalType: 1,
              identifiers: {
                folderId: '',
                cardId: '',
              },
            })
          }
        >
          <FaPlus /> New Folder
        </AddButton>
      </Header>

      {Object.entries(folders).map(([folderId, folder]) => (
        <FolderCard key={folderId}>
          <Header>
            <Heading size="small">
              <FcOpenedFolder /> {folder.title}
            </Heading>
            <FolderIcons>
              <IconButton onClick={() => deleteFolder(folderId)}>
                <IoTrashOutline />
              </IconButton>
              <IconButton
                onClick={() =>
                  openModal({
                    show: true,
                    modalType: 4,
                    identifiers: {
                      folderId: folderId,
                      cardId: '',
                    },
                  })
                }
              >
                <BiEditAlt />
              </IconButton>
              <AddButton
                onClick={() =>
                  openModal({
                    show: true,
                    modalType: 2,
                    identifiers: {
                      folderId: folderId,
                      cardId: '',
                    },
                  })
                }
              >
                <FaPlus /> New Repository
              </AddButton>
            </FolderIcons>
          </Header>

          <PlayGroundCards>
            {Object.entries(folder['playgrounds']).map(([playgroundId, playground]) => (
              <Card
                key={playgroundId}
                onClick={() => {
                  navigate(`/playground/${folderId}/${playgroundId}`);
                }}
              >
                <CardContainer>
                  <Logo src={logo} alt="Playground Logo" />
                  <CardContent>
                    <p>{playground.title}</p>
                    <Language>{playground.language}</Language>
                  </CardContent>
                </CardContainer>
                <FolderIcons
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <IconButton onClick={() => deleteCard(folderId, playgroundId)}>
                    <IoTrashOutline />
                  </IconButton>
                  <IconButton
                    onClick={() =>
                      openModal({
                        show: true,
                        modalType: 5,
                        identifiers: {
                          folderId: folderId,
                          cardId: playgroundId,
                        },
                      })
                    }
                  >
                    <BiEditAlt />
                  </IconButton>
                </FolderIcons>
              </Card>
            ))}
          </PlayGroundCards>
        </FolderCard>
      ))}
    </StyledRightComponent>
  );
};

export default RightComponent;

