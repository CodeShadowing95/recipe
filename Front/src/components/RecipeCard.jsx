/* eslint-disable react/prop-types */
import { useState } from "react"


const RecipeCard = ({ recipe, onRecipe, isSelected, onShowRecipe }) => {
  const [isHovered, setIsHovered] = useState("")

  const getRecipeDetail = (id) => onRecipe(id)

  return (
    <div className="h-[370px] flex flex-col bg-white cursor-pointer rounded-lg border group relative overflow-hidden" onClick={() => onShowRecipe(recipe?._id)} onMouseEnter={() => setIsHovered(recipe?._id)} onMouseLeave={() => setIsHovered("")}>
      {/* Image */}
      <div className="w-full h-[170px] relative rounded-t-lg overflow-hidden">
        <img
          src={recipe?.picture}
          alt="recipe"
          className="w-full h-full object-cover rounded-t-lg group-hover:scale-110 transition-all duration-150"
        />
        <div onClick={(e) => e.stopPropagation()} className={`absolute top-2 right-2 flex justify-center items-center gap-2 ${isHovered === recipe?._id ? "translate-y-0" : "-translate-y-[200%]"} transition-transform duration-300`}>
          {/* <div className="bg-white rounded-full shadow p-1.5" onClick={() => alert("Saved")}>
            <svg xmlns="http://www.w3.org/2000/svg" className="m-auto w-5 h-5 text-black" viewBox="0 0 24 24"><path fill="currentColor" d="M6 19.5V5.615q0-.69.463-1.152T7.615 4h8.77q.69 0 1.152.463T18 5.615V19.5l-6-2.577zm1-1.55l5-2.15l5 2.15V5.615q0-.23-.192-.423T16.385 5h-8.77q-.23 0-.423.192T7 5.615zM7 5h10z"/></svg>
          </div>
          <div className="bg-white rounded-full shadow p-1.5" onClick={() => alert("Liked")}>
            <svg xmlns="http://www.w3.org/2000/svg" className="m-auto w-5 h-5 text-black" viewBox="0 0 24 24"><path fill="currentColor" d="m12 19.654l-.758-.685q-2.448-2.236-4.05-3.829t-2.529-2.808t-1.295-2.201T3 8.15q0-1.908 1.296-3.204T7.5 3.65q1.32 0 2.475.675T12 6.288Q12.87 5 14.025 4.325T16.5 3.65q1.908 0 3.204 1.296T21 8.15q0 .996-.368 1.98t-1.295 2.202t-2.52 2.808t-4.06 3.83zm0-1.354q2.4-2.17 3.95-3.716t2.45-2.685t1.25-2.015T20 8.15q0-1.5-1-2.5t-2.5-1q-1.194 0-2.204.682t-1.808 2.053h-.976q-.818-1.39-1.818-2.063q-1-.672-2.194-.672q-1.48 0-2.49 1T4 8.15q0 .856.35 1.734t1.25 2.015t2.45 2.675T12 18.3m0-6.825"/></svg>
          </div> */}
          <div className="bg-white rounded-full shadow p-1.5" onClick={() => getRecipeDetail(recipe?._id)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="m-auto w-5 h-5 text-black" viewBox="0 0 24 24"><path fill="currentColor" d="M6.462 13q-.413 0-.707-.294T5.462 12t.293-.706t.707-.294t.706.294t.294.706t-.294.706t-.706.294M12 13q-.413 0-.706-.294T11 12t.294-.706T12 11t.706.294T13 12t-.294.706T12 13m5.538 0q-.412 0-.706-.294T16.538 12t.294-.706t.706-.294t.707.294t.293.706t-.293.706t-.707.294"/></svg>
          </div>
        </div>
      </div>
      {/* Content */}
      <div className="w-full px-4 pt-6 pb-4 flex flex-col">
        <p className="text-xs font-bold uppercase text-gray-500">{recipe?.idCategory.name}</p>
        <p className="text-lg font-bold text-gray-800 mt-2 max-w-3/4 truncate">{recipe?.title}</p>
        {/* <p className="text-lg font-bold text-gray-800 mt-2">{recipe?.title.length > 100 ? recipe?.title.substring(0, 97) + '...' : recipe?.title}</p> */}
        <p className="text-[13px] leading-5 text-gray-800 mt-2">{recipe?.description.length <= 120 ? recipe?.description : recipe?.description.substring(0, 120) + '...'}</p>
        <div className="w-full flex justify-between items-center mt-4">
          <div className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-500" viewBox="0 0 24 24"><path fill="currentColor" d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2M12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8s8 3.58 8 8s-3.58 8-8 8"/><path fill="currentColor" d="M12.5 7H11v6l5.25 3.15l.75-1.23l-4.5-2.67z"/></svg>
            <p className="text-xs font-semibold text-gray-500">{recipe?.duration} min</p>
          </div>
          {recipe?.difficulty <= 2 && (
            <div className="flex justify-center items-center rounded-full px-4 py-2 bg-green-100 text-green-700 text-xs font-semibold">
              Facile
            </div>
          )}
          {recipe?.difficulty == 3 && (
            <div className="flex justify-center items-center rounded-full px-4 py-2 bg-amber-100 text-amber-700 text-xs font-semibold">
              Moyen
            </div>
          )}
          {recipe?.difficulty > 3 && (
            <div className="flex justify-center items-center rounded-full px-4 py-2 bg-red-100 text-red-700 text-xs font-semibold">
              Difficile
            </div>
          )}
          {/* <div className="flex items-center gap-1">
            {Array.from(Array(5), (_, i) => i + 1).map((i) => (
              <div key={i}>
                <svg xmlns="http://www.w3.org/2000/svg" className={`w-5 h-5 ${recipe?.difficulty >= i ? 'text-yellow-500' : 'text-gray-300'}`} viewBox="0 0 24 24"><path fill="currentColor" d="m8.125 7.092l2.608-3.47q.238-.321.566-.472T12 3t.701.15t.566.471l2.608 3.471l4.02 1.368q.534.18.822.606t.289.939q0 .237-.07.471t-.228.449l-2.635 3.573l.1 3.83q.025.706-.466 1.189T16.563 20l-.453-.056L12 18.733l-4.11 1.211q-.125.05-.24.053q-.117.003-.213.003q-.666 0-1.15-.483q-.485-.483-.46-1.188l.1-3.856l-2.629-3.548q-.159-.217-.228-.453T3 10q0-.506.297-.942q.296-.435.828-.618z"/></svg>
              </div>
            ))}
          </div> */}
        </div>
        {/* <div className="w-full h-[1px] bg-gray-200 my-2"></div>
        <div className="w-full flex gap-3 justify-end items-center">
          <div className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-400" viewBox="0 0 24 24"><path fill="currentColor" d="m12 19.654l-.758-.685q-2.448-2.236-4.05-3.829t-2.529-2.808t-1.295-2.201T3 8.15q0-1.908 1.296-3.204T7.5 3.65q1.32 0 2.475.675T12 6.288Q12.87 5 14.025 4.325T16.5 3.65q1.908 0 3.204 1.296T21 8.15q0 .996-.368 1.98t-1.295 2.202t-2.52 2.808t-4.06 3.83z"/></svg>
            <p className="text-xs font-semibold text-gray-400">0</p>
          </div>
          <div className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-400" viewBox="0 0 24 24"><path fill="currentColor" d="M12.005 15.154q1.524 0 2.586-1.067t1.063-2.592t-1.067-2.586t-2.592-1.063T9.41 8.913t-1.063 2.592t1.067 2.586t2.592 1.063M12 14.2q-1.125 0-1.912-.787T9.3 11.5t.788-1.912T12 8.8t1.913.788t.787 1.912t-.787 1.913T12 14.2m0 3.8q-2.965 0-5.44-1.57t-3.997-4.115q-.125-.205-.177-.405t-.053-.411t.053-.41t.177-.404q1.524-2.547 3.998-4.116T12 5t5.44 1.57t3.997 4.115q.125.205.177.405t.053.411t-.053.41t-.177.404q-1.524 2.547-3.998 4.116T12 18"/></svg>
            <p className="text-xs font-semibold text-gray-400">0</p>
          </div>
        </div> */}
      </div>

      <div className={`absolute inset-0 rounded-lg bg-white ${isSelected ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'} transition-all z-20 duration-500`}>
        <div className="w-full h-full flex flex-col justify-between py-6 px-4 relative">
          <div onClick={(e) => e.stopPropagation()} className={`absolute top-2 right-2 flex justify-center items-center transition-all duration-300`}>
            <div className="bg-white rounded-full shadow-xl border p-1.5" onClick={() => onRecipe("")}>
              <svg xmlns="http://www.w3.org/2000/svg" className="m-auto w-5 h-5" viewBox="0 0 24 24"><path fill="#000000" d="m12 12.708l-5.246 5.246q-.14.14-.344.15t-.364-.15t-.16-.354t.16-.354L11.292 12L6.046 6.754q-.14-.14-.15-.344t.15-.364t.354-.16t.354.16L12 11.292l5.246-5.246q.14-.14.344-.15t.364.15t.16.354t-.16.354L12.708 12l5.246 5.246q.14.14.15.344t-.15.364t-.354.16t-.354-.16z"/></svg>
            </div>
          </div>
          <div className="w-full">
            <p className="text-lg font-bold text-gray-800">Description</p>
            <p className="text-[13px] leading-5 text-gray-800 mt-2">{recipe?.description}</p>
          </div>
          <div className="w-full flex justify-between items-center">
            <div className="flex items-center gap-1">
              <div className="w-8 h-8 rounded-full bg-gray-200">
                <img src={recipe?.idMembre?.avatar} alt="user profile" className="w-full h-full object-cover rounded-full" />
              </div>
              <p className="text-xs font-semibold text-gray-500 max-w-[150px] truncate">{recipe?.idMembre === null ? 'Anonymous' : recipe?.idMembre?.lastname + ' ' + recipe?.idMembre?.firstname}</p>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-500" viewBox="0 0 24 24"><path fill="currentColor" d="m12 19.654l-.758-.685q-2.448-2.236-4.05-3.829t-2.529-2.808t-1.295-2.201T3 8.15q0-1.908 1.296-3.204T7.5 3.65q1.32 0 2.475.675T12 6.288Q12.87 5 14.025 4.325T16.5 3.65q1.908 0 3.204 1.296T21 8.15q0 .996-.368 1.98t-1.295 2.202t-2.52 2.808t-4.06 3.83z"/></svg>
                <p className="text-xs font-bold text-gray-500">0</p>
              </div>
              <div className="flex items-center gap-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-500" viewBox="0 0 24 24"><path fill="currentColor" d="M6 19.5V5.615q0-.69.463-1.152T7.615 4h8.77q.69 0 1.152.463T18 5.615V19.5l-6-2.577z"/></svg>
                <p className="text-xs font-bold text-gray-500">0</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecipeCard