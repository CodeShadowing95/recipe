import { useNavigate } from "react-router-dom"

/* eslint-disable react/prop-types */
const RecipeCard = ({ recipe }) => {
  const username = `${recipe?.idMembre.firstname} ${recipe?.idMembre.lastname}`

  const navigate = useNavigate()

  const goToRecipe = (id) => {
    navigate(`/recipe/${id}`)
  }

  return (
    <div className="w-[285px] h-[370px] flex flex-col shadow-xl bg-white mt-12 pb-4 cursor-pointer rounded-lg group" onClick={() => goToRecipe(recipe?._id)}>
      {/* Image */}
      <div className="w-[240px] min-h-[180px] mx-auto overflow-hidden shadow-2xl -translate-y-10 rounded-lg">
        <img src={recipe?.picture} alt="banner" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
      </div>
      <div className="w-full h-full flex flex-col justify-between">
        <div className="w-full flex flex-col gap-2">
          {/* Title */}
          <div className="w-full px-6">
            <p className="text-[18px] leading-6 font-bold">{recipe?.title.slice(0, 50)}{recipe?.title.length > 50 ? "..." : ""}</p>
          </div>

          {/* Stars */}
          <div className="w-full flex items-center px-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-yellow-500" viewBox="0 0 24 24"><path fill="currentColor" d="m7.325 18.923l1.24-5.313l-4.123-3.572l5.431-.47L12 4.557l2.127 5.01l5.43.47l-4.122 3.572l1.24 5.313L12 16.102z"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-yellow-500" viewBox="0 0 24 24"><path fill="currentColor" d="m7.325 18.923l1.24-5.313l-4.123-3.572l5.431-.47L12 4.557l2.127 5.01l5.43.47l-4.122 3.572l1.24 5.313L12 16.102z"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-yellow-500" viewBox="0 0 24 24"><path fill="currentColor" d="m7.325 18.923l1.24-5.313l-4.123-3.572l5.431-.47L12 4.557l2.127 5.01l5.43.47l-4.122 3.572l1.24 5.313L12 16.102z"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-yellow-500" viewBox="0 0 24 24"><path fill="currentColor" d="m7.325 18.923l1.24-5.313l-4.123-3.572l5.431-.47L12 4.557l2.127 5.01l5.43.47l-4.122 3.572l1.24 5.313L12 16.102z"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-yellow-500" viewBox="0 0 24 24"><path fill="currentColor" d="m7.325 18.923l1.24-5.313l-4.123-3.572l5.431-.47L12 4.557l2.127 5.01l5.43.47l-4.122 3.572l1.24 5.313L12 16.102z"/></svg>
          </div>
        </div>

        {/* User */}
        <div className="w-full flex justify-between items-center mt-8 px-6 gap-2">
          <div className="flex items-center gap-2">
            <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="user" className="w-[30px] h-[30px] rounded-full" />
            <p className="text-[14px] font-semibold text-gray-500 tracking-tight">{username.slice(0, 20)}{username.length > 20 ? "..." : ""}</p>
          </div>
          <div className="flex justify-center items-center gap-4">
            <div className="flex justify-center items-center gap-1 p-1 rounded-full hover:bg-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-500" viewBox="0 0 24 24"><path fill="currentColor" d="m12 19.654l-.758-.685q-2.448-2.236-4.05-3.829t-2.529-2.808t-1.295-2.201T3 8.15q0-1.908 1.296-3.204T7.5 3.65q1.32 0 2.475.675T12 6.288Q12.87 5 14.025 4.325T16.5 3.65q1.908 0 3.204 1.296T21 8.15q0 .996-.368 1.98t-1.295 2.202t-2.52 2.808t-4.06 3.83zm0-1.354q2.4-2.17 3.95-3.716t2.45-2.685t1.25-2.015T20 8.15q0-1.5-1-2.5t-2.5-1q-1.194 0-2.204.682t-1.808 2.053h-.976q-.818-1.39-1.818-2.063q-1-.672-2.194-.672q-1.48 0-2.49 1T4 8.15q0 .856.35 1.734t1.25 2.015t2.45 2.675T12 18.3m0-6.825"/></svg>
              <p className="text-[14px] font-semibold text-gray-500">0</p>
            </div>
            <div className="flex justify-center items-center gap-1 p-1 rounded-full hover:bg-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-500" viewBox="0 0 24 24"><path fill="currentColor" d="M6.5 13.5h11v-1h-11zm0-3h11v-1h-11zm0-3h11v-1h-11zM21 20.077L17.923 17H4.615q-.69 0-1.152-.462T3 15.385V4.615q0-.69.463-1.152T4.615 3h14.77q.69 0 1.152.463T21 4.615zM4.615 16H18.35L20 17.644V4.615q0-.23-.192-.423T19.385 4H4.615q-.23 0-.423.192T4 4.615v10.77q0 .23.192.423t.423.192M4 16V4z"/></svg>
              <p className="text-[14px] font-semibold text-gray-500">0</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecipeCard