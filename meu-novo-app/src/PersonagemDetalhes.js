import React from 'react';
import { useParams } from 'react-router-dom';
import logoMarvel from './assets/logo/Group@2x.png';
import lupaIcone from './assets/busca/Lupa/Shape.png';

const PersonagemDetalhes = () => {
    const { id } = useParams();
    return (
        <>
        <img src={logoMarvel} alt="Marvel" className="logo-marvel"/>
        <h1 className='titulo'>EXPLORE O UNIVERSO</h1>
        <p className='primeiro-paragrafo'>Mergulhe no domínio deslumbrante de todos os personagens clássicos que você ama - e aqueles que você ama descobrirá em breve!</p>
        <div className="campo-filtro-personagem">
           <img src={lupaIcone} alt="Lupa" className="icone-lupa" />
           <input
              type="text"
              placeholder="Pesquisar por heróis"
              className="input-pesquisa-personagem"
              />
        </div>
        </>
    );
  };

  export default PersonagemDetalhes;