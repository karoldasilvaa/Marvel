import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect} from 'react';
import logoMarvel from './assets/logo/Group@2x.png';
import lupaIcone from './assets/busca/Lupa/Shape.png';
import livroIcone from './assets/icones/book/Group.png';
import filmeIcone from './assets/icones/video/Shape.png';
import estrelaIcone from './assets/review/Path.png';
function PersonagemDetalhes() {
const { id } = useParams();
const [personagem, setPersonagem] = useState(null)
useEffect(() => {
document.body.classList.add('personagem-body');

axios.get('https://gateway.marvel.com:443/v1/public/characters/1009146?ts=1&apikey=d0d2ce9e8c4470ebb1d700c4f6ddc0cd&hash=4805f8d794c3b1a3894bae4c0dab3752').then(res=>{
setPersonagem(res.data.data.results[0])
}).catch(error=>console.log(error))
},[])
return (
<>
<div className='container-detalhe-personagens'>
   <div>
      <img src={logoMarvel} alt="Marvel" className="logo-marvel"/>
   </div>
   <div className="campo-filtro-personagem">
      <img src={lupaIcone} alt="Lupa" className="icone-lupa" />
      <input
         type="text"
         placeholder="Pesquisar por heróis"
         className="input-pesquisa-personagem"
         />
   </div>
</div>
<div className="personagem-detalhes">
   {personagem && (
   <>
   <div className='conteudo'>
        <div className='descricao'>
            <h1>{personagem.name}</h1>
            <p>{personagem.description || "Descrição não disponível."}</p>
            <table>
                <tr>
                    <th>
                    <p>Quadrinhos</p>
                    </th>
                    <th>
                    <p>Filmes</p>
                    </th>
                </tr>
                <tr>
                    <th><img src={livroIcone}/>
                    <span>3.000</span>
                    </th>
                    <th><img src={filmeIcone}/>
                    <span>3.000</span>
                    </th>
                </tr>
            </table>
            <div>
                <span>Rating: </span>         
                <img src={estrelaIcone}/>
                <img src={estrelaIcone}/>
                <img src={estrelaIcone}/>
                <img src={estrelaIcone}/>
                <img src={estrelaIcone}/>
            </div>
            <div>
                <p>Último quadrinho: 13 fev. 2020</p>
            </div>
        </div>
        <div className='img-personagem'>
            <img src={`${personagem.thumbnail.path}.${personagem.thumbnail.extension}`}/>
        </div>
   </div>
   </>
   )}
</div>
</>
);
}
export default PersonagemDetalhes;