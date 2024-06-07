/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { banner2, nofood } from "../assets"
import Navbar from "../components/Navbar"
import RecipeCard from "../components/RecipeCard"
import { addCategory, fetchCategories } from "../services/category"
import { fetchUser } from "../utils"
import { addRecipe, fetchRecipesByCategory } from "../services/recipe"

const Feed = () => {
  const { result } = fetchUser()
  const [formCategoryData, setFormCategoryData] = useState({ name: '', user: result._id })
  const [recipeCategories, setRecipeCategories] = useState([])
  const [formRecipeData, setFormRecipeData] = useState({ title: '', description: '', picture: '', idCategory: recipeCategories?.length > 0 ? recipeCategories[0]._id : '', idMembre: result._id })
  const [recipesByCategories, setRecipesByCategories] = useState([])

  const [selected, setSelected] = useState("Nouveautés")
  const [successMessage, setSuccessMessage] = useState("")
  const [openModal, setOpenModal] = useState(false)
  const [modalType, setModalType] = useState("")


  // Accessories
  const [isSuccess, setIsSuccess] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isTop, setIsTop] = useState(true)

  const enableModal = (type) => {
    setOpenModal(true)
    setModalType(type)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (formCategoryData.name === '') return

    console.log(formCategoryData);

    await addCategory('', formCategoryData)
    .then((response) => {
      if (response?.status === 201) {
        setIsSuccess(true)
        setSuccessMessage("Catégorie ajoutée avec succès !")
        setTimeout(() => {
          setIsSuccess(false)
        }, 3000)
      }
    })

    emptyAll()
    window.location.reload()
  }

  const handleSubmitRecipe = async (e) => {
    e.preventDefault()

    if (formRecipeData.title === '' || formRecipeData.description === '' || formRecipeData.picture === '') return

    // console.log(formRecipeData);
    await addRecipe(formRecipeData)
    .then((response) => {
      if (response?.status === 201) {
        setIsSuccess(true)
        setSuccessMessage("Recette ajoutée avec succès !")
        setTimeout(() => {
          setIsSuccess(false)
        }, 3000)
      }
    })

    emptyAll()
    window.location.reload()
  }

  useEffect(() => {
    fetchCategories()
    .then(({ data }) => {
      setRecipeCategories(data)
      setFormRecipeData({ ...formRecipeData, idCategory: data[0]._id })
    })
  }, [])

  useEffect(() => {
    if (recipeCategories.length > 0) {
      recipeCategories.map((category) => {
        fetchRecipesByCategory(category._id)
        .then(({ data }) => {
          // console.log(data);
          setRecipesByCategories((prev) => [...prev, { categoryName: category.name, recipes: data }])
        })
      })
    }
  }, [recipeCategories.length])

  const uploadImages = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = () => {
      const file = input.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setFormRecipeData({ ...formRecipeData, picture: reader.result });
      };
    };
  }

  document.body.style.overflow = openModal ? 'hidden' : 'auto'

  const emptyAll = () => {
    setFormCategoryData({ ...formCategoryData, name: '' })
    setFormRecipeData({ ...formRecipeData, title: '', description: '', picture: '', idCategory: recipeCategories?.length > 0 ? recipeCategories[0]._id : '' })
    setOpenModal(false)
  }

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
    if (e.target.id === "modal") {
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
    <div className="w-full h-full relative overflow-hidden">
      <div className="w-full flex h-[500px] relative overflow-hidden">
        <img src={banner2} alt="banner" className="w-full h-full object-cover" />
        <div className="w-full h-full absolute inset-x-0">
          <Navbar />
          <div className="w-full flex flex-col justify-center items-center">
            <h1 className="text-5xl font-extrabold max-w-3xl text-gray-800 text-center">Recettes inspirantes pour la vie de tous les jours</h1>
            <p className="text-xl text-gray-700 font-bold max-w-3xl text-center mt-4">Gérez vos recettes en toute simplicité</p>
            <div className="mt-8">
              <p className="text-base text-gray-700 font-semibold max-w-3xl text-center">
                Partagez des recettes avec vos amis et découvrez de nouvelles recettes.
              </p>
              <p className="text-base text-gray-700 font-semibold max-w-3xl text-center">
                Plus de <span className="text-pink-700 font-bold">10 000 recettes</span> de partout ailleurs.
              </p>
            </div>
            <div className="w-full flex justify-center mt-8 gap-4">
              <button className="w-56 px-4 py-4 rounded-full bg-pink-600 text-white font-bold hover:bg-pink-700 transition-all" onClick={() => enableModal("recipe")}>
                Ajouter une recette
              </button>
              <button className="w-56 px-4 py-4 rounded-full bg-white/80 text-pink-600 font-bold hover:bg-white transition-all" onClick={() => enableModal("category")}>
                Nouvelle catégorie
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col px-[145px] pb-8">
        {/* Categories */}
        <div className="sticky top-0 px-2 pt-[70px] bg-slate-200 z-10">
          <div id="slider" className="flex items-center overflow-auto border-b border-gray-400 gap-2 relative">
            <a href="#nouveautés" className="group">
              <div className="px-4 py-2 h-full flex justify-center items-center cursor-pointer transition-all">
                <p className={`font-bold text-2xl tracking-[-0.08em] text-gray-500 capitalize ${selected.toLowerCase() === "nouveautés" && "text-gray-800"} group-hover:text-gray-800 whitespace-nowrap transition-all duration-300`}>Nouveautés</p>
              </div>
              <div className={`w-full border border-b-[5px] border-b-black bg-gray-400 ${selected.toLowerCase() === "nouveautés" ? "scale-100 border-b-pink-600" : "scale-0 group-hover:scale-100 group-hover:border-b-pink-600"} transition-all duration-300`}></div>
            </a>
            {recipeCategories.map((category, index) => (
              <a href={`#${category.name.toLowerCase()}`} key={index} className="group" onClick={() => setSelected(category.name.toLowerCase())}>
                <div className="px-4 py-2 h-full flex justify-center items-center cursor-pointer transition-all">
                  <p className={`font-bold text-2xl tracking-[-0.08em] text-gray-500 capitalize ${selected.toLowerCase() === category?.name.toLowerCase() && "text-gray-800"} group-hover:text-gray-800 whitespace-nowrap transition-all duration-300`}>{category.name}</p>
                </div>
                <div className={`w-full border border-b-[5px] border-b-black bg-gray-400 ${selected.toLowerCase() === category?.name.toLowerCase() ? "scale-100 border-b-pink-600" : "scale-0 group-hover:scale-100 group-hover:border-b-pink-600"} transition-all duration-300`}></div>
              </a>
              ))
            }
          </div>

          {/* Right and Left arrows */}
          <div className="absolute top-1/2 -left-[50px] w-12 h-12 bg-pink-600 rounded-full flex justify-center items-center cursor-pointer hover:bg-pink-700 transition-all" onClick={() => slideLeft()}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" viewBox="0 0 24 24"><path fill="currentColor" d="m14 18l-6-6l6-6l1.4 1.4l-4.6 4.6l4.6 4.6z"/></svg>
          </div>
          <div className="absolute top-1/2 -right-[50px] w-12 h-12 bg-pink-600 rounded-full flex justify-center items-center cursor-pointer hover:bg-pink-700 transition-all" onClick={() => slideRight()}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white rotate-180" viewBox="0 0 24 24"><path fill="currentColor" d="m14 18l-6-6l6-6l1.4 1.4l-4.6 4.6l4.6 4.6z"/></svg>
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="w-full mt-8">
          <div className="flex gap-1 items-center">
            <p className="text-neutral-500 text-base tracking-tighter">Accueil</p>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-neutral-500 rotate-180" viewBox="0 0 24 24"><path fill="currentColor" d="m14 18l-6-6l6-6l1.4 1.4l-4.6 4.6l4.6 4.6z"/></svg>
            <p className="text-neutral-500 text-base tracking-tighter">Recettes</p>
          </div>
        </div>

        {/* Recipes */}
        <div className="mt-10 flex flex-col gap-8">
          {/* <div id="nouveautés">
            <p className="text-xl text-gray-900 font-extralight uppercase tracking-tighter mb-4 mt-4">nouveautés</p>
            <div className="w-full flex flex-wrap items-center gap-5">
              <RecipeCard />
            </div>
          </div> */}
          {recipeCategories.map((category) => (
            <div key={category.name} id={category.name.toLowerCase()}>
              <p className="text-2xl text-gray-900 font-extrabold uppercase tracking-tighter mb-4 mt-4">{category.name}</p>
              <div className="w-full flex flex-wrap gap-8">
                {recipesByCategories?.length > 0 ?
                  recipesByCategories.map((categoryRecipe) => (
                    categoryRecipe?.categoryName === category.name && (
                      categoryRecipe?.recipes?.length > 0 ? (
                        categoryRecipe?.recipes?.map((recipe, index) => (
                          <div key={index}>
                            <RecipeCard recipe={recipe} />
                          </div>
                        ))
                      ) : (
                        <div className="w-[255px] h-[300px] rounded-lg shadow-xl">
                          <div className="w-full h-full flex flex-col gap-8 justify-center items-center bg-white rounded-lg">
                            <img src={nofood} alt="No food category" width="130" height="130" />
                            <p className="max-w-[200px] text-xl text-gray-900 font-bold tracking-tighter text-center">Aucune recette pour cette catégorie</p>
                          </div>
                        </div>
                      )
                    )
                  ))
                : (
                  <div className="w-[255px] h-[300px] rounded-lg shadow-xl">
                    <div className="w-full h-full flex flex-col gap-8 justify-center items-center bg-white rounded-lg">
                      <img src={nofood} alt="No food category" width="130" height="130" />
                      <p className="max-w-[200px] text-xl text-gray-900 font-bold tracking-tighter text-center">Aucune recette pour cette catégorie</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Categorie */}
      {/* Overlay */}
      <div className={`fixed inset-0 bg-black/50 z-50 ${openModal ? "flex" : "hidden"}`}>
        <div id="modal" className="w-full h-full flex justify-center items-center">
          {/* Modal Category */}
          {modalType === "category" && (
            <div className="flex flex-col w-[400px] bg-white rounded-xl p-4">
              <div className="w-full flex justify-between items-center">
                <p className="text-2xl text-gray-900 font-extrabold">Nouvelle catégorie</p>
                <div className="w-8 h-8 p-2 rounded-full border border-gray-400 hover:bg-gray-100 cursor-pointer" onClick={emptyAll}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="m-auto" viewBox="0 0 24 24"><path fill="#000000" d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z"/></svg>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-2 max-w-[300px]">Super! Quelle autre catégorie allez-vous nous faire découvrir ?</p>
              <form className="mt-6" onSubmit={handleSubmit}>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-500" viewBox="0 0 24 24"><path fill="currentColor" d="M6.5 11L12 2l5.5 9zm11 11q-1.875 0-3.187-1.312T13 17.5t1.313-3.187T17.5 13t3.188 1.313T22 17.5t-1.312 3.188T17.5 22M3 21.5v-8h8v8zM17.5 20q1.05 0 1.775-.725T20 17.5t-.725-1.775T17.5 15t-1.775.725T15 17.5t.725 1.775T17.5 20M5 19.5h4v-4H5zM10.05 9h3.9L12 5.85zm7.45 8.5"/></svg>
                  </div>
                  <input type="text" value={formCategoryData.name} name="name" className="block w-full p-2.5 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Nom de la catégorie" required onChange={(e) => setFormCategoryData({ ...formCategoryData, name: e.target.value })} />
                </div>
                <button type="submit" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-4">Sauvegarder</button>
              </form>
            </div>
          )}
          
          {/* Modal Recipe */}
          {modalType === "recipe" && (
            <div className="flex bg-white rounded-xl p-4 gap-4">
              {/* Picture */}
              <div className="flex flex-col justify-center items-center gap-2">
                <div className="w-[300px] h-[300px] flex justify-center items-center bg-gray-200 border-dashed border-2 rounded-xl overflow-hidden">
                  {formRecipeData.picture ? (
                    <img src={formRecipeData.picture} alt="recipe" className="w-full h-full object-contain" />
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="m-auto w-36 h-36 text-gray-400" viewBox="0 0 24 24"><path fill="currentColor" d="M22 12.698c-.002 1.47-.013 2.718-.096 3.743c-.097 1.19-.296 2.184-.74 3.009a4.18 4.18 0 0 1-.73.983c-.833.833-1.893 1.21-3.237 1.39C15.884 22 14.2 22 12.053 22h-.106c-2.148 0-3.83 0-5.144-.177c-1.343-.18-2.404-.557-3.236-1.39c-.738-.738-1.12-1.656-1.322-2.795c-.2-1.12-.236-2.512-.243-4.241C2 12.957 2 12.492 2 12v-.054c0-2.148 0-3.83.177-5.144c.18-1.343.557-2.404 1.39-3.236c.832-.833 1.893-1.21 3.236-1.39c1.168-.157 2.67-.175 4.499-.177a.697.697 0 1 1 0 1.396c-1.855.002-3.234.018-4.313.163c-1.189.16-1.906.464-2.436.994S3.72 5.8 3.56 6.99C3.397 8.2 3.395 9.788 3.395 12v.784l.932-.814a2.14 2.14 0 0 1 2.922.097l3.99 3.99a1.86 1.86 0 0 0 2.385.207l.278-.195a2.79 2.79 0 0 1 3.471.209l2.633 2.37c.265-.557.423-1.288.507-2.32c.079-.972.09-2.152.091-3.63a.698.698 0 0 1 1.396 0"/><path fill="#ffffff" fillRule="evenodd" d="M17.5 11c-2.121 0-3.182 0-3.841-.659C13 9.682 13 8.621 13 6.5c0-2.121 0-3.182.659-3.841C14.318 2 15.379 2 17.5 2c2.121 0 3.182 0 3.841.659C22 3.318 22 4.379 22 6.5c0 2.121 0 3.182-.659 3.841c-.659.659-1.72.659-3.841.659m.75-6.5a.75.75 0 0 0-1.5 0v1.25H15.5a.75.75 0 0 0 0 1.5h1.25V8.5a.75.75 0 0 0 1.5 0V7.25h1.25a.75.75 0 0 0 0-1.5h-1.25z" clipRule="evenodd"/></svg>
                  )}
                </div>
                <button type="button" className="flex gap-2 mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:text-gray-300" onClick={uploadImages} disabled={isProcessing}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="#ffffff" d="M19 7V5h-2V3h2V1h2v2h2v2h-2v2zm-8 10.5q1.875 0 3.188-1.312T15.5 13q0-1.875-1.312-3.187T11 8.5q-1.875 0-3.187 1.313T6.5 13q0 1.875 1.313 3.188T11 17.5m0-2q-1.05 0-1.775-.725T8.5 13q0-1.05.725-1.775T11 10.5q1.05 0 1.775.725T13.5 13q0 1.05-.725 1.775T11 15.5M3 21q-.825 0-1.412-.587T1 19V7q0-.825.588-1.412T3 5h3.15L8 3h7v4h2v2h4v10q0 .825-.587 1.413T19 21z"/></svg>
                  {formRecipeData.picture !== "" ? "Modifier l'image" : "Ajouter une image"}
                </button>
                {formRecipeData.picture !== "" &&
                  <button type="button" className="flex items-center gap-1 text-xs text-red-500 mt-2" onClick={() => setFormRecipeData({ ...formRecipeData, picture: "" })}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-red-500" viewBox="0 0 24 24"><path fill="currentColor" d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z"/></svg>
                    Retirer l{`'`}image
                  </button>
                }
              </div>

              {/* Inputs */}
              <form className="flex flex-col justify-between w-full" onSubmit={handleSubmitRecipe}>
                <div className="flex flex-col gap-4 w-full">
                  <div className="w-[400px]">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Nom de la recette</label>
                    <input type="text" name="title" value={formRecipeData.title} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none" placeholder="Ex : Poche de fenouil" required onChange={(e) => setFormRecipeData({ ...formRecipeData, title: e.target.value })} />
                  </div>
                  <div className="w-[400px]">
                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">Description</label>
                    <textarea id="message" name="description" value={formRecipeData.description} rows="8" className="block p-2.5 resize-none w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 outline-none" placeholder="Description de la recette..." required onChange={(e) => setFormRecipeData({ ...formRecipeData, description: e.target.value })} />
                  </div>
                  <div className="w-[400px]">
                    <label htmlFor="idCategory" className="block mb-2 text-sm font-medium text-gray-900">Select an option</label>
                    <select id="idCategory" name="categories" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none" required onChange={(e) => setFormRecipeData({ ...formRecipeData, idCategory: e.target.value })}>
                      {recipeCategories.map((category) => (
                        <option key={category._id} value={category._id}>{category.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="w-full flex justify-start items-center gap-2 mt-4">
                  <button type="submit" className="w-full focus:outline-none text-white bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:ring-pink-300 font-medium rounded-lg text-sm px-5 py-2.5">Enregistrer</button>
                  <button type="button" className="w-full text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5" onClick={emptyAll}>Annuler</button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Success message */}
      <div className={`fixed bottom-8 right-4 flex items-center gap-1 rounded-lg bg-green-100 p-2 ${isSuccess ? "translate-x-0" : "translate-x-[200%]"} transition-all duration-300`}>
        <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Star-Struck.png" alt="Star-Struck" className="w-10 h-10" />
        <p className="text-base text-green-600">{successMessage}</p>
        <div onClick={() => setIsSuccess(false)}>
          <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 cursor-pointer" width="15" height="15" viewBox="0 0 24 24"><path fill="#16a34a" d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z"/></svg>
        </div>
      </div>

      {/* To top button */}
      <div className={`fixed bottom-12 right-4 p-2 ${!isTop ? "translate-x-0" : "translate-x-[200%]"} flex justify-center items-center bg-pink-600 rounded-full cursor-pointer hover:bg-pink-700 transition-all duration-500`} onClick={scrollToTop}>
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white rotate-90" viewBox="0 0 24 24"><path fill="currentColor" d="m14 18l-6-6l6-6l1.4 1.4l-4.6 4.6l4.6 4.6z"/></svg>
        <p className="text-white text-xs">Haut de page</p>
      </div>
    </div>
  )
}

export default Feed