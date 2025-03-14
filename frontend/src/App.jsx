import { BrowserRouter, Routes, Route } from 'react-router';
import Startup from './components/pages/Startup';
import Game from './components/pages/Game';

function App() {
    return (
        <>
            <div>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Startup />}></Route>
                        <Route path="/game" element={<Game />}></Route>
                    </Routes>
                </BrowserRouter>
            </div>
        </>
    );
}

export default App;
