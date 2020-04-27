import React , {useState,useEffect}from "react";
import api from './services/api'


import "./styles.css";

function App() {
  const [repositories,setRepositories] = useState([]);

  useEffect(()=>{
    api.get('/repositories').then(response =>{
      setRepositories(response.data);
      console.log(response.data);
    });
  },[]);

  async function handleAddRepository() {
    const response = await api.post('/repositories',
      {
        "title":`Novo Repositorio ${Date.now()}`,
	      "url":`http://reactjs.com.br/${Date.now()}`,
	      "techs":["node","php"]
      }
    );
      const value_add = response.data;
      setRepositories([...repositories,value_add]);
  }

  async function handleRemoveRepository(id) {
   
    const response = await api.delete(`/repositories/${id}`);
    if(response.status = 204){
      const filter = repositories.filter((repository) => repository.id !== id);
      setRepositories([...filter], [response.data]);
    }
    
   
  }

  return (
    <>

<ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={String(repository.id)}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </>
  );
}

export default App;
