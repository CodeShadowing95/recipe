import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { fetchUser } from "../utils";
import { addRecipe } from "../services/recipe";

const NewRecipe = () => {
  const { result: user } = fetchUser()
  const navigate = useNavigate();
  
  const [recipeCategories, setRecipeCategories] = useState([])
  const [formRecipeData, setFormRecipeData] = useState({ title: '', description: '', picture: '', idCategory: recipeCategories?.length > 0 ? recipeCategories[0]._id : '', idMembre: user._id })

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

  const handleSubmitRecipe = async (e) => {
    e.preventDefault()

    if (formRecipeData.title === '' || formRecipeData.description === '' || formRecipeData.picture === '') return

    // console.log(formRecipeData);
    await addRecipe(formRecipeData)
    .then((response) => {
      if (response?.status === 201) {
        console.log('Recette ajoutée avec succès !');
      }
    })

    navigate('/feed')
  }

  return (
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
        {/* <button type="button" className="flex gap-2 mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:text-gray-300" onClick={uploadImages} disabled={isProcessing}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="#ffffff" d="M19 7V5h-2V3h2V1h2v2h2v2h-2v2zm-8 10.5q1.875 0 3.188-1.312T15.5 13q0-1.875-1.312-3.187T11 8.5q-1.875 0-3.187 1.313T6.5 13q0 1.875 1.313 3.188T11 17.5m0-2q-1.05 0-1.775-.725T8.5 13q0-1.05.725-1.775T11 10.5q1.05 0 1.775.725T13.5 13q0 1.05-.725 1.775T11 15.5M3 21q-.825 0-1.412-.587T1 19V7q0-.825.588-1.412T3 5h3.15L8 3h7v4h2v2h4v10q0 .825-.587 1.413T19 21z"/></svg>
          {formRecipeData.picture !== "" ? "Modifier l'image" : "Ajouter une image"}
        </button>
        {formRecipeData.picture !== "" &&
          <button type="button" className="flex items-center gap-1 text-xs text-red-500 mt-2" onClick={() => setFormRecipeData({ ...formRecipeData, picture: "" })}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-red-500" viewBox="0 0 24 24"><path fill="currentColor" d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z"/></svg>
            Retirer l{`'`}image
          </button>
        } */}
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
        </div>
      </form>
    </div>
  )
}

export default NewRecipe