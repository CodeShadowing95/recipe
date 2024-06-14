/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { nofood } from "../assets"
import Navbar from "../components/Navbar"
import RecipeCard from "../components/RecipeCard"
import { fetchCategories } from "../services/category"
import { fetchUser } from "../utils"
import { fetchRecipes, fetchRecipesByCategory } from "../services/recipe"
import { RecipeDetail } from "../components"

const Feed = () => {
  const { result } = fetchUser()
  const [formCategoryData, setFormCategoryData] = useState({ name: '', user: result._id })
  const [recipeCategories, setRecipeCategories] = useState([])
  const [formRecipeData, setFormRecipeData] = useState({ title: '', description: '', picture: '', idCategory: recipeCategories?.length > 0 ? recipeCategories[0]._id : '', idMembre: result._id })
  const [recipesList, setRecipesList] = useState([])

  const [successMessage, setSuccessMessage] = useState("")
  const [selected, setSelected] = useState("discover")
  const [recipeId, setRecipeId] = useState("")
  const [detailRecipe, setDetailRecipe] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [toggleDropdown, setToggleDropdown] = useState(false)
  const [isTop, setIsTop] = useState(true)

  useEffect(() => {
    fetchCategories()
    .then(({ data }) => {
      setRecipeCategories(data)
      setFormRecipeData({ ...formRecipeData, idCategory: data[0]?._id })
    })
  }, [])

  const getRecipes = async () => {
    setSelected("discover")

    setIsLoading(true)
    fetchRecipes()
    .then((response) => {
      if (response.error) {
        console.log(response.error)
        return
      }
      
      let randomRecipes = response.data.sort(() => Math.random() - 0.5)
      setRecipesList(randomRecipes)
      setIsLoading(false)
    })
  }

  useEffect(() => {
    getRecipes()
  }, [recipesList.length])

  const getRecipesByCategory = async (category) => {
    setSelected(category?.name.toLowerCase())

    setIsLoading(true)
    await fetchRecipesByCategory(category._id)
    .then(({ data }) => {
      const randomRecipes = data.sort(() => Math.random() - 0.5)
      // console.log(randomRecipes);
      setRecipesList(randomRecipes)
      // setRecipesByCategories((prev) => [...prev, { categoryName: category.name, recipes: data }])
      setIsLoading(false)
    })
  }

  const emptyAll = () => {
    setFormCategoryData({ ...formCategoryData, name: '' })
    setFormRecipeData({ ...formRecipeData, title: '', description: '', picture: '', idCategory: recipeCategories?.length > 0 ? recipeCategories[0]._id : '' })
    setToggleDropdown(false)
    setOpenModal(false)
  }

  document.body.style.overflow = openModal ? 'hidden' : 'auto'

  const slideLeft = () => {
    let slider = document.getElementById("slider")
    slider.scrollLeft = slider.scrollLeft - 500
  }
  const slideRight = () => {
    let slider = document.getElementById("slider")
    slider.scrollLeft = slider.scrollLeft + 500
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setIsTop(false)
  }

  // Discard a modal when click outside
  const discardModalWhenClickOutside = (e) => {
    if (['root', 'modal', 'navbar', 'home'].includes(e.target.id)) {
      emptyAll()
    }
  }
  useEffect(() => {
    document.addEventListener("click", discardModalWhenClickOutside);
    return () => document.removeEventListener("click", discardModalWhenClickOutside);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 500) setIsTop(false)
      else setIsTop(true)
    })
  }, [])

  return (
    <div id="home" className="w-full h-full relative">
      {/* ------------------------------------------------------------------------------------------- Absolutes starts ------------------------------------------------------------------------------------------- */}
      {/* Success message */}
      <div className={`fixed bottom-8 right-4 flex items-center gap-1 rounded-lg bg-green-100 p-2 ${successMessage !== '' ? "translate-x-0" : "translate-x-[200%]"} transition-all duration-300 z-10`}>
        <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Star-Struck.png" alt="Star-Struck" className="w-10 h-10" />
        <p className="text-base text-green-600">{successMessage}</p>
        <div onClick={() => {}}>
          <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 cursor-pointer" width="15" height="15" viewBox="0 0 24 24"><path fill="#16a34a" d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z"/></svg>
        </div>
      </div>
      {/* To top button */}
      <div className={`fixed bottom-12 right-4 p-2 ${!isTop ? "translate-x-0" : "translate-x-[200%]"} flex justify-center items-center bg-orange-600 rounded-full cursor-pointer hover:bg-orange-700 transition-all duration-300 z-30`} onClick={scrollToTop}>
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" viewBox="0 0 24 24"><path fill="currentColor" d="m12 13.113l-4.246 4.24q-.14.141-.341.154t-.367-.153q-.16-.16-.16-.354t.16-.354l4.389-4.388q.13-.131.267-.184q.136-.053.298-.053t.298.053t.267.184l4.389 4.388q.14.14.153.341t-.153.367q-.16.16-.354.16t-.354-.16zm0-6l-4.246 4.24q-.14.141-.341.154t-.367-.153q-.16-.16-.16-.354t.16-.354l4.389-4.388q.13-.131.267-.184q.136-.053.298-.053t.298.053t.267.184l4.389 4.388q.14.14.153.342t-.153.366q-.16.16-.354.16t-.354-.16z"/></svg>
        <p className="text-white text-xs">Haut de page</p>
      </div>
      {/* Modal recipe detail */}
      <RecipeDetail detailId={detailRecipe} onSetDetail={setDetailRecipe} />
      {/* ------------------------------------------------------------------------------------------- Absolutes ends ------------------------------------------------------------------------------------------- */}


      <Navbar onSuccess={setSuccessMessage} />

      <div id="root" className="flex flex-col px-[72px] pt-9">
        <div className="w-full flex justify-between items-center">
          {/* Menu */}
          <div className="flex justify-center items-center gap-1 px-4 py-2 rounded-lg border hover:shadow-sm cursor-pointer text-sm transition-all duration-300 relative" onClick={() => setToggleDropdown(!toggleDropdown)}>
            En ce moment
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-700" viewBox="0 0 24 24"><path fill="currentColor" d="M12 14.708L6.692 9.4l.708-.708l4.6 4.6l4.6-4.6l.708.708z"/></svg>
            
            {/* Dropdown */}
            <div className={`absolute -bottom-3 left-0 w-[180px] bg-white border shadow-lg translate-y-full p-3 rounded-lg z-10 ${toggleDropdown ? 'block' : 'hidden'}`}>
              <div className="w-full flex justify-between items-center px-2 py-3 bg-gray-100 rounded-lg cursor-pointer">
                <p className="text-gray-700 text-xs font-semibold">En ce moment</p>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-700" viewBox="0 0 24 24"><path fill="currentColor" d="m10 16.4l-4-4L7.4 11l2.6 2.6L16.6 7L18 8.4z"/></svg>
              </div>
              <div className="w-full flex justify-between items-center px-2 py-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                <p className="text-gray-700 text-xs">Populaires</p>
              </div>
              <div className="w-full flex justify-between items-center px-2 py-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                <p className="text-gray-700 text-xs">Nouveautés</p>
              </div>
            </div>
          </div>

          {/* Category list */}
          <div className="max-w-[70%] relative">
            <div id="slider" className="flex overflow-x-auto gap-4">
              <div className={`flex justify-center items-center p-3 ${selected === 'discover' && 'bg-gray-100'} rounded-full cursor-pointer`} onClick={() => getRecipes()}>
                <p className={`text-gray-700 ${selected !== 'discover' && 'hover:text-gray-500'} text-[13px] font-semibold truncate`}>Découvertes</p>
              </div>
              {recipeCategories?.length > 0 && recipeCategories.map((category) => (
                <div key={category?.name} className={`flex justify-center items-center p-3 ${selected === category?.name.toLowerCase() && 'bg-gray-100'} rounded-full cursor-pointer`} onClick={() => getRecipesByCategory(category)}>
                  <p className={`text-gray-700 ${selected !== category?.name.toLowerCase() && 'hover:text-gray-500'} text-[13px] font-semibold truncate`}>{category?.name}</p>
                </div>
              ))}
            </div>

            {/* Right and Left arrows */}
            <div className="absolute inset-y-1/2 flex items-center -left-6 cursor-pointer transition-all" onClick={() => slideLeft()}>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-700" viewBox="0 0 24 24"><path fill="currentColor" d="m14 18l-6-6l6-6l1.4 1.4l-4.6 4.6l4.6 4.6z"/></svg>
            </div>
            <div className="absolute inset-y-1/2 flex items-center -right-6 cursor-pointer transition-all" onClick={() => slideRight()}>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-700 rotate-180" viewBox="0 0 24 24"><path fill="currentColor" d="m14 18l-6-6l6-6l1.4 1.4l-4.6 4.6l4.6 4.6z"/></svg>
            </div>
          </div>

          {/* Filter */}
          <div className="flex justify-center items-center gap-1 px-4 py-2 rounded-full border hover:shadow-sm cursor-pointer text-sm transition-all duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-700" viewBox="0 0 24 24"><path fill="currentColor" d="M10.558 17v-1h2.865v1zm-3.75-4.5v-1h10.365v1zM4 8V7h16v1z"/></svg>
            Filtrer
          </div>
        </div>

        {/* Recipes */}
        {isLoading ? (
          <div className="mt-10 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Array(12).fill(0).map((_, index) => (
              <div key={index} className="w-[320px] h-[370px] bg-gray-300 rounded-lg border pointer-events-none animate-pulse" />
            ))}
          </div>
        ) : (
          recipesList?.length > 0 ? (
            <div className="mb-10 mt-8 w-full grid gap-10" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
              {recipesList?.map((recipe, index) => (
                <div key={index}>
                  <RecipeCard recipe={recipe} onRecipe={setRecipeId} isSelected={recipeId === recipe?._id} onShowRecipe={setDetailRecipe} />
                </div>
              ))}
              </div>
            ) : (
              <div className="w-full h-[calc(100vh-230px)] mt-8 flex justify-center items-center">
                <div className="w-[350px] h-full flex flex-col justify-center items-center">
                  <img src={nofood} alt="no recipe" className="w-[200px] h-[200px" />
                  <p className="text-gray-700 font-bold text-xl mt-6">Pas de recettes pour le moment</p>
                  <p className="text-gray-400 text-sm max-w-[250px] text-center mt-2">Soyez le tout premier à nous faire découvrir vos créations.</p>
                  <div className="flex justify-between items-center gap-2 px-4 py-3 mt-8 bg-orange-600 rounded-full cursor-pointer" onClick={() => {}}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24"><path fill="#ffffff" d="M11 17h2v-4h4v-2h-4V7h-2v4H7v2h4zm1 5q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8"/></svg>
                    <p className="text-white text-xs font-semibold">Nouvelle recette</p>
                  </div>
                </div>
              </div>
            )
        )}
      </div>
    </div>
  )
}

export default Feed