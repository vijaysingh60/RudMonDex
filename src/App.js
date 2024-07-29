import React, { useEffect, useState } from "react";
import image from "./images/rudmondex.png"
import PokeCard from "./PokeCard";
import pokeball from "./images/pokeball.png"

function App() {

    const [allPoke,setallPoke] = useState([]);
    const [search,setSearch] = useState("");
    const [start,setStart] = useState(0);
    const pokeNum = 30;

  const pokeData = async ()=>{
    const data1 = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=-1`);
    let all = await data1.json();
    setallPoke(all.results)
  }
  useEffect(()=>{
    pokeData();
  },[])

    const serchedData = allPoke.filter((curPoke )=>
        curPoke.name.toLowerCase().includes(search.toLowerCase()));

  return (allPoke &&
    <div className="App bg-slate-400 h-full w-full flex flex-col items-center ">

        {/*NavBar*/}
        <div className=" w-full bg-[#E7E6D9] min-h-24 min-[490px]:flex">
            <div className="  left-4 flex justify-center">
                <img className="w-52 max-[490px]:w-40" src={image} alt="pokedex logo"></img>
            </div>

            <div className="flex  items-center justify-center max-[490px]:mb-3 w-full">
                <div className="bg-white rounded-full w-96 flex justify-center  p-2 ">
                    <img src={pokeball} className="w-10"/>
                    <input type="text" className="outline-none p-2 pl-4 h-10 w-64 sm:w-80 " placeholder="Search Pokemon"
                        value={search}
                        onChange={(e) =>{ 
                            setStart(0)
                            setSearch(e.target.value)}}
                    />
                </div>
            </div>
        </div>

        <div className="m-4 text-gray-800">
          {/* Pagination Buttons */}
          <div className="flex justify-center items-center mb-4">
              <button 
                  className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105" 
                  onClick={() => setStart(prev => prev - pokeNum < 0 ? 0 : prev - pokeNum)}
              >
                  Prev
              </button>
              <span className="mx-4 text-lg font-medium">{start / pokeNum + 1}/{Math.ceil(serchedData.length / pokeNum)}</span>
              <button 
                  className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105" 
                  onClick={() => setStart(prev => serchedData.length - prev > pokeNum ? prev + pokeNum : prev)}
              >
                  Next
              </button>
          </div>

          {/* Cards */}
          <div className="bg-white w-full p-4 rounded-lg shadow-lg flex flex-wrap justify-center gap-4">
              {pokeData && serchedData && serchedData.map((poke, index) => {
                  if (index >= start && index <= start + 29) {
                      return (
                          <PokeCard info={poke} key={index} />
                      );
                  }
                  return null;
              })}
          </div>

          {/* Pagination Buttons */}
          <div className="flex justify-center items-center mt-4">
              <button 
                  className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105" 
                  onClick={() => setStart(prev => prev - pokeNum < 0 ? 0 : prev - pokeNum)}
              >
                  Prev
              </button>
              <span className="mx-4 text-lg font-medium">{start / pokeNum + 1}/{Math.ceil(serchedData.length / pokeNum)}</span>
              <button 
                  className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105" 
                  onClick={() => setStart(prev => serchedData.length - prev > pokeNum ? prev + pokeNum : prev)}
              >
                  Next
              </button>
          </div>
        </div>
    </div>

  );
}

export default App;
