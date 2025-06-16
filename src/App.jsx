import { useState ,useEffect } from 'react'
import Spinner from './components/Spinner.jsx'

import Search from './components/Search.jsx'
import MovieCard from './components/MovieCard.jsx';

import { useDebounce } from 'react-use';
import { getTrending, updateSearchCount } from './appwrite.js';

const API_BASE_URL = 'https://api.themoviedb.org/3';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS ={
  method:'GET',
  headers:{
    accept: 'application/json',
     Authorization: `Bearer ${API_KEY}`
  }
}
function App() {
  const [search,setsearch]=useState('');
  const [errorMSG,setErrorMSG]=useState('');
  const [movieList,setMovieList]=useState([]);
  const [isLoading,setIsLoading]=useState(false);
  const [isTrend,setIsTrend]=useState([]);
  const [debounceSearchTerm,setDebounceSearchTerm]=useState('');
// this is use to prevent multuiple API request waiting 500ms
  useDebounce(()=>setDebounceSearchTerm( search),500,[ search ] );

  const fetchMovies = async(query = '') =>{
    setIsLoading(true);
    setErrorMSG('');
    try{
      const endpoint = query ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)} `:`${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endpoint, API_OPTIONS);

      if(!response.ok){
        throw new Error('failed to feth movies');
      }
      const data=await response.json();
      console.log(data);
      if(data.Response === 'False'){
        setErrorMSG(data.Error || "False  to fetch ");
        setMovieList([]);
        return;
      }
      setMovieList(data.results || []);
      
      if(query && data.results.length > 0){
        await updateSearchCount(query,data.results[0]);
      }

      }catch(error){
        console.log(`ERROR fetching :${error}`);
        setErrorMSG('ERROR fetching movies...Try again');
      }finally{
        setIsLoading(false);
      }
  }

  const loadTrend = async() =>{
    try{
      const movies= await getTrending();
      setIsTrend(movies);
    }catch(error){
      console.log(`Error fetching trending movies :${error}`);
    }
  }
  useEffect(
    ()=>{fetchMovies(debounceSearchTerm);},[debounceSearchTerm]
  );
  useEffect(
    ()=>{loadTrend();},[]
  );
  return (
    <main>
      <div className="pattern">
        <div className="wrapper">
          <header>
            <img src="./hero.png" alt="hero banner" />
            <h1>Find <span className="text-gradient">Movies</span> Without Any Hassel</h1>
            <Search searchTerm={search} setSearchTerm={setsearch}/>
          </header>

          {isTrend.length > 0 && (
            <section className="trending">
              <h2>Trending Movies</h2>
              <ul>
                {isTrend.map((movie,index)=>(
                  <li key={movie.$id}>
                    <p>{index+1}</p>
                    <img src={movie.poster_url} alt={movie.title} />
                  </li>    
                ))}
              </ul>
            </section>
          )}
          <section className="all-movies">
            <h2> All Movies</h2>
            {isLoading ? (<Spinner />): errorMSG ? ( <p className='text-white-500'>{errorMSG}</p>) : (
              <ul>
                {movieList.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </main>
  )
}

export default App
