import React, { useContext, useState } from 'react'
import EditorContainer from './EditorContainer'
import InputConsole from './InputConsole'
import OutputConsole from './OutputConsole'
import Navbar from './Navbar'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { languageMap, PlaygroundContext } from '../../context/PlaygroundContext'
import { ModalContext } from '../../context/ModalContext'
import Modal from '../../components/Modal'
import { Buffer } from 'buffer'
import axios from 'axios'

const MainContainer = styled.div`
  display: grid;
  grid-template-columns: ${({ isFullScreen }) => isFullScreen ? '1fr' : '2fr 1fr'};
  min-height: ${({ isFullScreen }) => isFullScreen ? '100vh' : 'calc(100vh - 4.5rem)'};
  @media (max-width: 768px){
    grid-template-columns: 1fr;
  }
`

const Consoles = styled.div`
  display: grid;
  width: 100%;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr;
`

const Playground = () => {
  const { folderId, playgroundId } = useParams()
  const { folders, savePlayground } = useContext(PlaygroundContext)
  const { isOpenModal, openModal, closeModal } = useContext(ModalContext)
  
  // Get initial values from folders context
  const { title, language, code } = folders[folderId].playgrounds[playgroundId]

  // State declarations
  const [currentLanguage, setCurrentLanguage] = useState(language)
  const [currentCode, setCurrentCode] = useState(code)
  const [currentInput, setCurrentInput] = useState('')
  const [currentOutput, setCurrentOutput] = useState('')
  const [isFullScreen, setIsFullScreen] = useState(false)

  // Encoding/decoding functions
  const encode = (str) => {
    return Buffer.from(str, "binary").toString("base64")
  }

  const decode = (str) => {
    return Buffer.from(str, 'base64').toString()
  }

  // API calls
  const postSubmission = async (language_id, source_code, stdin) => {
    const options = {
      method: 'POST',
      url: 'https://judge0-ce.p.rapidapi.com/submissions',
      params: { base64_encoded: 'true', fields: '*' },
      headers: {
        'content-type': 'application/json',
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': '8323d881e9msh1c56a09b6bb40eap167ee3jsndeda25a181c9',
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
      },
      data: JSON.stringify({
        language_id: language_id,
        source_code: source_code,
        stdin: stdin
      })
    };

    const res = await axios.request(options);
    return res.data.token
  }

  const getOutput = async (token) => {
    const options = {
      method: 'GET',
      url: "https://judge0-ce.p.rapidapi.com/submissions/" + token,
      params: { base64_encoded: 'true', fields: '*' },
      headers: {
        'X-RapidAPI-Key': '8323d881e9msh1c56a09b6bb40eap167ee3jsndeda25a181c9',
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
      }
    };

    const res = await axios.request(options);
    if (res.data.status_id <= 2) {
      const res2 = await getOutput(token);
      return res2;
    }
    return res;
  }

  const runCode = async () => {
    try {
      openModal({
        show: true,
        modalType: 6,
        identifiers: {
          folderId: "",
          cardId: "",
        }
      })

      const language_id = languageMap[currentLanguage].id;
      const source_code = encode(currentCode);
      const stdin = encode(currentInput);

      // Add timeout for the submission request
      const token = await Promise.race([
        postSubmission(language_id, source_code, stdin),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Submission timeout')), 10000)
        )
      ]);

      if (!token) {
        throw new Error('Failed to get submission token');
      }

      // Add timeout and retry logic for getting output
      let attempts = 0;
      const maxAttempts = 3;
      let output;

      while (attempts < maxAttempts) {
        try {
          output = await Promise.race([
            getOutput(token),
            new Promise((_, reject) => 
              setTimeout(() => reject(new Error('Output timeout')), 5000)
            )
          ]);
          break;
        } catch (error) {
          attempts++;
          if (attempts === maxAttempts) {
            throw new Error('Failed to get output after multiple attempts');
          }
          // Wait before retry
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      }

      const status_name = output?.data?.status?.description || 'Execution Error';
      const decoded_output = output?.data?.stdout ? decode(output.data.stdout) : '';
      const decoded_compile_output = output?.data?.compile_output ? decode(output.data.compile_output) : '';
      const decoded_error = output?.data?.stderr ? decode(output.data.stderr) : '';

      let final_output = '';
      if (output?.data?.status_id !== 3) {
        final_output = decoded_compile_output || decoded_error || 'An error occurred during execution';
      } else {
        final_output = decoded_output;
      }

      setCurrentOutput(status_name + "\n\n" + final_output);
    } catch (error) {
      setCurrentOutput(`Error: ${error.message || 'An unexpected error occurred'}`);
    } finally {
      closeModal();
    }
  };

  const saveCode = () => {
    savePlayground(folderId, playgroundId, currentCode, currentLanguage)
  }

  const getFile = (e, setState) => {
    const input = e.target;
    if ("files" in input && input.files.length > 0) {
      placeFileContent(input.files[0], setState);
    }
  };

  const placeFileContent = (file, setState) => {
    readFileContent(file)
      .then((content) => {
        setState(content)
      })
      .catch((error) => console.log(error));
  };

  function readFileContent(file) {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onload = (event) => resolve(event.target.result);
      reader.onerror = (error) => reject(error);
      reader.readAsText(file);
    });
  }

  return (
    <div>
      <Navbar isFullScreen={isFullScreen} />
      <MainContainer isFullScreen={isFullScreen}>
        <EditorContainer
          title={title}
          currentLanguage={currentLanguage}
          setCurrentLanguage={setCurrentLanguage}
          currentCode={currentCode}
          setCurrentCode={setCurrentCode}
          folderId={folderId}
          playgroundId={playgroundId}
          saveCode={saveCode}
          runCode={runCode}
          getFile={getFile}
          isFullScreen={isFullScreen}
          setIsFullScreen={setIsFullScreen}
        />
        <Consoles>
          <InputConsole
            currentInput={currentInput}
            setCurrentInput={setCurrentInput}
            getFile={getFile}
          />
          <OutputConsole
            currentOutput={currentOutput}
          />
        </Consoles>
      </MainContainer>
      {isOpenModal.show && <Modal />}
    </div>
  )
}

export default Playground