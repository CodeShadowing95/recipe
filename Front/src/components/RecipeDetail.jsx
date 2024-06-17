/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { fetchRecipe, fetchRecipes } from "../services/recipe"
import Socials from "./Socials"
import RecipesList from "./RecipesList"
import { fetchUser } from "../utils"
import { Comment } from "../components"
import { addComment, fetchCommentsByRecipe } from "../services/comment"

const isVowel = (char) => ['a', 'e', 'i', 'o', 'u'].includes(char.toLowerCase())

const RecipeDetail = ({ detailId, onSetDetail }) => {
  const { result: user } = fetchUser()
  const [showDetail, setShowDetail] = useState("")
  const [recipeData, setRecipeData] = useState({})
  const [myRecipes, setMyRecipes] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [tempRating, setTempRating] = useState(1)
  const [isRated, setIsRated] = useState(false)
  const [success, setSuccess] = useState(false)
  const [commentForm, setCommentForm] = useState({ content: '', note: 0, author: user._id, idRecipe: "" })
  const [comments, setComments] = useState([])
  const [commentsLoading, setCommentsLoading] = useState(false)

  document.body.style.overflow = showDetail ? 'hidden' : 'auto'

  const discardDetail = () => {
    setShowDetail("")
    setCommentForm({ content: '', note: 0, author: user._id, idRecipe: detailId })
    closeSidebar()

    setTimeout(() => {
      onSetDetail("")
    }, 1000)
  }

  const closeSidebar = () => {
    setIsSidebarOpen(false)
    setCommentForm({ content: '', note: 0, author: user._id, idRecipe: detailId })
    setIsRated(false)
  }

  const handleRating = (value) => {
    setCommentForm({ ...commentForm, note: value })
    setTempRating(value)
  }

  const submitComment = async (e) => {
    e.preventDefault()

    if(commentForm.note === 0) {
      setTempRating(0)
      return
    }

    // console.log(commentForm);
    await addComment(commentForm)
    .then((response) => {
      if (response?.error) {
        console.log(response.error);
        return;
      }

      setSuccess(true)
      console.log("Comment added successfully");

      setTimeout(() => {
        setSuccess(false)
      }, 3000)
    })
  }

  useEffect(() => {
    setShowDetail(detailId)

    setIsLoading(true)
    fetchRecipe(detailId)
      .then((response) => {
        if (response?.error) {
          console.log(response.error);
          return;
        }

        setRecipeData(response.data)
        setCommentForm({ ...commentForm, idRecipe: response.data._id })
        setIsLoading(false)
      })
  }, [detailId])

  useEffect(() => {
    const fetchMyRecipes = async () => {
      const response = await fetchRecipes()
      if (response?.error) {
        console.log(response.error);
        return;
      }
      
      const randomData = response.data.filter((recipe) => recipe.idMembre._id === user._id).filter((recipe) => (recipe._id !== detailId)).sort(() => Math.random() - 0.5)
      // console.log(randomData);
      setMyRecipes(randomData)
    }

    fetchMyRecipes()
  }, [user._id, detailId])

  useEffect(() => {
    setCommentsLoading(true)
    fetchCommentsByRecipe(detailId)
    .then((response) => {
      if (response?.error) {
        console.log(response.error);
        return;
      }
      
      // console.log(response.data);
      const myComments = response.data.filter((comment) => comment.author._id === user._id)
      console.log(myComments);
      if (myComments.length > 0) {
        setCommentForm({ ...commentForm, note: myComments[0].note })
        setIsRated(true)
      }
      setComments(response.data)
      setCommentsLoading(false)
    })
  }, [detailId])

  const scrollLeft = () => {
    document.getElementById("slider").scrollLeft -= 500
  }
  const scrollRight = () => {
    document.getElementById("slider").scrollLeft += 500
  }

  // Discard a modal when click outside
  const discardModalWhenClickOutside = (e) => {
    if (e.target.id === "modal") {
      discardDetail()
    }
  }
  useEffect(() => {
    document.addEventListener("click", discardModalWhenClickOutside);
    return () => document.removeEventListener("click", discardModalWhenClickOutside);
  }, []);

  return (
    // Overlay
    <div id="modal" className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-30 ${!showDetail ? 'opacity-0 delay-200 pointer-events-none' : 'opacity-100'} transition-opacity duration-300 ease-in-out`}>
      {/* Close button */}
      <div className="absolute top-3 right-4 cursor-pointer" onClick={discardDetail}>
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>

      {/* Content */}
      <div className={`relative bg-white w-full h-[calc(100vh-2rem)] rounded-t-xl mt-14 overflow-auto ${!showDetail ? 'translate-y-full' : 'translate-y-0'} transition-all duration-500`}>
        {/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */}
        {!isLoading && (
          <div className={`absolute inset-y-1/2 right-5 z-10 ${isSidebarOpen ? 'scale-0' : 'scale-100'} transition-all duration-200`}>
            <div className="flex flex-col gap-4">
              <div className="bg-white rounded-full shadow p-2.5 border cursor-pointer" onClick={() => setIsSidebarOpen(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="m-auto w-5 h-5 text-black" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 1 0-9-9c0 1.488.36 2.89 1 4.127L3 21l4.873-1c1.236.639 2.64 1 4.127 1"/></svg>
              </div>
              <div className="bg-white rounded-full shadow p-2.5 border cursor-pointer" onClick={() => alert("Saved")}>
                <svg xmlns="http://www.w3.org/2000/svg" className="m-auto w-5 h-5 text-black" viewBox="0 0 24 24"><path fill="currentColor" d="M18.002 21.5q-1.04 0-1.771-.73q-.731-.728-.731-1.77q0-.2.035-.413q.034-.214.103-.402l-7.742-4.562q-.367.414-.854.645Q6.556 14.5 6 14.5q-1.042 0-1.77-.728q-.73-.729-.73-1.77t.73-1.771T6 9.5q.556 0 1.042.232q.487.231.854.645l7.742-4.562q-.069-.188-.103-.402Q15.5 5.2 15.5 5q0-1.042.729-1.77q.728-.73 1.769-.73t1.771.729t.731 1.769t-.73 1.771Q19.042 7.5 18 7.5q-.556 0-1.042-.232q-.487-.231-.854-.645l-7.742 4.562q.069.188.103.4q.035.213.035.411t-.035.415t-.103.404l7.742 4.562q.367-.414.854-.645q.486-.232 1.042-.232q1.042 0 1.77.729q.73.728.73 1.769t-.728 1.771t-1.77.731"/></svg>
              </div>
              <div className="bg-white rounded-full shadow p-2.5 border cursor-pointer" onClick={() => alert("Saved")}>
                <svg xmlns="http://www.w3.org/2000/svg" className="m-auto w-5 h-5 text-black" viewBox="0 0 24 24"><path fill="currentColor" d="M11.5 16.5h1V11h-1zm.5-6.923q.262 0 .438-.177q.177-.177.177-.438q0-.262-.177-.439q-.176-.177-.438-.177t-.438.177t-.177.439t.177.438q.176.177.438.177M12.003 21q-1.866 0-3.51-.708q-1.643-.709-2.859-1.924t-1.925-2.856T3 12.003t.708-3.51t1.924-2.859t2.856-1.925T11.997 3t3.51.708t2.859 1.924t1.925 2.856t.709 3.509t-.708 3.51t-1.924 2.859t-2.856 1.925t-3.509.709M12 20q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8"/></svg>
              </div>
            </div>
          </div>
        )}
        {/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */}

        <div className="w-full">
          {isLoading ? (
            <>
              <div className="w-full h-8 bg-gray-300 rounded-md animate-pulse" />
              <div className="w-full flex gap-2 mt-6">
                <div className="w-8 h-8 bg-gray-300 rounded-full animate-pulse" />
                <div className="w-full flex flex-col justify-center gap-2">
                  <div className="w-full h-4 bg-gray-300 rounded-md animate-pulse" />
                  <div className="w-1/2 h-4 bg-gray-300 rounded-md animate-pulse" />
                </div>
              </div>
              <div className="w-full h-[calc(100vh-2rem)] mt-8 bg-gray-300 rounded-md animate-pulse" />
            </>
          ) : (
            <div className="flex">
              <div className={`${isSidebarOpen ? 'w-[calc(100%-390px)] px-10' : 'w-full'} flex flex-col items-center py-[64px] relative transition-all duration-300`}>
                <div className="w-full bg-white">
                  <div className="flex flex-col max-w-6xl m-auto px-4 mb-2">
                    <h1 className="text-[26px] leading-8 font-extrabold mb-1">{recipeData.title}</h1>
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-gray-500">{recipeData.idCategory?.name}</p>
                      <div className="w-1 h-1 rounded-full bg-gray-500" />
                      {/* Stars */}
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-yellow-500 -ml-0.5" viewBox="0 0 24 24"><path fill="currentColor" d="m7.325 18.923l1.24-5.313l-4.123-3.572l5.431-.47L12 4.557l2.127 5.01l5.43.47l-4.122 3.572l1.24 5.313L12 16.102z"/></svg>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-yellow-500 -ml-0.5" viewBox="0 0 24 24"><path fill="currentColor" d="m7.325 18.923l1.24-5.313l-4.123-3.572l5.431-.47L12 4.557l2.127 5.01l5.43.47l-4.122 3.572l1.24 5.313L12 16.102z"/></svg>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-yellow-500 -ml-0.5" viewBox="0 0 24 24"><path fill="currentColor" d="m7.325 18.923l1.24-5.313l-4.123-3.572l5.431-.47L12 4.557l2.127 5.01l5.43.47l-4.122 3.572l1.24 5.313L12 16.102z"/></svg>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-yellow-500 -ml-0.5" viewBox="0 0 24 24"><path fill="currentColor" d="m7.325 18.923l1.24-5.313l-4.123-3.572l5.431-.47L12 4.557l2.127 5.01l5.43.47l-4.122 3.572l1.24 5.313L12 16.102z"/></svg>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-yellow-500 -ml-0.5" viewBox="0 0 24 24"><path fill="currentColor" d="m15.15 16.85l-.825-3.6l2.775-2.4l-3.65-.325l-1.45-3.4v7.8zm-7.825 2.073l1.24-5.313l-4.123-3.572l5.431-.47L12 4.557l2.127 5.01l5.43.47l-4.122 3.572l1.24 5.313L12 16.102z"/></svg>
                      </div>
                      <p className="text-[13px] font-bold text-gray-700 uppercase">0 commentaires / 0 like(s)</p>
                    </div>
                  </div>
                </div>

                <div className="sticky top-0 w-full bg-white z-50">
                  <div className="flex flex-col max-w-6xl m-auto px-4 mb-2">
                    <div className="flex justify-between items-center py-4 mx-auto gap-10 bg-white w-full">
                      {/* Left side */}
                      <div className="flex items-center gap-3">
                        {/* Image */}
                        <div className="flex w-12 h-12 rounded-full">
                          <img src={recipeData.idMembre?.avatar} alt="userprofile" className="w-full h-full object-contain rounded-full" />
                        </div>
                        <div className="flex flex-col gap-1">
                          <p className="text-sm font-semibold">{recipeData.idMembre?.firstname} {recipeData.idMembre?.lastname}</p>
                          <p className="text-xs font-light text-gray-700">Dernière modification le 14 Juin 2022</p>
                        </div>
                      </div>

                      {/* Right side */}
                      <div className="flex items-center gap-3">
                        <div className="bg-white rounded-full shadow p-2.5 border" onClick={() => alert("Liked")}>
                          <svg xmlns="http://www.w3.org/2000/svg" className="m-auto w-5 h-5 text-black" viewBox="0 0 24 24"><path fill="currentColor" d="m12 19.654l-.758-.685q-2.448-2.236-4.05-3.829t-2.529-2.808t-1.295-2.201T3 8.15q0-1.908 1.296-3.204T7.5 3.65q1.32 0 2.475.675T12 6.288Q12.87 5 14.025 4.325T16.5 3.65q1.908 0 3.204 1.296T21 8.15q0 .996-.368 1.98t-1.295 2.202t-2.52 2.808t-4.06 3.83zm0-1.354q2.4-2.17 3.95-3.716t2.45-2.685t1.25-2.015T20 8.15q0-1.5-1-2.5t-2.5-1q-1.194 0-2.204.682t-1.808 2.053h-.976q-.818-1.39-1.818-2.063q-1-.672-2.194-.672q-1.48 0-2.49 1T4 8.15q0 .856.35 1.734t1.25 2.015t2.45 2.675T12 18.3m0-6.825"/></svg>
                        </div>
                        <div className="bg-white rounded-full shadow p-2.5 border" onClick={() => alert("Saved")}>
                          <svg xmlns="http://www.w3.org/2000/svg" className="m-auto w-5 h-5 text-black" viewBox="0 0 24 24"><path fill="currentColor" d="M6 19.5V5.615q0-.69.463-1.152T7.615 4h8.77q.69 0 1.152.463T18 5.615V19.5l-6-2.577zm1-1.55l5-2.15l5 2.15V5.615q0-.23-.192-.423T16.385 5h-8.77q-.23 0-.423.192T7 5.615zM7 5h10z"/></svg>
                        </div>
                        <a href="#ingredients" className="flex justify-center items-center bg-black rounded-full shadow p-2.5 gap-2 border">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white rotate-180" viewBox="0 0 24 24"><path fill="currentColor" d="M9.342 18q-1.963 0-3.355-1.363q-1.39-1.364-1.39-3.31t1.39-3.3t3.355-1.354h7.743l-2.966-2.965l.708-.708L19 9.173l-4.173 4.173l-.708-.708l2.966-2.965H9.342q-1.555 0-2.65 1.058t-1.096 2.596t1.095 2.606T9.342 17h7.254v1z"/></svg>
                          <p className="font-semibold text-white text-sm">Aller à la recette</p>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="sticky top-0 w-full bg-white">
                  <div className="flex flex-col max-w-6xl m-auto px-4">
                    <div className="w-full rounded-lg mt-4">
                      <img src={recipeData.picture} alt="recipe" className="w-full rounded-lg object-cover" />
                    </div>
                    <div className="w-full mt-20">
                      {/* Description label */}
                      <div className="flex justify-center items-center relative">
                        <div className="absolute inset-x-0 inset-y-1/2 h-[1px] bg-yellow-500 z-0" />
                        <div className="flex justify-center items-center bg-white z-10">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-yellow-500" viewBox="0 0 24 24"><path fill="currentColor" d="M12 17.577L6.423 12L12 6.423L17.577 12zm0-1.427L16.15 12L12 7.85L7.85 12zM12 12"/></svg>
                          <p className="text-2xl font-bold text-center">Description</p>
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-yellow-500" viewBox="0 0 24 24"><path fill="currentColor" d="M12 17.577L6.423 12L12 6.423L17.577 12zm0-1.427L16.15 12L12 7.85L7.85 12zM12 12"/></svg>
                        </div>
                      </div>
                      <p className="my-4 text-gray-500 text-center">{recipeData.description}</p>
                      <div className="w-full h-[1px] bg-yellow-500" />
                    </div>

                    <div id="ingredients" className="w-full flex items-stretch gap-8 pt-20">
                      {/* Left side */}
                      <div className="w-[30%] flex flex-col gap-8">
                        <div className="flex items-center">
                          <p className="w-[150px] border border-gray-700 p-2 text-xs text-center font-light tracking-widest uppercase">ingrédients</p>
                        </div>
                        <div className="w-full flex flex-col">
                          {recipeData.ingredients && (
                            recipeData.ingredients.length > 0 ? (
                              <div className="flex flex-col gap-2">
                                {recipeData.ingredients.map((ingredient, index) => (
                                  ingredient.unit === 'No-unit' ? (
                                    <p key={index} className="text-gray-500 text-sm">{ingredient.quantity} {ingredient.name}</p>
                                  ) : (
                                    <p key={index} className="text-gray-500 text-sm">{ingredient.quantity}{ingredient.unit} {!isVowel(ingredient.name.charAt(0)) ? `de ${ingredient.name}` : `d'${ingredient.name}`}</p>
                                  )
                                ))}
                                
                                <div className="mt-10">
                                  <p className="text-sm font-semibold">Temps de préparation</p>
                                  <p className="text-[13px] leading-4 mt-1">{recipeData.duration} minute(s)</p>
                                </div>
                                
                                <div className="mt-10">
                                  <p className="text-sm font-semibold">Difficulté</p>
                                  {recipeData.difficulty <= 2 && (
                                    <div className={"flex justify-center items-center max-w-fit mt-1 px-4 py-2 gap-2 rounded-lg bg-green-500"}>
                                      <div className="w-2 h-2 rounded-full bg-white" />
                                      <p className="text-white text-xs font-semibold">Facile</p>
                                    </div>
                                  )}
                                  {recipeData.difficulty === 3 && (
                                    <div className={"flex justify-center items-center max-w-fit mt-1 px-4 py-2 gap-2 rounded-lg bg-yellow-500"}>
                                      <div className="w-2 h-2 rounded-full bg-white" />
                                      <p className="text-white text-xs font-semibold">Moyen</p>
                                    </div>
                                  )}
                                  {recipeData.difficulty > 3 && (
                                    <div className={"flex justify-center items-center max-w-fit mt-1 px-4 py-2 gap-2 rounded-lg bg-red-500"}>
                                      <div className="w-2 h-2 rounded-full bg-white" />
                                      <p className="text-white text-xs font-semibold">Difficle</p>
                                    </div>
                                  )}
                                </div>
                              </div> 
                            ) : (
                              <p className="text-gray-500 italic">Aucun ingrédient</p>
                            )
                          )}
                        </div>
                      </div>
                      {/* Right side */}
                      <div className="w-[70%] flex flex-col justify-between gap-8">
                        <div className="flex flex-col gap-8">
                          <div className="w-full flex justify-between items-center">
                            <div className="flex items-center">
                              <p className="w-[150px] border border-gray-700 p-2 text-xs text-center font-light tracking-widest uppercase">instructions</p>
                            </div>
                            <button className="flex justify-center items-center gap-1 bg-yellow-600 rounded-full shadow p-2.5 border" onClick={() => alert("Saved")}>
                              <svg xmlns="http://www.w3.org/2000/svg" className="m-auto w-5 h-5 text-white" viewBox="0 0 24 24"><path fill="currentColor" d="M17 7.846H7v-3.23h10zm.615 4.27q.425 0 .713-.288t.287-.713t-.287-.712t-.713-.288t-.712.288t-.288.712t.288.713t.712.287M16 19v-4.538H8V19zm1 1H7v-4H3.577v-5.385q0-.85.577-1.425t1.423-.575h12.846q.85 0 1.425.575t.575 1.425V16H17z"/></svg>
                              <p className="text-sm font-semibold text-white">Imprimer</p>
                            </button>
                          </div>
                          <p className="text-gray-500 text-balance">{recipeData.preparation}</p>
                        </div>
                        <div className="w-full flex items-center px-6 py-4 bg-gray-100 gap-4">
                          {/* Insta logo */}
                          <div className="w-14 h-14 flex rounded-full bg-yellow-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-white m-auto" viewBox="0 0 256 256"><path fill="currentColor" d="M128 82a46 46 0 1 0 46 46a46.06 46.06 0 0 0-46-46m0 80a34 34 0 1 1 34-34a34 34 0 0 1-34 34m48-136H80a54.06 54.06 0 0 0-54 54v96a54.06 54.06 0 0 0 54 54h96a54.06 54.06 0 0 0 54-54V80a54.06 54.06 0 0 0-54-54m42 150a42 42 0 0 1-42 42H80a42 42 0 0 1-42-42V80a42 42 0 0 1 42-42h96a42 42 0 0 1 42 42ZM190 76a10 10 0 1 1-10-10a10 10 0 0 1 10 10"/></svg>
                          </div>
                          {/* Text */}
                          <div className="flex flex-col gap-1">
                            <p className="text-lg uppercase font-semibold max-w-full">Faites-nous savoir si vous avez reproduit la recette et le résultat</p>
                            <p className="text-[13px] text-gray-700 font-light">Taggez <span className="uppercase font-bold underline text-pink-700">@{recipeData.idMembre?.firstname}</span> sur Instagram et mettez le hashtag <span className="uppercase font-bold underline text-pink-700">#{recipeData.idMembre?.firstname}</span>. J{'\''}ai hâte d{'\''}apprécier les résultats 😋</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="w-full flex flex-col border-y border-yellow-500 my-40 py-2 gap-8 relative">
                      {/* Arrows start */}
                      <div className="absolute inset-y-1/3 left-0 z-10 w-14 h-14 flex bg-black/20 backdrop-blur-sm rounded-full cursor-pointer hover:shadow-lg transition-all" onClick={scrollLeft}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="m-auto w-8 h-8 text-white" viewBox="0 0 24 24"><path fill="currentColor" d="m14 18l-6-6l6-6l1.4 1.4l-4.6 4.6l4.6 4.6z"/></svg>
                      </div>
                      <div className="absolute inset-y-1/3 right-0 z-10 w-14 h-14 flex bg-black/20 backdrop-blur-sm rounded-full cursor-pointer hover:shadow-lg transition-all" onClick={scrollRight}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="m-auto w-8 h-8 text-white rotate-180" viewBox="0 0 24 24"><path fill="currentColor" d="m14 18l-6-6l6-6l1.4 1.4l-4.6 4.6l4.6 4.6z"/></svg>
                      </div>
                      {/* Arrows end */}
                      <div className="flex justify-between items-center z-10 -mt-6">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-yellow-500 bg-white" viewBox="0 0 24 24"><path fill="currentColor" d="M12 17.577L6.423 12L12 6.423L17.577 12zm0-1.427L16.15 12L12 7.85L7.85 12zM12 12"/></svg>
                        <p className="text-2xl font-bold text-center bg-white px-4">Mes recettes</p>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-yellow-500 bg-white" viewBox="0 0 24 24"><path fill="currentColor" d="M12 17.577L6.423 12L12 6.423L17.577 12zm0-1.427L16.15 12L12 7.85L7.85 12zM12 12"/></svg>
                      </div>

                      <div id="slider" className="max-w-[calc(100%-32px)] flex mx-8 overflow-auto gap-8">
                        {myRecipes?.length > 0 ? (
                          myRecipes.map((recipe, index) => (
                            <div key={index} className="w-52 flex-shrink-0">
                              <div className="w-full h-32">
                                <img src={recipe.picture} alt="other-recipe" className="w-full h-full object-cover"/>
                              </div>
                              <p className="text-lg font-semibold mt-6 uppercase">{recipe.title}</p>
                            </div>
                          ))
                        ) : (
                          <p className="w-full text-xl font-light italic text-gray-500 text-center">Aucune autre recette trouvée</p>
                        )}
                      </div>

                      <div className="flex justify-between items-center z-10 -mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-yellow-500 bg-white" viewBox="0 0 24 24"><path fill="currentColor" d="M12 17.577L6.423 12L12 6.423L17.577 12zm0-1.427L16.15 12L12 7.85L7.85 12zM12 12"/></svg>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-yellow-500 bg-white" viewBox="0 0 24 24"><path fill="currentColor" d="M12 17.577L6.423 12L12 6.423L17.577 12zm0-1.427L16.15 12L12 7.85L7.85 12zM12 12"/></svg>
                      </div>
                    </div>

                    <div className="w-full flex justify-between items-center pt-4">
                      <div className="flex items-center gap-4">
                        {/* User profile */}
                        <div className="w-40 h-40 flex rounded-full bg-gray-500">
                          <img src={recipeData.idMembre?.avatar} alt="avatar" className="w-full h-full rounded-full" />
                        </div>
                        {/* Infos */}
                        <div className="flex flex-col gap-4">
                          <p className="text-lg font-extrabold uppercase">Merci pour la visite!</p>
                          <p className="text-base text-gray-500 text-balance max-w-[400px]">Je suis {recipeData.idMembre?.firstname + ' ' + recipeData.idMembre?.lastname}, j{'\''}aime découvrir et revisiter des recettes. 
                            J{'\''}aime bien discuter avec des personnes concernant la cuisine, et je suis toujours prêt(e) à partager mes connaissances.
                          </p>
                          <p className="text-base text-gray-500 text-balance max-w-[400px]">Avez vous une recette à nous partager ? Taggez <span className="uppercase font-bold underline text-pink-700">@{recipeData.idMembre?.firstname}</span> sur Instagram et je vous retrouverai!</p>
                        </div>
                      </div>

                      <div className="flex flex-col gap-4">
                        <p className="text-lg font-bold">Partager sur :</p>
                        <Socials />
                      </div>
                    </div>

                    <div className="w-full h-1 border-y border-gray-500 mt-20" />

                    <RecipesList recipeId={recipeData._id} />
                  </div>
                </div>
              </div>


              <div className={`sticky top-0 max-h-screen bg-white border-l ${isSidebarOpen ? 'translate-x-0 w-[390px]' : 'translate-x-[390px] w-0'} transition-all duration-500`}>
                <div className="relative w-full px-10 pt-8 flex flex-col h-full max-h-[calc(100vh-142px)]" style={{scrollbarWidth: "none"}}>
                  {/* Close sidebar */}
                  <div className="absolute top-10 -left-3.5">
                    <div className="flex items-center justify-center w-7 h-7 bg-white border rounded-full cursor-pointer hover:scale-110 hover:border-2 hover:border-gray-300 transition-all duration-300" onClick={closeSidebar}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-gray-500" viewBox="0 0 24 24"><path fill="currentColor" d="m8.401 16.333l-.734-.727l3.6-3.606l-3.6-3.58l.734-.728l3.6 3.596l3.573-3.596l.734.727l-3.6 3.58l3.6 3.607l-.734.727L12 12.737z"/></svg>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex justify-between items-center">
                    <div className="flex justify-between items-center gap-3">
                      <div className="bg-white rounded-full p-2.5 border cursor-pointer" onClick={() => setIsSidebarOpen(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="m-auto w-5 h-5 text-black" viewBox="0 0 24 24"><path fill="currentColor" d="m12 19.654l-.758-.685q-2.448-2.236-4.05-3.829t-2.529-2.808t-1.295-2.201T3 8.15q0-1.908 1.296-3.204T7.5 3.65q1.32 0 2.475.675T12 6.288Q12.87 5 14.025 4.325T16.5 3.65q1.908 0 3.204 1.296T21 8.15q0 .996-.368 1.98t-1.295 2.202t-2.52 2.808t-4.06 3.83zm0-1.354q2.4-2.17 3.95-3.716t2.45-2.685t1.25-2.015T20 8.15q0-1.5-1-2.5t-2.5-1q-1.194 0-2.204.682t-1.808 2.053h-.976q-.818-1.39-1.818-2.063q-1-.672-2.194-.672q-1.48 0-2.49 1T4 8.15q0 .856.35 1.734t1.25 2.015t2.45 2.675T12 18.3m0-6.825"/></svg>
                      </div>
                      <div className="bg-white rounded-full p-2.5 border cursor-pointer" onClick={() => alert("Saved")}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="m-auto w-5 h-5 text-black" viewBox="0 0 24 24"><path fill="currentColor" d="M6 19.5V5.615q0-.69.463-1.152T7.615 4h8.77q.69 0 1.152.463T18 5.615V19.5l-6-2.577zm1-1.55l5-2.15l5 2.15V5.615q0-.23-.192-.423T16.385 5h-8.77q-.23 0-.423.192T7 5.615zM7 5h10z"/></svg>
                      </div>
                      <div className="bg-white rounded-full p-2.5 border cursor-pointer" onClick={() => alert("Saved")}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="m-auto w-5 h-5 text-black" viewBox="0 0 24 24"><path fill="currentColor" d="M18.002 21.5q-1.04 0-1.771-.73q-.731-.728-.731-1.77q0-.2.035-.413q.034-.214.103-.402l-7.742-4.562q-.367.414-.854.645Q6.556 14.5 6 14.5q-1.042 0-1.77-.728q-.73-.729-.73-1.77t.73-1.771T6 9.5q.556 0 1.042.232q.487.231.854.645l7.742-4.562q-.069-.188-.103-.402Q15.5 5.2 15.5 5q0-1.042.729-1.77q.728-.73 1.769-.73t1.771.729t.731 1.769t-.73 1.771Q19.042 7.5 18 7.5q-.556 0-1.042-.232q-.487-.231-.854-.645l-7.742 4.562q.069.188.103.4q.035.213.035.411t-.035.415t-.103.404l7.742 4.562q.367-.414.854-.645q.486-.232 1.042-.232q1.042 0 1.77.729q.73.728.73 1.769t-.728 1.771t-1.77.731"/></svg>
                      </div>
                    </div>
                    <div className="bg-white rounded-full p-2.5 border cursor-pointer" onClick={() => alert("Saved")}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="m-auto w-5 h-5 text-black" viewBox="0 0 24 24"><path fill="currentColor" d="M11.5 16.5h1V11h-1zm.5-6.923q.262 0 .438-.177q.177-.177.177-.438q0-.262-.177-.439q-.176-.177-.438-.177t-.438.177t-.177.439t.177.438q.176.177.438.177M12.003 21q-1.866 0-3.51-.708q-1.643-.709-2.859-1.924t-1.925-2.856T3 12.003t.708-3.51t1.924-2.859t2.856-1.925T11.997 3t3.51.708t2.859 1.924t1.925 2.856t.709 3.509t-.708 3.51t-1.924 2.859t-2.856 1.925t-3.509.709M12 20q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8"/></svg>
                    </div>
                  </div>

                  {/* Review */}
                  {/* <div className="w-full flex mt-10 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-gray-700" viewBox="0 0 24 24"><path fill="currentColor" d="m8.85 16.825l3.15-1.9l3.15 1.925l-.825-3.6l2.775-2.4l-3.65-.325l-1.45-3.4l-1.45 3.375l-3.65.325l2.775 2.425zm-1.525 2.098l1.24-5.313l-4.123-3.572l5.431-.47L12 4.557l2.127 5.01l5.43.47l-4.122 3.572l1.24 5.313L12 16.102zM12 12.25"/></svg>
                  </div> */}

                  <div className="flex flex-col mt-10 overflow-auto" style={{ scrollbarWidth: 'none' }}>
                    <h1 className="text-xl font-semibold">Commentaires</h1>
                    {commentsLoading ? (
                      <div className="flex flex-col my-6">
                        <div className="flex items-start gap-4">
                          <div className="min-w-10 h-10 flex rounded-full bg-gray-200 overflow-hidden animate-pulse" />
                          <div className="flex flex-col gap-1">
                            <div className="w-1/3 h-4 bg-gray-200 animate-pulse" />
                            <div className="flex flex-col gap-1">
                              <div className="w-1/3 h-4 bg-gray-200 mt-2 animate-pulse" />
                              <div className="w-1/3 h-4 bg-gray-200 mt-2 animate-pulse" />
                            </div>
                            <div className="w-1/3 h-4 bg-gray-200 mt-2 animate-pulse" />
                          </div>
                        </div>
                      </div>
                    ) : (
                      comments?.length === 0 ? (
                        <div className="flex flex-col justify-center items-center text-center mt-6">
                          <p className="text-sm text-gray-500 italic">Aucun commentaire</p>
                          <p className="text-xs text-gray-500 italic">Soyez le tout premier à ajouter un commentaire.</p>
                        </div>
                      ) : (
                        <div className="flex flex-col gap-6 my-6">
                          {comments.map((item) => (
                            <Comment key={item._id} comment={item} />
                          ))}
                        </div>
                      )
                    )}
                  </div>
                </div>

                <div className="w-full h-24 bg-white border-t shadow">
                  <div className="w-full h-full flex flex-col justify-between p-2">
                    {!isRated && (
                      <div className="w-full flex items-center gap-1">
                        <p className="text-xs font-semibold text-gray-700">Votre avis:</p>
                        <div className="flex cursor-pointer">
                          {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} onClick={() => handleRating(i)}>
                              {i > commentForm.note || commentForm.note === 0 ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-700" viewBox="0 0 24 24"><path fill="currentColor" d="m8.85 16.825l3.15-1.9l3.15 1.925l-.825-3.6l2.775-2.4l-3.65-.325l-1.45-3.4l-1.45 3.375l-3.65.325l2.775 2.425zm-1.525 2.098l1.24-5.313l-4.123-3.572l5.431-.47L12 4.557l2.127 5.01l5.43.47l-4.122 3.572l1.24 5.313L12 16.102zM12 12.25"/></svg>
                              ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-yellow-500" viewBox="0 0 24 24"><path fill="currentColor" d="m7.325 18.923l1.24-5.313l-4.123-3.572l5.431-.47L12 4.557l2.127 5.01l5.43.47l-4.122 3.572l1.24 5.313L12 16.102z"/></svg>
                              )}
                            </div>
                          ))}
                        </div>
                        <p className={`text-xs font-light text-red-500 ml-1 ${tempRating === 0 ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>Donnez une note</p>
                        <p className={`text-xs font-light text-green-500 ml-1 ${success === 0 ? 'inline-block' : 'hidden'} transition-opacity duration-300`}>Commentaire ajouté</p>
                      </div>
                    )}
                    
                    <form onSubmit={submitComment}>
                      <label htmlFor="search" className="text-sm font-medium text-gray-900 sr-only">Search</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                          <div className="w-7 h-7 overflow-hidden rounded-full">
                            <img className="w-full h-full object-cover" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="profile picture" />
                          </div>
                        </div>
                        <textarea id="textarea" rows="1" value={commentForm.content} className="block w-full p-4 px-12 text-[13px] leading-5 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none" placeholder="Ajoutez un commentaire" required onChange={(e) => setCommentForm({ ...commentForm, content: e.target.value })} />
                        <button type="submit" className="text-white absolute end-2.5 bottom-2.5 flex justify-center items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:pointer-events-none" disabled={commentForm.content === ''}>
                          <svg xmlns="http://www.w3.org/2000/svg" className={`w-4 h-4 ${commentForm.content === '' ? 'text-gray-400' : 'text-white'}`} viewBox="0 0 14 14"><path fill="currentColor" fillRule="evenodd" d="M11.821.098a1.62 1.62 0 0 1 2.077 2.076l-3.574 10.712a1.62 1.62 0 0 1-1.168 1.069a1.599 1.599 0 0 1-1.52-.434l-1.918-1.909l-2.014 1.042a.5.5 0 0 1-.73-.457l.083-3.184l7.045-5.117a.625.625 0 1 0-.735-1.012L2.203 8.088l-1.73-1.73a1.6 1.6 0 0 1-.437-1.447a1.62 1.62 0 0 1 1.069-1.238h.003L11.82.097Z" clipRule="evenodd"/></svg>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default RecipeDetail