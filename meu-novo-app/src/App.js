import './App.css';
import axios from 'axios';
import { useState, useEffect} from 'react';

//https://gateway.marvel.com:443/v1/public/characters?apikey=d0d2ce9e8c4470ebb1d700c4f6ddc0cd

// public    d0d2ce9e8c4470ebb1d700c4f6ddc0cd

//privado     e1d76a4250ad3245380fd196569a82bd64072f6a

//  1e1d76a4250ad3245380fd196569a82bd64072f6ad0d2ce9e8c4470ebb1d700c4f6ddc0cd

// has: 4805f8d794c3b1a3894bae4c0dab3752 

// certo https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=d0d2ce9e8c4470ebb1d700c4f6ddc0cd&hash=4805f8d794c3b1a3894bae4c0dab3752

function App() {

  console.log('123')

  const [personagens, setPersonagens] = useState ([])

  useEffect(() => {
    axios.get('https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=d0d2ce9e8c4470ebb1d700c4f6ddc0cd&hash=4805f8d794c3b1a3894bae4c0dab3752').then(res=>{
      setPersonagens(res.data.data.results)
      //ver se a api ta vindo os dados 
      console.log(res.data)
    }).catch(error=>console.log(error))
  },[])

  return (
  <>
    <h1>teste</h1>
    <div className="App">
      <div className="container">
        {personagens.length > 0 ? (
          personagens.map((per) => (
            <div className="card" key={per.id}>
              <img
                src={`${per.thumbnail.path}.${per.thumbnail.extension}`}
                alt="personagem"
                className="card-img"
              />
              <div className="detalhesPer">
                <h5 className="card-title">{per.name}</h5>
              </div>
            </div>
          ))
        ) : (
          <p>Carregando personagens...</p>
        )}
      </div>
    </div>
  </>
  );
}

export default App;
