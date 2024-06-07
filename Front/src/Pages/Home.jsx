/* eslint-disable react/prop-types */
import { Route, Routes } from "react-router-dom"
import { Feed, Recipe } from "../Pages"

const Home = () => {

  return (
    <main className="w-full h-full">
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/feed" exact element={<Feed />} />
        <Route path="/recipe/:id" element={<Recipe />} />
      </Routes>
    </main>
  )
}

export default Home