/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom"
import { logo } from "../assets"
import { fetchUser } from "../utils"
import { useEffect, useState } from "react";
import { addCategory } from "../services/category";
import NewRecipeModal from "./NewRecipeModal";

const Navbar = ({ onSuccess }) => {
  const { result: user } = fetchUser();
  const navigate = useNavigate()
  // const [userInitials, setUserInitials] = useState("")

  const [formCategoryData, setFormCategoryData] = useState({ name: '', user: user._id })

  const [modalType, setModalType] = useState("")
  const [openModal, setOpenModal] = useState(false)
  const [toggleRecipeDropdown, setToggleRecipeDropdown] = useState(false)
  const [toggleProfileDropdown, setToggleProfileDropdown] = useState(false)

  

  const logout = () => {
    localStorage.clear()
    navigate('/auth')
  }

  const enableModal = (type) => {
    setOpenModal(true)
    setModalType(type)
    setToggleRecipeDropdown(false)
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

  document.body.style.overflow = openModal ? 'hidden' : 'auto'

  const emptyAll = () => {
    setFormCategoryData({ ...formCategoryData, name: '' })
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
            <NewRecipeModal onSuccess={onSuccess} onOpenModal={setOpenModal} closeModal={setModalType} />
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar