/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { fetchRecipe, fetchRecipes } from "../services/recipe"
import Socials from "./Socials"
import RecipesList from "./RecipesList"
import { fetchUser } from "../utils"

const isVowel = (char) => ['a', 'e', 'i', 'o', 'u'].includes(char.toLowerCase())

const RecipeDetail = ({ detailId, onSetDetail }) => {
  const { result: user } = fetchUser()
  const [showDetail, setShowDetail] = useState("")
  const [recipeData, setRecipeData] = useState({})
  const [myRecipes, setMyRecipes] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  document.body.style.overflow = showDetail ? 'hidden' : 'auto'

  const discardDetail = () => {
    setShowDetail("")

    setTimeout(() => {
      onSetDetail("")
    }, 1000)
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
      console.log(randomData);
      setMyRecipes(randomData)
    }

    fetchMyRecipes()
  }, [user._id, detailId])

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
      <div className={`bg-white w-full h-[calc(100vh-2rem)] rounded-t-xl mt-14 overflow-auto ${!showDetail ? 'translate-y-full' : 'translate-y-0'} transition-all duration-500`}>
        <div className="w-full py-[64px] px-[120px]">
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
            <div className="w-full flex flex-col items-center max-w-6xl m-auto">
              <div className="flex flex-col w-full mb-2">
                <h1 className="text-[26px] leading-8 font-extrabold mb-1">{recipeData.title}</h1>
                <div className="flex items-center gap-1">
                  <p className="text-sm text-gray-500">{recipeData.idCategory?.name}</p>
                  <p className="text-lg">|</p>
                  {/* Stars */}
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-yellow-500" viewBox="0 0 24 24"><path fill="currentColor" d="m7.325 18.923l1.24-5.313l-4.123-3.572l5.431-.47L12 4.557l2.127 5.01l5.43.47l-4.122 3.572l1.24 5.313L12 16.102z"/></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-yellow-500" viewBox="0 0 24 24"><path fill="currentColor" d="m7.325 18.923l1.24-5.313l-4.123-3.572l5.431-.47L12 4.557l2.127 5.01l5.43.47l-4.122 3.572l1.24 5.313L12 16.102z"/></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-yellow-500" viewBox="0 0 24 24"><path fill="currentColor" d="m7.325 18.923l1.24-5.313l-4.123-3.572l5.431-.47L12 4.557l2.127 5.01l5.43.47l-4.122 3.572l1.24 5.313L12 16.102z"/></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-yellow-500" viewBox="0 0 24 24"><path fill="currentColor" d="m7.325 18.923l1.24-5.313l-4.123-3.572l5.431-.47L12 4.557l2.127 5.01l5.43.47l-4.122 3.572l1.24 5.313L12 16.102z"/></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-yellow-500" viewBox="0 0 24 24"><path fill="currentColor" d="m15.15 16.85l-.825-3.6l2.775-2.4l-3.65-.325l-1.45-3.4v7.8zm-7.825 2.073l1.24-5.313l-4.123-3.572l5.431-.47L12 4.557l2.127 5.01l5.43.47l-4.122 3.572l1.24 5.313L12 16.102z"/></svg>
                  </div>
                  <p className="text-[13px] font-bold text-gray-700 uppercase">0 commentaire(s) / 0 like(s)</p>
                </div>
              </div>
              <div className="sticky top-0 flex justify-between items-center py-4 mx-auto gap-10 bg-white w-full z-50">
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

              <div id="ingredients" className="w-full flex items-stretch gap-4 pt-20">
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
              
              <div className="w-full flex flex-col border-y border-yellow-500 my-40 py-2 gap-8">
                <div className="flex justify-between items-center z-10 -mt-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-yellow-500 bg-white" viewBox="0 0 24 24"><path fill="currentColor" d="M12 17.577L6.423 12L12 6.423L17.577 12zm0-1.427L16.15 12L12 7.85L7.85 12zM12 12"/></svg>
                  <p className="text-2xl font-bold text-center bg-white px-4">Mes recettes</p>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-yellow-500 bg-white" viewBox="0 0 24 24"><path fill="currentColor" d="M12 17.577L6.423 12L12 6.423L17.577 12zm0-1.427L16.15 12L12 7.85L7.85 12zM12 12"/></svg>
                </div>

                <div className="max-w-[calc(100%-32px)] flex mx-8 overflow-auto gap-8">
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
          )}
        </div>
      </div>
    </div>
  )
}

export default RecipeDetail