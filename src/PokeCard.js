import { useEffect ,useState} from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';


function PokeCard({info}) {
  const [pokeData,setPokeData] = useState({})
  const [pokeInfo,setPokeInfo] = useState(false);

  const nothing = async ()=>{
    const data1 = await fetch(`https://pokeapi.co/api/v2/pokemon/${info.name}`);
    let all = await data1.json();
    setPokeData(all)
  }
  useEffect(()=>{
    nothing();
    
  },[info,pokeInfo])
  return (<>
      <Card onClick={() => setPokeInfo(true)} className='bg-gray-100 my-4 rounded-lg flex flex-col items-center w-64 shadow-lg transition-transform transform hover:scale-105'>
        {/* Placeholder for Image */}
        <div className='w-full h-68 bg-gradient-to-r from-rose-300 to-pink-300 rounded-t-lg flex items-center justify-center'>
            <Card.Img variant="top" className='w-52 ' src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/"+pokeData.id+".png"} />
        </div>

        <Card.Body className='p-4 text-center'>
            <Card.Title className='text-2xl text-pink-600 font-bold mb-2'>{info.name}</Card.Title>
            <div className='flex flex-wrap justify-center gap-2 mb-4'>
                {pokeData.types ? (
                    pokeData.types.map((obj, index) => (
                        <span key={index} className='bg-pink-500 text-white px-3 py-1 rounded-full shadow-md text-sm font-semibold'>
                            {obj.type.name}
                        </span>
                    ))
                ) : (
                    <span className='bg-gray-400 text-white px-3 py-1 rounded-full text-sm'>Loading...</span>
                )}
            </div>
            <div className='flex flex-col text-lg'>
                <span className='text-purple-600 font-medium mb-2'>Height: {pokeData.height}</span>
                <span className='text-orange-600 font-medium'>Weight: {pokeData.weight}</span>
            </div>
        </Card.Body>
    </Card>


      {/** Pokemon infomation */}

      <div onClick={() => setPokeInfo(false)} className={`${pokeInfo ? 'flex' : 'hidden'} fixed inset-0 w-full h-screen bg-mycolor flex items-center justify-center z-10`}>
        <div className="bg-slate-200 m-3 rounded-lg w-3/5 p-2 sm:p-6 shadow-lg">
            <h1 className="text-2xl sm:text-4xl text-pink-700 absolute left-1/2 transform -translate-x-1/2 capitalize "> {info.name}</h1>
            <div className="flex mt-10 sm:mt-12 space-x-6 sm:p-6">
                <div className="text-2xl text-pink-700 pb-2">
                    <img className="bg-rose-300 w-24 sm:w-36 md:w-48 lg:w-64 mb-4 rounded-lg shadow-md" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokeData.id}.png`} />
                    <h2 className="mb-3 sm:text-2xl">Type</h2>
                    {pokeData.types ? (
                        pokeData.types.map((obj, index) => (
                            <button key={index} className="mx-1 px-1 text-xl sm:text-2xl sm:px-3 py-1 my-1 sm:my-2 capitalize md:my-1 bg-pink-500 text-white rounded-full shadow-md">{obj.type.name}</button>
                        ))
                    ) : (
                        <button className="mx-1 px-3 py-1 bg-pink-500 text-white rounded-full shadow-md">Loading...</button>
                    )}
                </div>
                <div className="flex-grow bg-red-300 p-2 sm:p-2 md:p-6 rounded-lg w-64 sm:w-64 mx-1  shadow-md md:w-64">
                    {pokeData.stats && pokeData.stats.map((stat, index) => (
                        <h3 key={index} className=" mb-1 sm:mb-2 text-sm sm:text-base md:text-lg capitalize max-[420px]:text-xs">{stat.stat.name}: <span className="font-semibold ">{stat.base_stat}</span></h3>
                    ))}
                    <div>
                        <h1 className=" sm:mt-4 text-lg sm:text-xl font-bold">Abilities</h1>
                        {pokeData.abilities && pokeData.abilities.map((obj, index) => (
                            <h3 key={index} className=" -mt-2  sm:mt-2 text-sm  max-[420px]:text-xs sm:text-base md:text-lg capitalize">{obj.ability.name}</h3>
                        ))}
                    </div>
                </div>
            </div>
        </div>
      </div>



    </>
  );
}

export default PokeCard;