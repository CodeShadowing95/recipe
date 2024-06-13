import { useNavigate, useParams } from "react-router-dom"
import { fetchUser, transformDate } from "../utils"
import { bannerRecipe, ingredients } from "../assets"
import { useEffect, useState } from "react"
import { fetchRecipe } from "../services/recipe"
import { addComment, fetchCommentsByRecipe } from "../services/comment"
import { addIngredient, addIngredientsToRecipe, getIngredientsByRecipe } from "../services/ingredient"

const Recipe = () => {
  const { id } = useParams()
  const { result } = fetchUser()
  const userId = result?._id
  const navigate = useNavigate()

  const [recipeData, setRecipeData] = useState(null)
  const [commentDatas, setCommentDatas] = useState([])
  const [formCommentData, setFormCommentData] = useState({ author: userId, content: '', note: 1, idRecipe: id })
  const [ingredient, setIngredient] = useState({ name: '', quantity: 1, unit: 'No-unit' })
  const [ingredientsData, setIngredientsData] = useState({
    ingredients: [],
    idRecipe: id,
    idIngredient: '',
  })
  const [recipeIngs, setRecipeIngs] = useState([])
  const [successMessage, setSuccessMessage] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)


  const handleSubmitComment = async (e) => {
    e.preventDefault()

    await addComment(formCommentData)
    .then((response) => {
      if (response?.status === 201) {
        setIsSuccess(true)
        setSuccessMessage("Commentaire ajouté !")
        setTimeout(() => {
          setIsSuccess(false)
        }, 3000)
      }
    })

    setFormCommentData({ author: userId, content: '', note: 1, idRecipe: id })
  }

  const newIngredient = (ing) => {
    if (!ing) return

    setIngredientsData({ ...ingredientsData, ingredients: [...ingredientsData.ingredients, ing] })

    setIngredient({ name: '', quantity: 1, unit: 'No-unit' })
  }

  const removeIngredient = (name) => {
    setIngredientsData({ ...ingredientsData, ingredients: ingredientsData.ingredients.filter(ing => ing.name !== name) })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (ingredientsData.ingredients.length === 0) return

    const datas = ingredientsData.ingredients

    setIsLoading(true)
    for (let i = 0; i < datas.length; i++) {
      await addIngredient(datas[i].name)
      .then(async (res) => {
        if (res?.status === 201) {
          setIngredientsData({ ...ingredientsData, idIngredient: res.data._id })
          await addIngredientsToRecipe({ recipeId: id, ingredientId: res.data._id, quantity: datas[i].quantity, unit: datas[i].unit })
          .then((res) => {
            if (res.status === 201) {
              setSuccessMessage("Ingrédient ajouté !")
              setIsSuccess(true)
              setTimeout(() => {
                setIsSuccess(false)
              }, 3000)
            }
          })
        }
      })
    }
    setIsLoading(false)
    setIngredientsData({ ingredients: [], idIngredient: '' })
    setShowModal(false)

    window.location.reload()
  }

  // Fetch recipe
  useEffect(() => {
    fetchRecipe(id)
    .then(({ data }) => {
      setRecipeData(data)
    })
  }, [id])

  // Fetch comments by recipe
  useEffect(() => {
    fetchCommentsByRecipe(id)
    .then(({ data }) => {
      setCommentDatas(data)
    })
  })

  // Fetch ingredients by recipe
  useEffect(() => {
    getIngredientsByRecipe(id)
    .then(({ data }) => {
      setRecipeIngs(data)
    })
  }, [id])

  // Discard a modal when click outside
  const discardModalWhenClickOutside = (e) => {
    if (e.target.id === "modal") {
      setShowModal(false)
      setIngredient({ name: '', quantity: 1, unit: 'No-unit' })
    }
  }
  useEffect(() => {
    document.addEventListener("click", discardModalWhenClickOutside);
    return () => document.removeEventListener("click", discardModalWhenClickOutside);
  }, []);

  // useEffect(() => {
  //   window.scrollTo({ top: 0 })
  // }, [])

  return (
    <div className="w-screen min-h-screen bg-slate-200 relative">
      {/* Banner */}
      <div className="w-full h-full">
        <img src={bannerRecipe} alt="banner" className="w-full h-full object-cover" />
      </div>
      <div className="absolute top-0 px-4 py-6 z-20">
        {/* Back Button */}
        <button type="button" className="text-white bg-white/20 hover:bg-white/50 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center transition-all" onClick={() => navigate(-1)}>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2" viewBox="0 0 24 24"><path fill="#ffffff" d="m6.921 12.5l5.792 5.792L12 19l-7-7l7-7l.713.708L6.921 11.5H19v1z"/></svg>
          Retour
        </button>

        {/* Recipe */}
        <div className="w-full flex max-lg:flex-col gap-20 pl-14 pr-12 mt-8">
          {/* Left side */}
          <div className="sticky top-0 w-[40%] h-full pt-8">
            <div className="w-full flex flex-col gap-2 justify-center items-center">
              <div className="block w-full overflow-hidden rounded-3xl">
                <img src={recipeData?.picture} alt="recipe image" className="w-full h-full object-cover" />
              </div>
              <div className="w-full flex justify-between items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-20 h-20 text-yellow-500" viewBox="0 0 24 24"><path fill="currentColor" d="m8.125 7.092l2.608-3.47q.238-.321.566-.472T12 3t.701.15t.566.471l2.608 3.471l4.02 1.368q.534.18.822.606t.289.939q0 .237-.07.471t-.228.449l-2.635 3.573l.1 3.83q.025.706-.466 1.189T16.563 20l-.453-.056L12 18.733l-4.11 1.211q-.125.05-.24.053q-.117.003-.213.003q-.666 0-1.15-.483q-.485-.483-.46-1.188l.1-3.856l-2.629-3.548q-.159-.217-.228-.453T3 10q0-.506.297-.942q.296-.435.828-.618z"/></svg>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-20 h-20 text-yellow-500" viewBox="0 0 24 24"><path fill="currentColor" d="m8.125 7.092l2.608-3.47q.238-.321.566-.472T12 3t.701.15t.566.471l2.608 3.471l4.02 1.368q.534.18.822.606t.289.939q0 .237-.07.471t-.228.449l-2.635 3.573l.1 3.83q.025.706-.466 1.189T16.563 20l-.453-.056L12 18.733l-4.11 1.211q-.125.05-.24.053q-.117.003-.213.003q-.666 0-1.15-.483q-.485-.483-.46-1.188l.1-3.856l-2.629-3.548q-.159-.217-.228-.453T3 10q0-.506.297-.942q.296-.435.828-.618z"/></svg>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-20 h-20 text-yellow-500" viewBox="0 0 24 24"><path fill="currentColor" d="m8.125 7.092l2.608-3.47q.238-.321.566-.472T12 3t.701.15t.566.471l2.608 3.471l4.02 1.368q.534.18.822.606t.289.939q0 .237-.07.471t-.228.449l-2.635 3.573l.1 3.83q.025.706-.466 1.189T16.563 20l-.453-.056L12 18.733l-4.11 1.211q-.125.05-.24.053q-.117.003-.213.003q-.666 0-1.15-.483q-.485-.483-.46-1.188l.1-3.856l-2.629-3.548q-.159-.217-.228-.453T3 10q0-.506.297-.942q.296-.435.828-.618z"/></svg>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-20 h-20 text-yellow-500" viewBox="0 0 24 24"><path fill="currentColor" d="m8.125 7.092l2.608-3.47q.238-.321.566-.472T12 3t.701.15t.566.471l2.608 3.471l4.02 1.368q.534.18.822.606t.289.939q0 .237-.07.471t-.228.449l-2.635 3.573l.1 3.83q.025.706-.466 1.189T16.563 20l-.453-.056L12 18.733l-4.11 1.211q-.125.05-.24.053q-.117.003-.213.003q-.666 0-1.15-.483q-.485-.483-.46-1.188l.1-3.856l-2.629-3.548q-.159-.217-.228-.453T3 10q0-.506.297-.942q.296-.435.828-.618z"/></svg>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-20 h-20 text-gray-500" viewBox="0 0 24 24"><path fill="currentColor" d="m8.125 7.092l2.608-3.47q.238-.321.566-.472T12 3t.701.15t.566.471l2.608 3.471l4.02 1.368q.534.18.822.606t.289.939q0 .237-.07.471t-.228.449l-2.635 3.573l.1 3.83q.025.706-.466 1.189T16.563 20l-.453-.056L12 18.733l-4.11 1.211q-.125.05-.24.053q-.117.003-.213.003q-.666 0-1.15-.483q-.485-.483-.46-1.188l.1-3.856l-2.629-3.548q-.159-.217-.228-.453T3 10q0-.506.297-.942q.296-.435.828-.618zm.629.86L4.462 9.398q-.289.096-.395.394t.087.548l2.792 3.84l-.12 4.16q-.018.327.232.52t.557.096L12 17.696l4.385 1.285q.307.096.557-.096t.231-.52l-.12-4.184l2.793-3.79q.192-.25.087-.549t-.395-.394l-4.292-1.496l-2.765-3.683q-.173-.25-.481-.25t-.48.25zM12 11.519"/></svg>
                <div className="flex flex-col justify-center items-center w-[80px] bg-slate-300/60 p-1 rounded-lg">
                  <p className="text-[14px] font-light">Note</p>
                  <p className="text-lg font-bold">8,5</p>
                </div>
              </div>
              <div className="w-full grid grid-cols-3 gap-3 mt-2">
                <button className="w-full flex justify-center items-center gap-1 py-2 bg-slate-300/60 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-gray-500" viewBox="0 0 24 24"><path fill="currentColor" d="m12 19.654l-.758-.685q-2.448-2.236-4.05-3.829t-2.529-2.808t-1.295-2.201T3 8.15q0-1.908 1.296-3.204T7.5 3.65q1.32 0 2.475.675T12 6.288Q12.87 5 14.025 4.325T16.5 3.65q1.908 0 3.204 1.296T21 8.15q0 .996-.368 1.98t-1.295 2.202t-2.52 2.808t-4.06 3.83zm0-1.354q2.4-2.17 3.95-3.716t2.45-2.685t1.25-2.015T20 8.15q0-1.5-1-2.5t-2.5-1q-1.194 0-2.204.682t-1.808 2.053h-.976q-.818-1.39-1.818-2.063q-1-.672-2.194-.672q-1.48 0-2.49 1T4 8.15q0 .856.35 1.734t1.25 2.015t2.45 2.675T12 18.3m0-6.825"/></svg>
                  <p className="text-base font-light">0</p>
                </button>
                <button className="w-full flex justify-center items-center gap-1 py-2 bg-slate-300/60 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-gray-500" viewBox="0 0 24 24"><path fill="currentColor" d="M6.5 13.5h11v-1h-11zm0-3h11v-1h-11zm0-3h11v-1h-11zM21 20.077L17.923 17H4.615q-.69 0-1.152-.462T3 15.385V4.615q0-.69.463-1.152T4.615 3h14.77q.69 0 1.152.463T21 4.615zM4.615 16H18.35L20 17.644V4.615q0-.23-.192-.423T19.385 4H4.615q-.23 0-.423.192T4 4.615v10.77q0 .23.192.423t.423.192M4 16V4z"/></svg>
                  <p className="text-base font-light">Commenter</p>
                </button>
                <button className="w-full flex justify-center items-center gap-1 py-2 bg-slate-300/60 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-gray-500" viewBox="0 0 24 24"><path fill="currentColor" d="m12 19.654l-.758-.685q-2.448-2.236-4.05-3.829t-2.529-2.808t-1.295-2.201T3 8.15q0-1.908 1.296-3.204T7.5 3.65q1.32 0 2.475.675T12 6.288Q12.87 5 14.025 4.325T16.5 3.65q1.908 0 3.204 1.296T21 8.15q0 .996-.368 1.98t-1.295 2.202t-2.52 2.808t-4.06 3.83zm0-1.354q2.4-2.17 3.95-3.716t2.45-2.685t1.25-2.015T20 8.15q0-1.5-1-2.5t-2.5-1q-1.194 0-2.204.682t-1.808 2.053h-.976q-.818-1.39-1.818-2.063q-1-.672-2.194-.672q-1.48 0-2.49 1T4 8.15q0 .856.35 1.734t1.25 2.015t2.45 2.675T12 18.3m0-6.825"/></svg>
                  <p className="text-base font-light">Partager</p>
                </button>
              </div>
            </div>
          </div>

          {/* Right side */}
          <div className="w-[60%] h-full pt-8">
            <p className="text-3xl font-extrabold mb-6">{recipeData?.title}</p>
            <div className="mb-8">
              <p className="text-lg font-bold mb-1">Description</p>
              <p className="text-[15px] leading-6 break-words text-balance">
                {/* {recipeData?.description}<br/> */}
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Qui, facere nam at eius dolorum fugiat maxime voluptatum quidem libero sint voluptatem vitae et accusamus, eligendi cum. Quisquam optio temporibus quod.
                Optio, maxime quod necessitatibus voluptatibus, exercitationem odio veritatis architecto tenetur labore ducimus soluta suscipit magnam unde maiores repellat. Praesentium necessitatibus dignissimos ab tempore eaque enim sit, asperiores laborum. Accusantium, aliquam.
                Ratione, suscipit est? Reprehenderit quidem iste exercitationem nisi perferendis id. Magnam labore quasi similique nihil esse eligendi, tempora mollitia enim corporis itaque nobis vel voluptates eveniet aliquid alias natus quis.
              </p>
            </div>
            <div className="mb-12 w-full">
              <div className="flex justify-between items-center mb-1 w-full">
                <p className="text-lg font-bold">Ingrédients</p>
                <button type="button" className="px-3 py-2 text-xs font-medium text-center inline-flex items-center text-white bg-orange-700 rounded-lg hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800" onClick={() => setShowModal(true)}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 me-2" viewBox="0 0 24 24"><path fill="#ffffff" d="M11.5 12.5H6v-1h5.5V6h1v5.5H18v1h-5.5V18h-1z"/></svg>
                  Ajouter un ingrédient
                </button>
              </div>
              <div className="w-full flex flex-wrap gap-2 mt-4">
                {recipeIngs.length > 0 ? (
                  recipeIngs.map((item, index) => (
                    <div className="max-w-md flex items-center gap-1 p-2 bg-white rounded-lg border border-gray-200 shadow-md" key={index}>
                      <div className="w-10 h-10">
                        <img src={ingredients} alt="logo" className="w-full h-full object-contain rounded-lg" />
                      </div>
                      <div className="flex flex-col">
                        <p className="text-sm font-bold">{item.idIngredient.name}</p>
                        <p className="text-[13px] text-gray-500 self-end">{item.quantity} {item.unit === "None" ? "" : item.unit}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-lg font-light italic text-gray-500">Aucun ingrédient pour cette recette</p>
                )}
              </div>
            </div>

            {/* Commentaires */}
            <div className="w-full">
              <div className="w-full flex items-center border-b rounded-md">
                <p className="text-lg font-bold">Commentaires ({commentDatas.length})</p>
              </div>
              <div className="w-full flex p-4 gap-3 border-b rounded-md shadow-sm">
                <div className="w-10 h-10 rounded-sm shadow-md">
                  <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="user" className="w-full h-full rounded-md" />
                </div>
                <form className="w-[calc(100%-40px)] flex flex-col justify-center gap-2" onSubmit={handleSubmitComment}>
                  {/* Comment */}
                  <textarea id="comment" name="content" value={formCommentData.content} rows="3" className="block p-2.5 resize-none w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 outline-none" placeholder="Écrivez votre commentraire..." required onChange={(e) => setFormCommentData({ ...formCommentData, content: e.target.value })} />
                  {/* Rating */}
                  <div className="p-2">
                    <div className="w-full flex justify-between items-center mb-2">
                      <p className="text-sm text-gray-900">Évaluez la recette</p>
                      <p className="text-sm font-bold text-gray-900">{formCommentData.note}/10</p>
                    </div>
                    <input type="range" className="h-4 w-full cursor-grab appearance-none rounded-full bg-gray-300 disabled:cursor-not-allowed" min="0" max="10" step="0.1" value={formCommentData.note} onChange={(e) => setFormCommentData({ ...formCommentData, note: e.target.value })} />
                    <div className="flex justify-between w-full">
                      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                        <label key={value} className="block mb-2 text-sm font-medium text-gray-900">{value}</label>
                      ))}
                    </div>
                  </div>
                  {/* <div className="w-full mt-2">
                    <label htmlFor="bedrooms-input" className="block mb-2 text-sm font-medium text-gray-900">Évaluez la recette (5 étant le maximum)</label>
                    <div className="relative flex items-center w-full">
                      <button type="button" className="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 focus:ring-2 focus:outline-none" onClick={() => setFormCommentData({ ...formCommentData, note: formCommentData.note - 1 < 1 ? 1 : formCommentData.note - 1 })}>
                        <svg className="w-3 h-3 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16"/>
                        </svg>
                      </button>
                      <input type="text" name="note" className="bg-gray-50 border-x-0 border-gray-300 h-11 font-medium text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full pb-6" min={1} max={5} placeholder="" value={formCommentData.note} required onChange={(e) => setFormCommentData({ ...formCommentData, note: e.target.value })} />
                      <div className="absolute bottom-1 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 flex items-center text-xs text-gray-400 space-x-1 rtl:space-x-reverse">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-400" viewBox="0 0 24 24"><path fill="currentColor" d="m7.325 18.923l1.24-5.313l-4.123-3.572l5.431-.47L12 4.557l2.127 5.01l5.43.47l-4.122 3.572l1.24 5.313L12 16.102z"/></svg>
                        <span>Étoiles</span>
                      </div>
                      <button type="button" className="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 focus:ring-2 focus:outline-none" onClick={() => setFormCommentData({ ...formCommentData, note: formCommentData.note + 1 > 5 ? 5 : formCommentData.note + 1 })}>
                        <svg className="w-3 h-3 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
                        </svg>
                      </button>
                    </div>
                  </div> */}
                  {/* Button */}
                  <button type="submit" className="max-w-lg self-end focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-[13px] px-5 py-2.5">Je commente</button>
                </form>
              </div>
              {/* Comments */}
              <div id="comments" className="w-full p-4 max-h-96 flex flex-col gap-6 overflow-auto bg-white">
                {commentDatas.length > 0 ? 
                  commentDatas.map((commentData, index) => (
                    <div key={index} className="w-full flex gap-3">
                      <div className="w-10 h-10 rounded-md shadow-md">
                        <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="user" className="w-full h-full rounded-md" />
                      </div>
                      <div className="w-[calc(100%-40px)] flex flex-col justify-center gap-2">
                        <div className="flex justify-between items-center">
                          <p className="font-bold text-sm text-blue-400">{commentData.author.lastname + ' ' + commentData.author.firstname} <span className="font-normal text-gray-400 text-xs">{transformDate(commentData?.creationDate)}</span></p>
                          <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-yellow-500" viewBox="0 0 24 24"><path fill="currentColor" d="m7.325 18.923l1.24-5.313l-4.123-3.572l5.431-.47L12 4.557l2.127 5.01l5.43.47l-4.122 3.572l1.24 5.313L12 16.102z"/></svg>
                            <p className="font-bold text-sm">{commentData.note}</p>
                          </div>
                        </div>
                        <p className="text-[13px]">{commentData.content}</p>
                      </div>
                    </div>
                  ))
                  :
                  <p className="text-center text-gray-400">Aucun commentaire pour le moment</p>
                }
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add ingredients */}
      {/* Overlay */}
      <div id="modal" className={`fixed top-0 bottom-0 left-0 right-0 bg-black/50 ${showModal ? "translate-x-0" : "-translate-x-[200%]"} transition-all duration-300 z-20`} onClick={() => setShowModal(false)}>
        <div className="w-full h-full flex justify-center items-center">
          <div onClick={(e) => e.stopPropagation()} className="flex flex-col w-[400px] bg-white rounded-xl p-4">
            <div className="w-full flex justify-between items-center">
              <p className="text-2xl text-gray-900 font-extrabold max-w-[200px]">Ingredients</p>
              <div className="w-8 h-8 p-2 rounded-full border border-gray-400 hover:bg-gray-100 cursor-pointer" onClick={() => setShowModal(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="m-auto" viewBox="0 0 24 24"><path fill="#000000" d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z"/></svg>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2 max-w-[300px]">Et si on ajoutait un zeste de sel et d{`'`}épices dans tout ça ? 😋</p>
            <div className="mt-6">
              <form>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-500" viewBox="0 0 24 24"><path fill="currentColor" d="M6.5 11L12 2l5.5 9zm11 11q-1.875 0-3.187-1.312T13 17.5t1.313-3.187T17.5 13t3.188 1.313T22 17.5t-1.312 3.188T17.5 22M3 21.5v-8h8v8zM17.5 20q1.05 0 1.775-.725T20 17.5t-.725-1.775T17.5 15t-1.775.725T15 17.5t.725 1.775T17.5 20M5 19.5h4v-4H5zM10.05 9h3.9L12 5.85zm7.45 8.5"/></svg>
                  </div>
                  <input type="text" name="name" value={ingredient.name} className="block w-full p-2.5 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Ingrédient" required onChange={(e) => setIngredient({ ...ingredient, name: e.target.value })} />
                </div>
                <div className="w-full grid grid-cols-2 gap-2 mt-2">
                  <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-500" viewBox="0 0 24 24"><path fill="currentColor" d="M6.5 11L12 2l5.5 9zm11 11q-1.875 0-3.187-1.312T13 17.5t1.313-3.187T17.5 13t3.188 1.313T22 17.5t-1.312 3.188T17.5 22M3 21.5v-8h8v8zM17.5 20q1.05 0 1.775-.725T20 17.5t-.725-1.775T17.5 15t-1.775.725T15 17.5t.725 1.775T17.5 20M5 19.5h4v-4H5zM10.05 9h3.9L12 5.85zm7.45 8.5"/></svg>
                    </div>
                    <input type="number" name="quantity" value={ingredient.quantity} min={1} max={1000} className="block w-full p-2.5 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 outline-none focus:ring-blue-500 focus:border-blue-500" required onChange={(e) => setIngredient({ ...ingredient, quantity: e.target.value })} />
                  </div>
                  <select name="unit" value={ingredient.unit} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" onChange={(e) => setIngredient({ ...ingredient, unit: e.target.value })}>
                    <option>Unité de mesure</option>
                    <option value="None">Pas d{`'`}unité</option>
                    <option value="Kg">Kilogrammes(Kg)</option>
                    <option value="g">Grammes(G)</option>
                    <option value="L">Litres(L)</option>
                    <option value="Cuillères à soupe">Cuillères à soupe</option>
                  </select>
                </div>
                <button type="button" className="w-full flex justify-center items-center text-white bg-pink-600 border border-gray-300 focus:outline-none hover:bg-pink-700 focus:ring-4 focus:ring-pink-100 font-medium rounded-lg text-sm mt-2 px-5 py-2" onClick={() => newIngredient(ingredient)}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white mr-2" viewBox="0 0 24 24"><path fill="#ffffff" d="M11.5 16.5h1v-4h4v-1h-4v-4h-1v4h-4v1h4zM5.615 20q-.69 0-1.152-.462T4 18.385V5.615q0-.69.463-1.152T5.615 4h12.77q.69 0 1.152.463T20 5.615v12.77q0 .69-.462 1.152T18.385 20z"/></svg>
                  Ajouter
                </button>
              </form>
              <div className="w-full flex flex-wrap items-center gap-1 my-4 p-2 border-dashed border-2 border-gray-300 rounded-lg">
                {ingredientsData.ingredients.length === 0 ? (
                  <div className="w-full h-full flex justify-center items-center">
                    <p className="text-gray-500 text-sm">Vos ingrédients ici</p>
                  </div>
                ) : (
                  ingredientsData?.ingredients.map((ingredient, index) => (
                    <div key={index} className="flex p-1 gap-2 rounded-md border-2 border-green-300 bg-green-50">
                      <div onClick={() => removeIngredient(ingredient.name)}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-900" viewBox="0 0 24 24"><path fill="currentColor" d="m8.4 16.308l3.6-3.6l3.6 3.6l.708-.708l-3.6-3.6l3.6-3.6l-.708-.708l-3.6 3.6l-3.6-3.6l-.708.708l3.6 3.6l-3.6 3.6zM12.003 21q-1.866 0-3.51-.708q-1.643-.709-2.859-1.924t-1.925-2.856T3 12.003t.708-3.51t1.924-2.859t2.856-1.925T11.997 3t3.51.708t2.859 1.924t1.925 2.856t.709 3.509t-.708 3.51t-1.924 2.859t-2.856 1.925t-3.509.709M12 20q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8"/></svg>
                      </div>
                      <p className="text-green-600 text-xs">{ingredient.name} - {ingredient.quantity} {ingredient.unit === "None" ? "" : ingredient.unit}</p>
                    </div>
                  ))
                )}
              </div>
              <button type="button" className={`flex justify-center items-center gap-2 ${!isLoading && "text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300"} font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-4 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-600`} disabled={isLoading} onClick={handleSubmit}>
                Sauvegarder
                {isLoading && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" viewBox="0 0 24 24"><rect width="6" height="14" x="1" y="4" fill="currentColor"><animate id="svgSpinnersBarsScaleFade0" fill="freeze" attributeName="y" begin="0;svgSpinnersBarsScaleFade1.end-0.25s" dur="0.75s" values="1;5"/><animate fill="freeze" attributeName="height" begin="0;svgSpinnersBarsScaleFade1.end-0.25s" dur="0.75s" values="22;14"/><animate fill="freeze" attributeName="opacity" begin="0;svgSpinnersBarsScaleFade1.end-0.25s" dur="0.75s" values="1;.2"/></rect><rect width="6" height="14" x="9" y="4" fill="#ffffff" opacity=".4"><animate fill="freeze" attributeName="y" begin="svgSpinnersBarsScaleFade0.begin+0.15s" dur="0.75s" values="1;5"/><animate fill="freeze" attributeName="height" begin="svgSpinnersBarsScaleFade0.begin+0.15s" dur="0.75s" values="22;14"/><animate fill="freeze" attributeName="opacity" begin="svgSpinnersBarsScaleFade0.begin+0.15s" dur="0.75s" values="1;.2"/></rect><rect width="6" height="14" x="17" y="4" fill="#ffffff" opacity=".3"><animate id="svgSpinnersBarsScaleFade1" fill="freeze" attributeName="y" begin="svgSpinnersBarsScaleFade0.begin+0.3s" dur="0.75s" values="1;5"/><animate fill="freeze" attributeName="height" begin="svgSpinnersBarsScaleFade0.begin+0.3s" dur="0.75s" values="22;14"/><animate fill="freeze" attributeName="opacity" begin="svgSpinnersBarsScaleFade0.begin+0.3s" dur="0.75s" values="1;.2"/></rect></svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      
      {/* Success message */}
      <div className={`fixed bottom-8 left-4 flex items-center gap-1 rounded-lg bg-green-100 p-2 ${isSuccess ? "translate-x-0" : "-translate-x-[200%]"} transition-all duration-300`}>
        <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Winking%20Face.png" alt="Winking Face" className="w-10 h-10" />
        <p className="text-base text-green-600">{successMessage}</p>
        <div onClick={() => setIsSuccess(false)}>
          <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 cursor-pointer" width="15" height="15" viewBox="0 0 24 24"><path fill="#16a34a" d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z"/></svg>
        </div>
      </div>
    </div>
  )
}

export default Recipe