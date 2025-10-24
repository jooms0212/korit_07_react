import './App.css'
import { useState, useEffect } from 'react';
import Movie from './components/Movie';

function App() {
  const [ loading, setLodading ] = useState(true);
  const [ movies, setMovies ] = useState([]);

  const getMovies = async () => {
    const response = await(`https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year`);
    const json = await response.json();
    console.log(json);
    setMovies(json.data.movies);
    setLodading(false);
  }

  useEffect(() => {
    getMovies();
  }, []);

// 이제 return 파트에서 Loading이 끝나면 Movie를 뿌릴겁니다.
  return (
    <div>
      {
        loading ? <h1>로딩 중... ⏰</h1> : <div>로딩 끝</div>
      }
    </div>
  )
}

export default App
