import { useNavigate } from "react-router-dom"
import { logo } from "../assets"

const Navbar = () => {

  const navigate = useNavigate()

  const logout = () => {
    localStorage.clear()
    navigate('/auth')
  }

  return (
    <div className="w-full flex justify-between items-center px-[100px] py-4">
      <img src={logo} alt="logo" className="w-[200px]" />
      <div className="relative w-[500px]">
        <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input type="search" id="search" className="block w-full p-3 ps-12 text-sm text-gray-900 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 outline-none" placeholder="Rechercher des recettes..." required />
      </div>
      <div className="flex gap-4">
        <button type="button" className="focus:outline-none text-pink-600 hover:bg-pink-50/50 focus:ring-4 focus:ring-green-300 font-bold rounded-full text-sm px-5 py-2.5 transition-all">Mon compte</button>
        <button type="button" className="focus:outline-none text-pink-600 bg-white focus:ring-4 focus:ring-green-300 font-bold rounded-full text-sm px-5 py-2.5 transition-all" onClick={logout}>Déconnexion</button>
      </div>
    </div>
  )
}

export default Navbar