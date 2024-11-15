import './App.css';
import axios from 'axios';
import { useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom'; 
import logoMarvel from './assets/logo/Group@2x.png';
import lupaIcone from './assets/busca/Lupa/Shape.png';
import heroiIcone from './assets/icones/heroi/noun_Superhero_2227044.png';
import iconeDireito from './assets/toggle/Group 2@2x.png';
import iconeEsquerdo from './assets/toggle/Group 6@2x.png';
import iconeCoracao from './assets/icones/heart/Path.png';
import iconeCoracaoVermelho from './assets/icones/heart/Path@1,5x.png';
import iconeCoracaoBranco from './assets/icones/heart/Path Copy 2.png';
import PersonagemDetalhes from './PersonagemDetalhes';

//https://gateway.marvel.com:443/v1/public/characters?apikey=d0d2ce9e8c4470ebb1d700c4f6ddc0cd
// public    d0d2ce9e8c4470ebb1d700c4f6ddc0cd
//privado     e1d76a4250ad3245380fd196569a82bd64072f6a
//  1e1d76a4250ad3245380fd196569a82bd64072f6ad0d2ce9e8c4470ebb1d700c4f6ddc0cd
// has: 4805f8d794c3b1a3894bae4c0dab3752 
// certo https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=d0d2ce9e8c4470ebb1d700c4f6ddc0cd&hash=4805f8d794c3b1a3894bae4c0dab3752
function App() {
  
const [personagens, setPersonagens] = useState ([]);
const [pesquisa, setPesquisa] = useState("");
const [iconeDireitoVisivel, setIconeDireitoVisivel] = useState(true);
//const [iconeCoracaoBrancoVisivel, setCoracaoBrancoVisivel] = useState(true);
const [favoritos, setFavoritos] = useState({});

useEffect(() => {
axios.get('https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=d0d2ce9e8c4470ebb1d700c4f6ddc0cd&hash=4805f8d794c3b1a3894bae4c0dab3752').then(res=>{
setPersonagens(res.data.data.results)
}).catch(error=>console.log(error))
},[])

const personagensFiltrados = personagens.filter(personagem =>
  personagem.name.toLowerCase().includes(pesquisa.toLowerCase())
);

const handlePesquisa = (event) => {
  setPesquisa(event.target.value);
};

const ordenarAZ = () => {
  setIconeDireitoVisivel(!iconeDireitoVisivel);

  const sorted = personagensFiltrados.sort((a, b) => a.name.localeCompare(b.name));
    setPersonagens(sorted);
}

const ordenarZA = () => {
  setIconeDireitoVisivel(!iconeDireitoVisivel);

  const sorted = personagensFiltrados.sort((a, b) => b.name.localeCompare(a.name));
  setPersonagens(sorted);
}

const adicionarFavorito = (id) => {
  //setCoracaoBrancoVisivel(!iconeCoracaoBrancoVisivel);
  setFavoritos(prev => ({
    ...prev,
    [id]: true,
  }));
}

const removerFavorito = (id) => {
  //setCoracaoBrancoVisivel(!iconeCoracaoBrancoVisivel);
  setFavoritos(prev => ({
    ...prev,
    [id]: false,
  }));
}

return (
<Router>
   <Routes>
      <Route
      path="/"
      element={
      <>
      <img src={logoMarvel} alt="Marvel" className="logo-marvel"/>
      <h1 className='titulo'>EXPLORE O UNIVERSO</h1>
      <p className='primeiro-paragrafo'>Mergulhe no domínio deslumbrante de todos os personagens clássicos que você ama - e aqueles que você ama descobrirá em breve!</p>
      <div className="campo-filtro">
         <img src={lupaIcone} alt="Lupa" className="icone-lupa" />
         <input
            type="text"
            placeholder="Pesquisar por heróis"
            className="input-pesquisa"
            value = {pesquisa}
            onChange={handlePesquisa}
            />
      </div>
      <div className="filtros">
         <div className="left">
            <h4 className="cinza-claro">Encontrados 20 heróis</h4>
         </div>
         <div className="right">
            <img src={heroiIcone} alt="heroi" className="icone-heroi"/>
            <span className="vermelho">Ordenar por nome - A/Z</span>
            
            {iconeDireitoVisivel ? (
              <img src={iconeDireito} onClick={ordenarZA} alt="heroi" className="icone-toggle-direito"/>
            ) : (
              <img src={iconeEsquerdo} onClick={ordenarAZ} alt="heroi" className="icone-toggle-esquerdo"/>  
            )}

            <img src={iconeCoracao} alt="heroi" className="icone-coracao"/>
            <span className="vermelho">Somente Favoritos</span>
         </div>
      </div>
      <div className="App">
         <div className="container">
            {personagensFiltrados.length > 0 ? (
            personagensFiltrados.map((per) => (
            <div className="cartao" key={per.id}>
               <Link to={`/personagem/${per.id}`} className="link-cartao">
               <img
                  src={`${per.thumbnail.path}.${per.thumbnail.extension}`}
                  alt="personagem"
                  className="imagem-cartao"
                  />
               <div className="detalhesPer">
                  <span className="nome-personagem">{per.name}</span>
               </div>
               </Link>
                  {favoritos[per.id] ? (
                     <img
                     src={iconeCoracaoVermelho}
                     alt="coracao"
                     className="icone-coracao-vermelho"
                     onClick={() => removerFavorito(per.id)}
                     />               

                  ) : (
                    <img
                    src={iconeCoracaoBranco}
                    alt="coracao"
                    className="icone-coracao-branco"
                    onClick={() => adicionarFavorito(per.id)}
                    />
                  )}
            </div>
            ))
            ) : (
            <p>Carregando personagens...</p>
            )}
         </div>
      </div>
      </>
      }
      />
      <Route path="/personagem/:id" element={
      <PersonagemDetalhes />
      } />
   </Routes>
   <footer className='footer'>
   </footer>
</Router>
);
}
export default App;