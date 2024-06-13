/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { fetchRecipes } from "../services/recipe"
import { fetchUser } from "../utils"

const RecipesList = ({ recipeId }) => {
  const [suggestions, setSuggestions] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const { result: user } = fetchUser()

  useEffect(() => {
    setIsLoading(true)

    fetchRecipes()
    .then((res) => {
      if (res.error) {
        console.log(res.error)
        return
      }

      const randomDatas = res.data.filter((r) => r.idMembre._id !== user._id).filter((r) => r._id !== recipeId)

      setSuggestions(randomDatas.sort(() => Math.random() - 0.5).slice(0, 5))

      setIsLoading(false)
    })
  }, [recipeId, user._id])

  return (
    <div className="w-full flex flex-col gap-4 py-4 mt-12">
      <p className="text-base font-bold">Vous pourriez aussi aimer...</p>
      {isLoading ? (
        <div className="grid gap-12" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))' }}>
          {/* Example card */}
          <div className="flex gap-4 h-[270px] bg-gray-200 rounded-md animate-pulse"></div>
          <div className="flex gap-4 h-[270px] bg-gray-200 rounded-md animate-pulse"></div>
          <div className="flex gap-4 h-[270px] bg-gray-200 rounded-md animate-pulse"></div>
          <div className="flex gap-4 h-[270px] bg-gray-200 rounded-md animate-pulse"></div>
          <div className="flex gap-4 h-[270px] bg-gray-200 rounded-md animate-pulse"></div>
          <div className="flex gap-4 h-[270px] bg-gray-200 rounded-md animate-pulse"></div>
        </div>
      ) : (
        suggestions.length === 0 ? (
          <p className="text-gray-400 italic">Aucune suggestion de recettes à proposer</p>
        ) : (
          <div className="grid gap-12" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))' }}> 
            {suggestions.map((recipe, index) => (
              <div key={index} className="w-full h-[270px] flex flex-col gap-1 rounded-md cursor-pointer group">
                <div className="w-full h-[230px] rounded-t-md relative">
                  <img src={recipe.picture} alt="recipe" className="w-full h-full object-cover rounded-md" />
                  <div className="absolute bottom-0 inset-x-0 h-[80px] bg-gradient-to-t from-black/80 to-transparent p-4 rounded-b-md opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="w-full h-full flex justify-between items-center">
                      <p className="text-white font-semibold text-lg max-w-[200px] truncate">{recipe.title}</p>
                      <div className="flex justify-center items-center gap-3">
                        <div className="w-[40px] h-[40px] rounded-full flex bg-white transition-all">
                          <svg xmlns="http://www.w3.org/2000/svg" className="m-auto w-[20px] h-[20px] text-gray-700 hover:text-gray-500" viewBox="0 0 24 24"><path fill="currentColor" d="M12 20.325q-.35 0-.712-.125t-.638-.4l-1.725-1.575q-2.65-2.425-4.788-4.812T2 8.15Q2 5.8 3.575 4.225T7.5 2.65q1.325 0 2.5.562t2 1.538q.825-.975 2-1.537t2.5-.563q2.35 0 3.925 1.575T22 8.15q0 2.875-2.125 5.275T15.05 18.25l-1.7 1.55q-.275.275-.637.4t-.713.125M11.05 6.75q-.725-1.025-1.55-1.563t-2-.537q-1.5 0-2.5 1t-1 2.5q0 1.3.925 2.763t2.213 2.837t2.65 2.575T12 18.3q.85-.775 2.213-1.975t2.65-2.575t2.212-2.837T20 8.15q0-1.5-1-2.5t-2.5-1q-1.175 0-2 .538T12.95 6.75q-.175.25-.425.375T12 7.25t-.525-.125t-.425-.375m.95 4.725"/></svg>
                        </div>
                        <div className="w-[40px] h-[40px] rounded-full flex bg-white transition-all">
                          <svg xmlns="http://www.w3.org/2000/svg" className="m-auto w-[20px] h-[20px] text-gray-700 hover:text-gray-500" viewBox="0 0 24 24"><path fill="currentColor" d="M5 21V5q0-.825.588-1.412T7 3h10q.825 0 1.413.588T19 5v16l-7-3zm2-3.05l5-2.15l5 2.15V5H7zM7 5h10z"/></svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full flex items-center h-[40px] rounded-t-md">
                  <img src={recipe.idMembre.avatar} alt="avatar" className="w-[30px] h-[30px] rounded-full" />
                  <p className="text-gray-700 text-sm font-semibold ml-2">{recipe.idMembre.firstname} {recipe.idMembre.lastname}</p>
                </div>
              </div>
            ))}
          </div>
      ))}
    </div>
  )
}

export default RecipesList