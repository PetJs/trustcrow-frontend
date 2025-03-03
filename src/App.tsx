import { useState } from 'react';
import { SearchIcon, Loader } from 'lucide-react';
import { SearchData } from './utils/types';
import Logo from "./assets/movieroll1.png"
import api from './utils/axios';
import './App.css';

function App() {
  const [searchData, setSearchData] = useState<SearchData[] | null>(null); 
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>("");

  const search = async () => {
    setLoading(true);
    try {
      const response = await api.get("/", { 
        params: { s: query } 
      });
      console.log(response.data); 
      if (response.data.Search) {
        setSearchData(response.data.Search); 
        setQuery("");
      } else {
        setSearchData([]);  
        setError("Sorry, No Movie Found. Check if your spelling is correct.");
      }
    } catch (error) {
      console.error("Error fetching search data:", error);
      setError("Something went wrong. Please try again later.")
    }finally{
      setLoading(false);
    }
  };


  return (
    <>
      <div className="bg-[#000] text-white min-h-screen">
        <header className="p-4">
          <nav className="flex justify-between items-center">
            <div className='flex items-center'>
              <img src={Logo} alt="movie-logo" className='text-xl md:w-24 w-12'/>
              <h1 className='md:text-3xl text-sm font-bold'>TrustCrow Frontend</h1>
            </div>
            
            <div className="flex gap-2">
              <button className='bg-gray-700 rounded-full md:px-4 px-2  md:h-12 h-8'>SignIn</button>
              <button className='bg-gray-700 rounded-full md:px-4 px-2 md:h-12 h-8'>Register</button>
            </div>
          </nav>

          {/* Search Bar */}
          <div className="relative w-64 m-2 mt-4">
            <input
              type="text"
              placeholder="Search..."
              value={query} 
              onChange={(e) => setQuery(e.target.value)} 
              className="bg-gray-700 text-white rounded-full p-2 w-full pr-10"
            />
            <button
              onClick={search}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
            >
              <SearchIcon className="w-6 h-6 text-white" />
            </button>
          </div>
        </header>

        <div className='text-center'>
          <h2 className='text-2xl bg-gradient-to-r from-black via-gray-500 to-white text-transparent bg-clip-text font-bold animate-gradient'>Search for a movie, discover a masterpiece!</h2>
        </div>

        {/* Search Results */}
        <div className="p-4">
          {loading ? (
            <Loader className='animate-spin mx-auto'/>
          ): searchData && searchData.length > 0 ? (
            <div className="grid md:grid-cols-4 grid-cols-2 gap-2 place-items-center ">
              {searchData.map((item, index) => ( 
                <div key={index} className="p-4 rounded flex flex-col justify-center items-center">
                  <img src={item.Poster} alt={item.Title} className='rounded-lg md:h-92 h-72' />
                  <h3 className="md:text-lg text-sm font-bold">{item.Title}</h3>
                  <p className="text-sm">{item.rating}</p>
                  <p className="text-sm">{item.Year}</p>
                </div>
              ))}
            </div>
          ) : (
            error && ( 
              <p className="text-center mt-4">
                Sorry, No Movie Found. Check if your spelling is correct
              </p>
            )
          )}
        </div>
      </div>
    </>
  );
}

export default App;
