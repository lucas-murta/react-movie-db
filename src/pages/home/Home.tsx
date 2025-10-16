import { useState, useEffect } from 'react'

const Home = () => {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    // Aqui será implementada a busca de filmes da API TMDB
    console.log('Home component mounted')
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        Explore Filmes
      </h1>
      
      <div className="text-center">
        <p className="text-lg text-gray-600 mb-8">
          Descubra os melhores filmes e crie suas listas personalizadas
        </p>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Em breve...</h2>
          <p className="text-gray-500">
            Integração com a API do The Movie Database (TMDB) será implementada aqui
          </p>
        </div>
      </div>
    </div>
  )
}

export default Home