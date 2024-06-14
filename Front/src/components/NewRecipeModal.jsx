/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { fetchUser } from "../utils";
import { fetchCategories } from "../services/category";
import { addRecipe } from "../services/recipe";
import Spinner from "./Spinner";
import { ingredientImage } from "../assets";

const NewRecipeModal = ({ onSuccess, onOpenModal, closeModal }) => {
  const { result: user } = fetchUser();
  // const navigate = useNavigate()
  // const [userInitials, setUserInitials] = useState("")

  const [recipeCategories, setRecipeCategories] = useState([])
  const [formRecipeData, setFormRecipeData] = useState({ title: '', description: '', preparation: '', duration: 1, difficulty: 1, picture: '', ingredients: [], idCategory: recipeCategories?.length > 0 ? recipeCategories[0]._id : '', idMembre: user._id })
  const [ingredient, setIngredient] = useState({ name: '', quantity: 1, unit: 'No-unit' })

  const [isProcessing, setIsProcessing] = useState(false)
  
  const newIngredient = (ing) => {
    if (ing.name === '') return

    setFormRecipeData({ ...formRecipeData, ingredients: [...formRecipeData.ingredients, ing] })

    setIngredient({ name: '', quantity: 1, unit: 'No-unit' })
  }

  const removeIngredient = (name) => {
    setFormRecipeData({ ...formRecipeData, ingredients: formRecipeData.ingredients.filter(ing => ing.name !== name) })
  }

  const handleSubmitRecipe = async (e) => {
    e.preventDefault()

    if (formRecipeData.title === '' || formRecipeData.description === '' || formRecipeData.preparation === '' || formRecipeData.picture === '') return

    setIsProcessing(true)

    // console.log(formRecipeData);

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
    // }, 3500)
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

  const emptyAll = () => {
    // setFormCategoryData({ ...formCategoryData, name: '' })
    setFormRecipeData({ ...formRecipeData, title: '', description: '', picture: '', preparation: '', duration: 1, difficulty: 1, ingredients: [], idCategory: recipeCategories?.length > 0 ? recipeCategories[0]._id : '' })
    setIngredient({ name: '', quantity: 1, unit: 'No-unit' })
    onOpenModal(false)
    closeModal('')
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
  )
}

export default NewRecipeModal