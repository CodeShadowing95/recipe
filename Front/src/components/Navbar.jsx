/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom"
import { ingredientImage, logo } from "../assets"
import { fetchUser } from "../utils"
import { useEffect, useState } from "react";
import { addCategory, fetchCategories } from "../services/category";
import { addRecipe } from "../services/recipe";
import Spinner from "./Spinner";

const Navbar = ({ onSuccess }) => {
  const { result: user } = fetchUser();
  const navigate = useNavigate()
  // const [userInitials, setUserInitials] = useState("")

  const [formCategoryData, setFormCategoryData] = useState({ name: '', user: user._id })
  const [recipeCategories, setRecipeCategories] = useState([])
  const [formRecipeData, setFormRecipeData] = useState({ title: '', description: '', preparation: '', duration: 1, difficulty: 1, picture: '', ingredients: [], idCategory: recipeCategories?.length > 0 ? recipeCategories[0]._id : '', idMembre: user._id })
  const [ingredient, setIngredient] = useState({ name: '', quantity: 1, unit: 'No-unit' })

  const [modalType, setModalType] = useState("")
  const [openModal, setOpenModal] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [toggleRecipeDropdown, setToggleRecipeDropdown] = useState(false)
  const [toggleProfileDropdown, setToggleProfileDropdown] = useState(false)

  

  const logout = () => {
    localStorage.clear()
    navigate('/auth')
  }

  const enableModal = (type) => {
    setOpenModal(true)
    setModalType(type)
  }

  const newIngredient = (ing) => {
    if (ing.name === '') return

    setFormRecipeData({ ...formRecipeData, ingredients: [...formRecipeData.ingredients, ing] })

    setIngredient({ name: '', quantity: 1, unit: 'No-unit' })
  }

  const removeIngredient = (name) => {
    setFormRecipeData({ ...formRecipeData, ingredients: formRecipeData.ingredients.filter(ing => ing.name !== name) })
  }

  const handleSubmitCategory = async (e) => {
    e.preventDefault()

    if (formCategoryData.name === '') return

    console.log(formCategoryData);

    await addCategory(formCategoryData)
    .then((response) => {
      if (response?.status === 201) {
        onSuccess("Catégorie ajoutée avec succès !")
        setTimeout(() => {
          onSuccess("")
        }, 3000)
      }
    })

    emptyAll()
    window.location.reload()
  }

  const handleSubmitRecipe = async (e) => {
    e.preventDefault()

    if (formRecipeData.title === '' || formRecipeData.description === '' || formRecipeData.preparation === '' || formRecipeData.picture === '') return

    setIsProcessing(true)

    console.log(formRecipeData);

    await addRecipe(formRecipeData)
    .then(async (res) => {
      if (res?.status === 201) {
        onSuccess("Recette ajoutée avec succès !")
        setTimeout(() => {
          onSuccess("")
        }, 3000)
      }
    })
    .catch((err) => {
      console.log(err);
    })

    setIsProcessing(false)
    emptyAll()
    // setTimeout(() => {
    //   window.location.reload()
    // }, 1000)
  }

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
    setFormRecipeData({ ...formRecipeData, title: '', description: '', picture: '', preparation: '', duration: 1, difficulty: 1, ingredients: [], idCategory: recipeCategories?.length > 0 ? recipeCategories[0]._id : '' })
    setIngredient({ name: '', quantity: 1, unit: 'No-unit' })
    setOpenModal(false)
    setToggleRecipeDropdown(false)
  }

  // Get user initials
  // useEffect(() => {
  //   const getInitials = () => {
  //     if (user) {
  //       setUserInitials(user?.firstname.charAt(0).toUpperCase() + user?.lastname.charAt(0).toUpperCase())
  //     }
  //   }
  //   getInitials()
  // }, [user])

  // Categories
  useEffect(() => {
    fetchCategories()
    .then(({ data }) => {
      setRecipeCategories(data)
      setFormRecipeData({ ...formRecipeData, idCategory: data[0]?._id })
    })
  }, [])

  const discardModalWhenClickOutside = (e) => {
    if (e.target.id === "navbar" || e.target.id === "modal" || e.target.id === "root") {
      emptyAll()
    }
  }
  useEffect(() => {
    document.addEventListener("click", discardModalWhenClickOutside);
    return () => document.removeEventListener("click", discardModalWhenClickOutside);
  }, []);

  return (
    <div id="navbar" className="w-full h-[100px] flex justify-between items-center px-11 relative">
      <ul className="flex items-center gap-6">
        <li className="flex items-center text-gray-700 text-sm font-semibold gap-1 cursor-pointer relative hover:text-gray-600" onClick={() => setToggleRecipeDropdown(!toggleRecipeDropdown)}>
          Recettes
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-700" viewBox="0 0 24 24"><path fill="currentColor" d="M12 14.708L6.692 9.4l.708-.708l4.6 4.6l4.6-4.6l.708.708z"/></svg>

          {/* Dropdown */}
          <div className={`${toggleRecipeDropdown ? 'block' : 'hidden'} absolute -bottom-3 left-0 w-[180px] bg-white border shadow-lg translate-y-full p-3 rounded-lg z-10`}>
            <div className="w-full flex justify-between items-center px-2 py-3 hover:bg-gray-50 rounded-lg cursor-pointer">
              <p className="text-gray-700 text-xs">Gérer mes recettes</p>
            </div>
            <div className="w-full h-[1px] bg-gray-200 my-2" />
            <div className="w-full flex justify-between items-center px-2 py-3 mb-2 hover:bg-gray-50 rounded-lg cursor-pointer" onClick={() => enableModal("category")}>
              <p className="text-gray-700 text-xs font-semibold">Nouvelle catégorie</p>
            </div>
            <div className="w-full flex justify-between items-center px-2 py-3 bg-gray-900 rounded-lg cursor-pointer" onClick={() => enableModal("recipe")}>
              <p className="text-white text-xs font-semibold">Nouvelle recette</p>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24"><path fill="#ffffff" d="M11 17h2v-4h4v-2h-4V7h-2v4H7v2h4zm1 5q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8"/></svg>
            </div>
          </div>
        </li>
        <li className="flex items-center text-gray-700 text-sm font-semibold gap-1 cursor-pointer hover:text-gray-600">
          Inspirations
        </li>
        <li className="flex items-center text-gray-700 text-sm font-semibold gap-1 cursor-pointer hover:text-gray-600">
          Blogs
        </li>
        <li className="flex items-center text-gray-700 text-sm font-semibold gap-1 cursor-pointer hover:text-gray-600">
          Communauté
        </li>
      </ul>

      <a href="/">
        <img src={logo} alt="logo" className="w-[200px] h-[80px]" />
      </a>

      <div className="flex items-center gap-6">
        <div className="relative w-[260px]">
          <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
          </div>
          <input type="search" id="search" className="block w-full py-2.5 px-3 ps-12 text-sm text-gray-900 rounded-full bg-slate-100 focus:ring-blue-500 focus:border-blue-500 outline-none" placeholder="Rechercher..." required />
        </div>
        <div className="w-10 h-10 cursor-pointer relative" onClick={() => setToggleProfileDropdown(!toggleProfileDropdown)}>
          <img src={user?.avatar} alt="avatar" className="w-full h-full rounded-full" />
          
          {/* Dropdown profile */}
          <div onClick={(e) => e.stopPropagation()} className={`${toggleProfileDropdown ? 'block' : 'hidden'} absolute -bottom-3 right-0 w-[250px] p-2 bg-white border shadow-lg translate-y-full rounded-lg z-10`}>
            <div className="w-full">
              {/* profile */}
              <div className="w-full h-[150px] bg-gray-100 flex flex-col justify-center items-center rounded-lg">
                <img src={user?.avatar} alt="avatar" className="w-16 h-16 rounded-full" />
                <p className="text-gray-900 text-base font-semibold mt-2 max-w-[150px]">{user?.firstname} {user?.lastname}</p>
                <p className="text-gray-700 text-xs font-light">{user?.email}</p>
              </div>
              <div className="w-full bg-white py-2 rounded-b-lg">
                <div className="w-full flex items-center gap-1 cursor-pointer hover:bg-gray-100 rounded-lg p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-700" viewBox="0 0 24 24"><path fill="currentColor" d="M12 11.385q-1.237 0-2.119-.882T9 8.385t.881-2.12T12 5.386t2.119.88t.881 2.12t-.881 2.118t-2.119.882m-7 7.23V16.97q0-.619.36-1.158t.97-.838q1.416-.679 2.833-1.018t2.837-.34t2.837.34t2.832 1.018q.61.298.97.838T19 16.969v1.646zm1-1h12v-.646q0-.332-.214-.625t-.594-.494q-1.234-.598-2.546-.916T12 14.615t-2.646.319t-2.546.916q-.38.202-.594.494Q6 16.637 6 16.97zm6-7.23q.825 0 1.413-.588T14 8.385t-.587-1.413T12 6.385t-1.412.587T10 8.385t.588 1.412t1.412.588m0 7.23"/></svg>
                  <p className="text-gray-700 text-[13px] leading-5">Mon profil</p>
                </div>
                <div className="w-full flex justify-between items-center cursor-pointer hover:bg-gray-100 rounded-lg p-2">
                  <div className="flex gap-1 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-700" viewBox="0 0 24 24"><path fill="currentColor" d="M14.5 21q-1.858 0-3.497-.707q-1.64-.708-2.864-1.932t-1.932-2.864t-.707-3.49q0-1.875.71-3.512q.711-1.637 1.93-2.856t2.864-1.928T14.5 3q.812 0 1.558.138t1.442.443q-1.833 1.498-2.916 3.674T13.5 12t1.084 4.745T17.5 20.42q-.696.304-1.442.443Q15.312 21 14.5 21m0-1h.525q.25 0 .475-.05q-1.425-1.65-2.212-3.687T12.5 12t.788-4.262T15.5 4.05Q15.275 4 15.025 4H14.5q-3.325 0-5.663 2.338T6.5 12t2.338 5.663T14.5 20m-2-8"/></svg>
                    <p className="text-gray-700 text-[13px] leading-5">Mode sombre</p>
                  </div>
                  <form className="inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 dark:peer-focus:ring-orange-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-orange-600"></div>
                  </form>
                </div>

                <div className="w-full h-[0.5px] bg-gray-200 my-1" />

                <div className="w-full flex items-center gap-1 cursor-pointer hover:bg-gray-100 rounded-lg p-2" onClick={() => logout()}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-700" viewBox="0 0 24 24"><path fill="currentColor" d="M12 12q-.213 0-.357-.144T11.5 11.5V3.346q0-.212.144-.356T12 2.846t.356.144t.143.356V11.5q0 .213-.144.356Q12.212 12 12 12m.002 8q-1.664 0-3.12-.626q-1.454-.626-2.542-1.713t-1.713-2.542T4 12q0-1.467.529-2.828t1.498-2.445q.134-.177.341-.165t.376.182q.143.143.118.331t-.16.365q-.829.939-1.265 2.12Q5 10.74 5 12q0 2.925 2.038 4.963T12 19t4.963-2.037T19 12q0-1.256-.434-2.445q-.433-1.188-1.274-2.126q-.134-.171-.16-.367q-.024-.196.116-.335q.165-.165.37-.168t.344.168q.975 1.085 1.506 2.441T20 12q0 1.665-.626 3.119t-1.713 2.542t-2.542 1.713t-3.118.626"/></svg>
                  <p className="text-gray-700 text-[13px] leading-5">Déconnexion</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="flex justify-center w-6 h-6 items-center rounded-full bg-orange-600 p-5 cursor-pointer">
          <p className="text-white text-lg leading-4 font-semibold">{userInitials}</p>
        </div> */}
      </div>


      {/* Overlay */}
      <div className={`fixed inset-0 bg-black/50 z-50 ${openModal ? "flex" : "hidden"}`}>
        <div className="w-full h-full flex justify-center items-center">
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
              <form className="mt-6" onSubmit={handleSubmitCategory}>
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
            <form className="w-[calc(100%-400px)] h-[calc(100%-100px)] bg-white rounded-xl py-6" onSubmit={handleSubmitRecipe}>
              <div className="w-full pb-4 border-b border-gray-200 px-6 relative">
                <h1 className="text-2xl text-gray-900 font-extrabold mb-1">Nouvelle recette</h1>
                <p className="text-sm text-gray-500">Quel délice voulez-vous nous faire découvrir aujourd{`'`}hui ?</p>
                <div className="absolute inset-y-0 end-6 w-8 h-8 p-2 rounded-full border border-gray-400 hover:bg-gray-100 cursor-pointer" onClick={emptyAll}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="m-auto" viewBox="0 0 24 24"><path fill="#000000" d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z"/></svg>
                </div>
              </div>
              <div id="recipe" className="w-full h-[calc(100%-95px)] flex justify-between gap-12 mt-4 px-6 overflow-auto">
                {/* Inputs */}
                <div className="w-full">
                  <div className="flex flex-col justify-between w-full">
                    <div className="flex flex-col gap-4 w-full">
                      <div className="w-full">
                        <label htmlFor="idCategory" className="block mb-2 text-sm font-medium text-gray-900">Catégorie <sup className="text-red-500">*</sup></label>
                        <select id="idCategory" name="categories" value={formRecipeData.idCategory} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none" required onChange={(e) => setFormRecipeData({ ...formRecipeData, idCategory: e.target.value })}>
                          {recipeCategories.map((category) => (
                            <option key={category._id} value={category._id}>{category.name}</option>
                          ))}
                        </select>
                      </div>
                      <div className="w-full">
                        <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">Nom de la recette <sup className="text-red-500">*</sup></label>
                        <input type="text" name="title" value={formRecipeData.title} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none" placeholder="Ex : Poche de fenouil" required onChange={(e) => setFormRecipeData({ ...formRecipeData, title: e.target.value })} />
                      </div>
                      <div className="w-full">
                        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">Description <sup className="text-red-500">*</sup></label>
                        <textarea id="description" name="description" value={formRecipeData.description} rows="2" className="block p-2.5 resize-none w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 outline-none" placeholder="Petite description de la recette..." required onChange={(e) => setFormRecipeData({ ...formRecipeData, description: e.target.value })} />
                      </div>
                      <div className="w-full">
                        <label htmlFor="preparation" className="block mb-2 text-sm font-medium text-gray-900">Preparation <sup className="text-red-500">*</sup></label>
                        <textarea id="preparation" name="preparation" value={formRecipeData.preparation} rows="7" className="block p-2.5 resize-none w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 outline-none" placeholder="Étapes de preparation de la recette" required onChange={(e) => setFormRecipeData({ ...formRecipeData, preparation: e.target.value })} />
                      </div>
                      <div className="w-full flex xl:flex-row flex-col gap-4">
                        <div className="flex-1">  
                          <label htmlFor="duration" className="block mb-2 text-sm font-medium text-gray-900">Durée de preparation (en minutes) <sup className="text-red-500">*</sup></label>
                          <input type="number" name="duration" min="1" value={formRecipeData.duration} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none" required onChange={(e) => setFormRecipeData({ ...formRecipeData, duration: e.target.value })} />
                        </div>
                        <div className="flex-1">  
                          <label htmlFor="difficulty" className="block mb-2 text-sm font-medium text-gray-900">Difficulté de préparation <sup className="text-red-500">*</sup></label>
                          {/* <input type="number" name="difficulty" min="1" max="5" value={formRecipeData.difficulty} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none" required onChange={(e) => setFormRecipeData({ ...formRecipeData, difficulty: e.target.value })} /> */}
                          <div className="flex gap-4">
                            {[1, 2, 3, 4, 5].map((level, index) => (
                              <div key={index} className={`w-10 h-10 flex justify-center items-center border border-gray-300 rounded-md font-bold text-base ${formRecipeData.difficulty === level ? 'bg-gray-700 text-white' : 'hover:bg-gray-100'} transition-all cursor-pointer`} onClick={() => setFormRecipeData({ ...formRecipeData, difficulty: level })}>{level}</div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-full my-8 h-[1px] bg-gray-300" />

                  <div className="w-full">
                    <p className="font-bold text-lg">Ingrédients <sup className="text-red-500">*</sup></p>
                    {/* <div className="w-full flex xl:flex-row flex-col justify-between items-center gap-4 border border-dashed border-gray-300 bg-gray-100 mt-2 px-8 py-4 rounded-md">
                      <div className="flex justify-center items-center gap-4">
                        <img src={ingredient} alt="ingredient" className="w-10 h-10" />
                        <p className="text-gray-500 italic text-sm">Aucun ingrédient ajouté</p>
                      </div>
                      <button type="button" className="flex justify-center items-center mt-2 bg-white hover:bg-neutral-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 shadow disabled:bg-gray-400 disabled:cursor-not-allowed disabled:text-gray-300" disabled={isProcessing}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="#000000" d="M11 17h2v-4h4v-2h-4V7h-2v4H7v2h4zm-6 4q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21z"/></svg>
                        <span className="text-xs ml-2">Ajouter des ingrédients</span>
                      </button>
                    </div> */}

                    <div className="relative flex xl:flex-row flex-col gap-4 mt-6">
                      <div className="flex flex-col gap-2 xl:w-1/2 w-full">
                        <div className="relative">
                          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Ingrédient <sup className="text-red-500">*</sup></label>
                          <input type="text" name="name" value={ingredient.name} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none" placeholder="Ex : Oignon, Tomate, Sucre, ..." onChange={(e) => setIngredient({ ...ingredient, name: e.target.value })} />
                        </div>
                        <div className="w-full grid grid-cols-2 gap-4 mt-2">
                          <div className="relative">  
                            <label htmlFor="quantity" className="block mb-2 text-sm font-medium text-gray-900">Quantité <sup className="text-red-500">*</sup></label>
                            <input type="number" name="quantity" min="1" value={ingredient.quantity} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none" required onChange={(e) => setIngredient({ ...ingredient, quantity: e.target.value })} />
                          </div>
                          <div className="relative">
                            <label htmlFor="unit" className="block mb-2 text-sm font-medium text-gray-900">Unité de mesure <sup className="text-red-500">*</sup></label>
                            <select name="unit" value={ingredient.unit} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" onChange={(e) => setIngredient({ ...ingredient, unit: e.target.value })}>
                              <option value="No-unit">Aucun(e)</option>
                              <option value="Kg">Kilogrammes(Kg)</option>
                              <option value="g">Grammes(G)</option>
                              <option value="L">Litres(L)</option>
                              <option value="mL">Millilitres(mL)</option>
                              <option value="Other">Autre</option>
                            </select>
                          </div>
                        </div>
                        <button type="button" className="w-full flex justify-center items-center text-white bg-blue-600 border border-gray-300 focus:outline-none hover:bg-blue-700 focus:ring-4 focus:ring-blue-100 font-medium rounded-lg text-sm mt-2 px-5 py-2" onClick={() => newIngredient(ingredient)}>
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white mr-2" viewBox="0 0 24 24"><path fill="#ffffff" d="M11.5 16.5h1v-4h4v-1h-4v-4h-1v4h-4v1h4zM5.615 20q-.69 0-1.152-.462T4 18.385V5.615q0-.69.463-1.152T5.615 4h12.77q.69 0 1.152.463T20 5.615v12.77q0 .69-.462 1.152T18.385 20z"/></svg>
                          Ajouter
                        </button>
                      </div>
                      <div className="xl:w-1/2 w-full">
                        {formRecipeData.ingredients.length === 0 ? (
                          <div className="w-full h-full flex items-center p-2 border-dashed border-2 border-gray-300 rounded-lg">
                            <div className="w-full h-full flex flex-col justify-center items-center gap-4">
                              <img src={ingredientImage} alt="ingredient" className="w-16 h-16" />
                              <p className="text-gray-500 italic text-sm">Aucun ingrédient ajouté</p>
                            </div>
                          </div>
                        ) : (
                          <div className="w-full flex gap-1 flex-wrap p-2 border-2 border-gray-300 rounded-lg">
                            {formRecipeData?.ingredients.map((ingredient, index) => (
                              <div key={index} className="flex p-1 gap-2 rounded-md border-2 border-green-300 bg-green-50">
                                <div onClick={() => removeIngredient(ingredient.name)}>
                                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-900" viewBox="0 0 24 24"><path fill="currentColor" d="m8.4 16.308l3.6-3.6l3.6 3.6l.708-.708l-3.6-3.6l3.6-3.6l-.708-.708l-3.6 3.6l-3.6-3.6l-.708.708l3.6 3.6l-3.6 3.6zM12.003 21q-1.866 0-3.51-.708q-1.643-.709-2.859-1.924t-1.925-2.856T3 12.003t.708-3.51t1.924-2.859t2.856-1.925T11.997 3t3.51.708t2.859 1.924t1.925 2.856t.709 3.509t-.708 3.51t-1.924 2.859t-2.856 1.925t-3.509.709M12 20q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8"/></svg>
                                </div>
                                <p className="text-green-600 text-xs">{ingredient.name} - {ingredient.quantity} {ingredient.unit === "No-unit" ? "" : ingredient.unit}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Picture */}
                <div className="sticky top-0 flex flex-col justify-between items-center gap-2">
                  <div className="w-[350px] h-[300px] flex justify-center items-center bg-gray-200 border-dashed rounded-xl overflow-hidden">
                    {formRecipeData.picture ? (
                      <div className="w-full h-full relative">
                        <img src={formRecipeData.picture} alt="recipe" className="w-full h-full object-cover" />
                        <div className="absolute bottom-4 right-4 flex gap-2">
                          <button type="button" className="flex bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm p-2.5 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:text-gray-300" onClick={uploadImages} disabled={isProcessing}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="m-auto w-3 h-3" viewBox="0 0 24 24"><path fill="#ffffff" d="M3 21v-4.25L16.2 3.575q.3-.275.663-.425t.762-.15t.775.15t.65.45L20.425 5q.3.275.438.65T21 6.4q0 .4-.137.763t-.438.662L7.25 21zM17.6 7.8L19 6.4L17.6 5l-1.4 1.4z"/></svg>
                          </button>
                          <button type="button" className="flex bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-md text-sm p-2.5 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:text-gray-300" onClick={() => setFormRecipeData({ ...formRecipeData, picture: "" })}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="m-auto w-3 h-3" viewBox="0 0 512 512"><path d="M437.5 386.6L306.9 256l130.6-130.6c14.1-14.1 14.1-36.8 0-50.9-14.1-14.1-36.8-14.1-50.9 0L256 205.1 125.4 74.5c-14.1-14.1-36.8-14.1-50.9 0-14.1 14.1-14.1 36.8 0 50.9L205.1 256 74.5 386.6c-14.1 14.1-14.1 36.8 0 50.9 14.1 14.1 36.8 14.1 50.9 0L256 306.9l130.6 130.6c14.1 14.1 36.8 14.1 50.9 0 14-14.1 14-36.9 0-50.9z" fill="#ffffff"/></svg>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full h-full flex flex-col justify-center items-center border-dashed border-2 border-gray-400 rounded-xl cursor-pointer" onClick={uploadImages}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-36 h-36 text-gray-400" viewBox="0 0 24 24"><path fill="currentColor" d="M22 12.698c-.002 1.47-.013 2.718-.096 3.743c-.097 1.19-.296 2.184-.74 3.009a4.18 4.18 0 0 1-.73.983c-.833.833-1.893 1.21-3.237 1.39C15.884 22 14.2 22 12.053 22h-.106c-2.148 0-3.83 0-5.144-.177c-1.343-.18-2.404-.557-3.236-1.39c-.738-.738-1.12-1.656-1.322-2.795c-.2-1.12-.236-2.512-.243-4.241C2 12.957 2 12.492 2 12v-.054c0-2.148 0-3.83.177-5.144c.18-1.343.557-2.404 1.39-3.236c.832-.833 1.893-1.21 3.236-1.39c1.168-.157 2.67-.175 4.499-.177a.697.697 0 1 1 0 1.396c-1.855.002-3.234.018-4.313.163c-1.189.16-1.906.464-2.436.994S3.72 5.8 3.56 6.99C3.397 8.2 3.395 9.788 3.395 12v.784l.932-.814a2.14 2.14 0 0 1 2.922.097l3.99 3.99a1.86 1.86 0 0 0 2.385.207l.278-.195a2.79 2.79 0 0 1 3.471.209l2.633 2.37c.265-.557.423-1.288.507-2.32c.079-.972.09-2.152.091-3.63a.698.698 0 0 1 1.396 0"/><path fill="#ffffff" fillRule="evenodd" d="M17.5 11c-2.121 0-3.182 0-3.841-.659C13 9.682 13 8.621 13 6.5c0-2.121 0-3.182.659-3.841C14.318 2 15.379 2 17.5 2c2.121 0 3.182 0 3.841.659C22 3.318 22 4.379 22 6.5c0 2.121 0 3.182-.659 3.841c-.659.659-1.72.659-3.841.659m.75-6.5a.75.75 0 0 0-1.5 0v1.25H15.5a.75.75 0 0 0 0 1.5h1.25V8.5a.75.75 0 0 0 1.5 0V7.25h1.25a.75.75 0 0 0 0-1.5h-1.25z" clipRule="evenodd"/></svg>
                        <p className="text-gray-400 text-[13px] leading-5 max-w-[250px] text-center">Cliquez ici pour ajouter une image</p>
                      </div>
                    )}
                  </div>

                  <div className="w-full flex justify-start items-center gap-2">
                    <button type="submit" className={`w-full flex justify-center items-center focus:outline-none text-white bg-green-500 hover:bg-green-600 font-medium rounded-lg text-sm px-5 py-2.5 disabled:cursor-not-allowed disabled:bg-green-300 disabled:text-green-500`} disabled={isProcessing}>
                      {isProcessing ? <Spinner /> : 'Publier la recette'}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar