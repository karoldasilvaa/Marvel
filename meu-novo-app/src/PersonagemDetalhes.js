import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect} from 'react';
import logoMarvel from './assets/logo/Group.png';
import lupaIcone from './assets/busca/Lupa/Shape.png';
import livroIcone from './assets/icones/book/Group.png';
import filmeIcone from './assets/icones/video/Shape.png';
import estrelaIcone from './assets/review/Path.png';

function PersonagemDetalhes() {
    const { id } = useParams();
    const [personagem, setPersonagem] = useState(null);

    useEffect(() => {
        axios.get(`https://gateway.marvel.com:443/v1/public/characters/${id}?ts=1&apikey=d0d2ce9e8c4470ebb1d700c4f6ddc0cd&hash=4805f8d794c3b1a3894bae4c0dab3752`)
            .then(res => {
                setPersonagem(res.data.data.results[0]);
                console.log(res.data.data.results[0].comics.items);
            })
            .catch(error => console.log(error));
    }, [id]);

    return (
        <>
            <div className="bg-azul-claro">
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
                                        <tbody>
                                        <tr>
                                            <th>
                                                <p>Quadrinhos</p>
                                            </th>
                                            <th>
                                                <p>Filmes</p>
                                            </th>
                                        </tr>
                                        <tr>
                                            <th><img src={livroIcone}/><span>3.000</span></th>
                                            <th><img src={filmeIcone}/><span>3.000</span></th>
                                        </tr>
                                        </tbody>
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
                                    <img src={`${personagem.thumbnail.path}.${personagem.thumbnail.extension}`} />
                                </div>
                            </div>

                            <div className="container-lancamento">
                                <h2>Últimos Lançamentos</h2>
                                <div className="cartoes-lancamento">
                                    {personagem.comics.items.map((item) => (
                                        <div className="cartao-lancamento" key={item.name}>
                                            <img
                                                src={`${personagem.thumbnail.path}.${personagem.thumbnail.extension}`}
                                                alt="personagem"
                                                className="imagem-lancamento"
                                            />
                                            <div>
                                                <span className="nome-personagem-lancamento">{item.name}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
            
        </>
    );
}

export default PersonagemDetalhes;
