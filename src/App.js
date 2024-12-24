import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homes from './screens/homes'; // Capitalized 'Homes'
import Home from './screens/Home';
import Playground from './screens/Playground';
import Error404 from './screens/Error404';
import { GlobalStyle } from './style/global';
import ModalProvider from './context/ModalContext';
import PlaygroundProvider from './context/PlaygroundContext';

function App() {
  return (
    <PlaygroundProvider>
      <ModalProvider>
        <BrowserRouter>
          <GlobalStyle />
          <Routes>
            <Route path="/" element={<Homes />} />
            <Route path="/home" element={<Home />} />
            <Route path="/playground/:folderId/:playgroundId" element={<Playground />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
        </BrowserRouter>
      </ModalProvider>
    </PlaygroundProvider>
  );
}

export default App;
