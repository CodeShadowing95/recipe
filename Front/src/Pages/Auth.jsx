import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { logo, signin, signup } from "../assets"
import { connect, register } from "../services/member"

const Auth = () => {
  const [formData, setFormData] = useState({ firstname: '', lastname: '', email: '', password: '', confirmpassword: '' })
  const [isLogin, setIsLogin] = useState(true)
  const navigate = useNavigate()
  
  const [isSuccess, setIsSuccess] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault();

    // console.log(formData)

    if (formData.email === '' || formData.password === '') {
      setIsEmpty(true)
      setTimeout(() => {
        setIsEmpty(false)
      }, 3000)
      return
    }

    await connect('login', formData)
    .then(({ data }) => {
      localStorage.setItem('user', JSON.stringify(data))
      navigate('/feed')
    })

    setFormData({ email: '', password: '' });
  }

  const handleSignup = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmpassword) return
    await register('add-member', formData)
    .then((response) => {
      console.log(response)
    })

    setFormData({ firstname: '', lastname: '', email: '', password: '', confirmpassword: '' });
    setIsLogin(true)
    setIsSuccess(true)

    setTimeout(() => {
      setIsSuccess(false)
    }, 3000)
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center relative overflow-hidden">
      {/* Success message */}
      <div className={`absolute top-8 flex items-center gap-1 rounded-lg bg-green-100 p-2 ${isSuccess ? "translate-y-0" : "-translate-y-[200%]"} transition-all duration-300`}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="#16a34a" d="M12 17q.425 0 .713-.288T13 16q0-.425-.288-.712T12 15q-.425 0-.712.288T11 16q0 .425.288.713T12 17m-1-4h2V7h-2zm1 9q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12q0-3.35-2.325-5.675T12 4Q8.65 4 6.325 6.325T4 12q0 3.35 2.325 5.675T12 20m0-8"/></svg>
        <p className="text-xs text-green-600">🎉 Super, Inscription réussie 🎉</p>
        <div onClick={() => setIsSuccess(false)}>
          <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 cursor-pointer" width="15" height="15" viewBox="0 0 24 24"><path fill="#16a34a" d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z"/></svg>
        </div>
      </div>
      {/* empty fields message */}
      <div className={`absolute top-8 flex items-center gap-1 rounded-lg bg-red-100 p-2 ${isEmpty ? "translate-y-0" : "-translate-y-[200%]"} transition-all duration-300`}>
        <p className="text-xs text-red-600">❌ Les champs sont vides ❌</p>
        <div onClick={() => setIsEmpty(false)}>
          <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 text-red-600 cursor-pointer" width="15" height="15" viewBox="0 0 24 24"><path fill="currentColor" d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z"/></svg>
        </div>
      </div>

      <div className="flex justify-center items-center w-[calc(100dvw-40%)] h-[calc(100dvh-200px)] shadow-md rounded-xl">
      {isLogin ? (
        <>
        {/* Left side */}
        <div className="flex flex-col w-[45%] h-full relative overflow-hidden rounded-s-xl transition-all">
          <img src={signin} className="w-full h-full object-cover" alt="login_banner" />
          <div className="absolute w-full h-full flex flex-col justify-center items-center gap-6 p-2 bg-black/50">
            <p className="font-extrabold text-3xl text-white text-center">Bienvenue</p>
            <p className="text-base text-balance font-semibold text-white text-center">Pour rester connecté avec nous, inscrivez-vous avec vos infos personelles</p>
            <button className="flex justify-center items-center text-white h-8 w-[150px] text-[13px] p-1.5 px-2.5 border hover:border-2 hover:bg-white/30 border-white rounded-full transition-colors" onClick={() => setIsLogin(false)}>Inscrivez-vous</button>
          </div>
        </div>
        {/* Right side */}
        <div className="flex flex-col w-[55%] h-full bg-orange-100 rounded-e-xl justify-center items-center transition-all">
          <div className="w-full h-full flex flex-col justify-center items-center gap-2">
            <div className="w-[200px] flex justify-center items-center mb-4">
              <img src={logo} alt="logo" className="w-full h-full object-contain" />
            </div>
            <p className="text-2xl font-extrabold">Restez connectés</p>
            <p className="font-light text-sm text-balance text-center text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor et dolore magna aliqua.</p>
            <form className="w-full flex flex-col justify-center items-center mt-4" onSubmit={handleLogin}>
              {/* Email */}
              <div className="relative mb-2">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-500" viewBox="0 0 24 24"><path fill="currentColor" d="M4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.587 1.413T20 20zm8-7L4 8v10h16V8zm0-2l8-5H4zM4 8V6v12z"/></svg>
                </div>
                <input type="email" name="email" value={formData.email} className="bg-gray-50 border w-[300px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block ps-10 p-2.5 outline-none" placeholder="name@gmail.com" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
              </div>
              {/* Password */}
              <div className="relative mb-6">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-500" viewBox="0 0 24 24"><path fill="currentColor" d="M4 13q-1.25 0-2.125-.875T1 10t.875-2.125T4 7t2.125.875T7 10t-.875 2.125T4 13m-2 6v-2h20v2zm10-6q-1.25 0-2.125-.875T9 10t.875-2.125T12 7t2.125.875T15 10t-.875 2.125T12 13m8 0q-1.25 0-2.125-.875T17 10t.875-2.125T20 7t2.125.875T23 10t-.875 2.125T20 13"/></svg>
                </div>
                <input type="password" name="password" value={formData.password} className="bg-gray-50 border w-[300px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block ps-10 p-2.5 outline-none" placeholder="***********" onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
              </div>
              <button type="submit" className="focus:outline-none text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5">Connexion</button>
            </form>
          </div>
        </div>
        </>
        ) : (
        <>
        {/* Left side */}
        <div className="flex flex-col w-[55%] h-full bg-green-50 rounded-s-xl justify-center items-center transition-all p-4">
          <div className="w-full h-full flex flex-col justify-center items-center gap-2 p-2">
            <div className="w-[200px] flex justify-center items-center mb-2">
              <img src={logo} alt="logo" className="w-full h-full object-contain" />
            </div>
            <p className="text-2xl font-extrabold">Inscrivez-vous</p>
            <p className="font-light text-sm text-balance text-center text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor et dolore magna aliqua.</p>
            <form className="w-96 flex flex-col justify-center items-center gap-2 mt-4" onSubmit={handleSignup}>
              {/* Lastname */}
              <div className="relative w-full">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-500" viewBox="0 0 24 24"><path fill="currentColor" d="M5.85 17.1q1.275-.975 2.85-1.537T12 15t3.3.563t2.85 1.537q.875-1.025 1.363-2.325T20 12q0-3.325-2.337-5.663T12 4T6.337 6.338T4 12q0 1.475.488 2.775T5.85 17.1M12 13q-1.475 0-2.488-1.012T8.5 9.5t1.013-2.488T12 6t2.488 1.013T15.5 9.5t-1.012 2.488T12 13m0 9q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"/></svg>
                </div>
                <input type="text" name="lastname" value={formData.lastname} className="bg-gray-50 border w-full border-gray-300 text-gray-900 text-[13px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block ps-10 p-2 outline-none" placeholder="Nom(s)" onChange={(e) => setFormData({ ...formData, lastname: e.target.value })} />
              </div>
              {/* Firstname */}
              <div className="relative w-full">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-500" viewBox="0 0 24 24"><path fill="currentColor" d="M5.85 17.1q1.275-.975 2.85-1.537T12 15t3.3.563t2.85 1.537q.875-1.025 1.363-2.325T20 12q0-3.325-2.337-5.663T12 4T6.337 6.338T4 12q0 1.475.488 2.775T5.85 17.1M12 13q-1.475 0-2.488-1.012T8.5 9.5t1.013-2.488T12 6t2.488 1.013T15.5 9.5t-1.012 2.488T12 13m0 9q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"/></svg>
                </div>
                <input type="text" name="firstname" value={formData.firstname} className="bg-gray-50 border w-full border-gray-300 text-gray-900 text-[13px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block ps-10 p-2 outline-none" placeholder="Prénom(s)" onChange={(e) => setFormData({ ...formData, firstname: e.target.value })} />
              </div>

              {/* Email */}
              <div className="relative w-full">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-500" viewBox="0 0 24 24"><path fill="currentColor" d="M4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.587 1.413T20 20zm8-7L4 8v10h16V8zm0-2l8-5H4zM4 8V6v12z"/></svg>
                </div>
                <input type="email" name="email" value={formData.email} className="bg-gray-50 border w-full border-gray-300 text-gray-900 text-[13px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block ps-10 p-2 outline-none" placeholder="Adresse mail" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
              </div>

              {/* Password */}
              <div className="relative w-full">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-500" viewBox="0 0 24 24"><path fill="currentColor" d="M4 13q-1.25 0-2.125-.875T1 10t.875-2.125T4 7t2.125.875T7 10t-.875 2.125T4 13m-2 6v-2h20v2zm10-6q-1.25 0-2.125-.875T9 10t.875-2.125T12 7t2.125.875T15 10t-.875 2.125T12 13m8 0q-1.25 0-2.125-.875T17 10t.875-2.125T20 7t2.125.875T23 10t-.875 2.125T20 13"/></svg>
                </div>
                <input type="password" name="password" value={formData.password} className="bg-gray-50 w-full border border-gray-300 text-gray-900 text-[13px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block ps-10 p-2 outline-none" placeholder="Mot de passe" onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
              </div>
              {/* Confirm password */}
              <div className="relative w-full">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-500" viewBox="0 0 24 24"><path fill="currentColor" d="M4 13q-1.25 0-2.125-.875T1 10t.875-2.125T4 7t2.125.875T7 10t-.875 2.125T4 13m-2 6v-2h20v2zm10-6q-1.25 0-2.125-.875T9 10t.875-2.125T12 7t2.125.875T15 10t-.875 2.125T12 13m8 0q-1.25 0-2.125-.875T17 10t.875-2.125T20 7t2.125.875T23 10t-.875 2.125T20 13"/></svg>
                </div>
                <input type="password" name="confirmpassword" value={formData.confirmpassword} className="bg-gray-50 w-full border border-gray-300 text-gray-900 text-[13px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block ps-10 p-2 outline-none" placeholder="Confirmer le mot de passe" onChange={(e) => setFormData({ ...formData, confirmpassword: e.target.value })} />
              </div>
              <button type="submit" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-4">Confirmer</button>
            </form>
          </div>
        </div>
        {/* Right side */}
        <div className="flex flex-col w-[45%] h-full relative overflow-hidden rounded-e-xl transition-all">
          <img src={signup} className="w-full h-full object-cover" alt="login_banner" />
          <div className="absolute w-full h-full flex flex-col justify-center items-center gap-6 p-2 bg-black/50">
            <p className="font-extrabold text-3xl text-white text-center">Déjà membre ?</p>
            <p className="text-base text-balance font-semibold text-white text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ullamcorper nulla dui, sit amet consectetur risus dictum id.</p>
            <button className="flex justify-center items-center text-white h-8 w-[150px] text-[13px] p-1.5 px-2.5 border hover:border-2 hover:bg-white/30 border-white rounded-full transition-colors" onClick={() => setIsLogin(true)}>Connectez-vous</button>
          </div>
        </div>
        </>
      )}
      </div>
    </div>
  )
}

export default Auth