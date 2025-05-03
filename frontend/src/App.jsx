import { BrowserRouter, Routes, Route } from 'react-router';
import Startup from './components/pages/Startup';
import Companion from './components/pages/Companion';

function App() {
    return (
        <>
            <div className="flex flex-col mx-auto justify-center w-[768px] min-h-screen">
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Startup />}></Route>
                        <Route
                            path="/companion"
                            element={<Companion />}
                        ></Route>
                    </Routes>
                </BrowserRouter>
            </div>
        </>
    );
}

export default App;
