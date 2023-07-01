import { useEffect, useState } from "react"
import { AiOutlineSearch } from "react-icons/ai"
import { TiLocation } from "react-icons/ti"
import {FaWind} from "react-icons/fa"
import {WiHumidity} from "react-icons/wi"
import {MdVisibility} from "react-icons/md"
import {TbGauge} from "react-icons/tb"
import Loading from "./Loading"

const Container = () => {
  const [emptyContent, setEmptyContent] = useState(false)
  const [data, setData] = useState([])
  const [weatherImg, setWeatherImg] = useState('')
  const [onLoad, setOnLoad] = useState(false)
  useEffect(() => {
    generateImg()
  }, [data])

  useEffect(() => {
    setEmptyContent(true)
  }, [])
  

  const fetchData = async (e) => {
    e.preventDefault()
    setOnLoad(true)
    try {
      const search = e.target[0].value
      const apiKey = "5223a2e60309c9fee108c457fcbdb5fc"
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${apiKey}`)
      const result = await response.json()
      setOnLoad(false)
      setData(result)
    } catch (error) {
      console.log(error)
    }
  } 
  const generateImg = () => {
    switch (data.weather && data.weather[0].main) {
      case "Clear":
        setWeatherImg('../src/assets/clear.png')
        break;
      case "Clouds":
        setWeatherImg('../src/assets/cloud.png')
        break;
      case "Mist":
        setWeatherImg('../src/assets/mist.png')
        break;
      case "Rain":
        setWeatherImg('../src/assets/rain.png')
        break;
      case "Snow":
        setWeatherImg('../src/assets/snow.png')
        break;
      default:
        setWeatherImg('')
        break;
    }
  }


  return (
    <div className={`${emptyContent ? "h-[75px] " : "h-[650px]"}  duration-500 ease-out bg-white  w-[500px] rounded-2xl px-8 py-4 overflow-hidden`}>
      <form onSubmit={fetchData} className="flex items-center justify-between">
        <TiLocation className="text-3xl" />
        <div className="w-full px-8">
          <input type="text" placeholder="Enter Your Location" className="w-full px-4 py-2 text-xl font-bold text-black/70 border border-slate-100 outline-none rounded" />
        </div>
        <button className="text-2xl cursor-pointer hover:text-white bg-slate-100 hover:bg-blue-500 duration-300 p-2 rounded-full " onClick={() => setEmptyContent(false)}>
          <AiOutlineSearch />
        </button>
      </form>
      {!emptyContent ?
      <>
        {onLoad ? <Loading/> : null}
        {data.cod == 200 ? 
        <>
          <div className="flex flex-col items-center gap-y-6 relative">
            <img src={weatherImg ? weatherImg : ''} alt="weather" className={`${weatherImg ? 'w-56' : 'hidden'}`} />
            <div className="relative">
              <span className="text-4xl font-bold">{parseInt(data.main?.temp - 273.15)}</span>
              <span className="absolute -top-2 -right-6 text-2xl font-bold">°C</span>
            </div>
            <span className="text-2xl font-medium text-slate-700 capitalize">{data.weather ? data.weather[0].description : '' }</span>
            <span className="absolute right-0 top-5 font-medium text-xl">{data.name ? data.name : ''}, {data.sys.country ? data.sys.country : ''}</span>
          </div>
          <div className="grid grid-cols-2 place-items-center">

            <div className="flex items-center gap-2 mt-8">
              <WiHumidity className="text-4xl" />
              <div className="flex flex-col gap-y- text-xl font-semibold">
                <span>{data.main?.humidity} %</span>
                <span>Humidity</span>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-8">
              <FaWind className="text-4xl" />
              <div className="flex flex-col gap-y- text-xl font-semibold">
                <span>{data.wind?.speed} m/s</span>
                <span>Wind Speed</span>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-8">
              <MdVisibility className="text-4xl" />
              <div className="flex flex-col gap-y- text-xl font-semibold">
                <span>{data.visibility / 1000} km</span>
                <span>Visibility</span>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-8">
              <TbGauge className="text-4xl" />
              <div className="flex flex-col gap-y- text-xl font-semibold">
                <span>{data.main?.pressure} hPa</span>
                <span>Pressure</span>
              </div>
            </div>
          </div>
        </>
        :
        <h1 className="text-2xl m-8 font-medium capitalize">{data.message}..</h1>
        }
      </>
      :
        null
      }
    </div>
  )
}

export default Container