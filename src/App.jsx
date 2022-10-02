import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Nav, Home, Chaos, Relativity } from './components';

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <header>
                    <Nav />
                </header>
                <Routes>
                    <Route index element={<Home />} />
                    <Route path="/chaos" element={<Chaos />} />
                    <Route path="/relativity" element={<Relativity />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
