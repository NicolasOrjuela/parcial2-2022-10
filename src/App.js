import { LOCALES } from './i18n/locales';
import React, { useState } from 'react';
import { IntlProvider } from 'react-intl';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import messages from './i18n/messages';
import { NavBar } from './shared/components/NavBar';
import { PokemonList } from './pages/pokemon-list/PokemonList';
import  PokemonChart  from './pages/pokemon-chart/PokemonChart';
import './App.scss';

function App() {
  const localLang = navigator.language;

let language;
if (localLang === "en") {
  language = LOCALES.ENGLISH;
} else {
  language = LOCALES.SPANISH;
}
  //const [language, setLanguage] = useState(LOCALES.SPANISH);
  return (
    <>
      <IntlProvider locale={language} messages={messages[language]}>
        <Router>
          <NavBar></NavBar>
          <Routes>
            <Route exact path='/' element={<PokemonList></PokemonList>} />
            <Route exact path='/report' element={<PokemonChart></PokemonChart>} />
            <Route
              path='*'
              element={
                <main style={{ padding: '1rem' }}>
                  <p>There's nothing here!</p>
                </main>
              }
            />
          </Routes>
        </Router>
      </IntlProvider>
    </>
  );
}

export default App;
