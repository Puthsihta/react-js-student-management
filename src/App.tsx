import './App.css'
import { Route, Routes } from 'react-router-dom'
import List from './components/List'
import Detail from './components/Detail'

function App() {
  return (
    <div className="m-0 p-0 bg-gray-500">
      <h1 className="sticky text-[3rem] font-bold text-center bg-gray-900 p-3 text-white top-0 w-full mb-3">
        CRUD
      </h1>
      {
        <Routes>
          <Route path="/" element={<List />} />
          <Route path="/detail/:id/:type" element={<Detail />} />
        </Routes>
      }
    </div>
  )
}

export default App
