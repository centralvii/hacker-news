import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import News from './pages/News';
import NewsDetails from './pages/NewsDetails';
import Favorites from './pages/Favorites';
import styles from './styles/app.module.css';

const App: React.FC = () => {
    return (
        <Router>
            <div className={styles.app}>
                <Routes>
                    <Route path="/" element={<News />} />
                    <Route path="/news/:id" element={<NewsDetails />} />
                    <Route path="/favorites" element={<Favorites />} />{' '}
                </Routes>
            </div>
        </Router>
    );
};

export default App;
