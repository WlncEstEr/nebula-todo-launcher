import { Dot } from 'lucide-react'
import './App.css'
import { Header } from './components/UI/Header'
import { MainGames } from './components/UI/Main/MainGames'
import { Recommendation } from './components/UI/Main/Recommendation'
import { gamesData } from './data/games.data'
import { ItemGame } from './store/store'

function App() {
  const { selectedGameId } = ItemGame()

  const game = gamesData.find((g) => g?.id === selectedGameId && !g.isBuy)
  return (
    <div className="grid grid-rows-[4fr_3fr_1fr] bg-bg rounded-r-3xl ">
      <div className="relative">
        <div
          style={{
            backgroundImage: `url('${game?.image}')`
          }}
          className="mask-b-from-20% mask-b-to-85% blur-sm bg-top bg-no-repeat bg-cover rounded-tr-3xl text-white w-full h-full"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-linear-to-t from-bg/80 to-transparent" />
        <div className="absolute top-0 left-0 w-full h-full bg-linear-to-r from-bg/60 via-transparent to-bg/40 rounded-r-3xl" />
        <div className="absolute top-0 left-0 w-full h-full bg-linear-to-l from-bg/60 via-transparent to-bg/40 rounded-r-3xl" />
        <div className="px-10 py-12 flex flex-col gap-5 text-white absolute top-0 left-0 w-full ">
          <Header />
          <MainGames />
        </div>
      </div>

      <div className="overflow-hidden">
        <h1 className="text-2xl font-bold">For you</h1>
        <Recommendation />
      </div>

      <div className="flex items-end text-2xl font-bold h-full font-montserrat">
        <div className="items-center flex">
          <Dot size={50} /> Sponsored
        </div>
      </div>
    </div>
  )
}

export default App
