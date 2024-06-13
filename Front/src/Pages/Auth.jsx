import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { logo, signin, signup } from "../assets"
import { connect, register } from "../services/member"

const Auth = () => {
  const [formData, setFormData] = useState({ firstname: '', lastname: '', email: '', password: '', confirmpassword: '' })
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [showRegisterPassword, setShowRegisterPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const navigate = useNavigate()
  
  const [isSuccess, setIsSuccess] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false)
  const [isError, setIsError] = useState(false)

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
    .then((response) => {
      if (response.error) {
        setIsError(true)
        setTimeout(() => {
          setIsError(false)
        }, 3000)
        return
      }

      const { data } = response
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
      {/* Error login */}
      <div className={`absolute top-8 flex items-center gap-1 rounded-lg bg-red-100 p-2 ${isError ? "translate-y-0" : "-translate-y-[200%]"} transition-all duration-300`}>
        <p className="text-xs text-red-600">❌ Email ou mot de passe incorrects ❌</p>
        <div onClick={() => setIsError(false)}>
          <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 text-red-600 cursor-pointer" width="15" height="15" viewBox="0 0 24 24"><path fill="currentColor" d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z"/></svg>
        </div>
      </div>

      <div className="flex justify-center items-center w-[calc(100dvw-40%)] h-[calc(100dvh-150px)] shadow-md rounded-xl">
      {isLogin ? (
        /* Connexion Card */
        <>
        {/* Left side */}
        <div className="lg:flex hidden flex-col w-[45%] h-full relative overflow-hidden rounded-s-xl transition-all">
          <img src={signin} className="w-full h-full object-cover" alt="login_banner" />
          <div className="absolute w-full h-full flex flex-col justify-center items-center gap-6 p-2 bg-black/50">
            <p className="font-extrabold text-3xl text-white text-center">Nouveau membre ?</p>
            <p className="text-base text-balance font-semibold text-white text-center">Pour rester connecté avec nous, inscrivez-vous avec vos informations personnelles</p>
            <button className="flex justify-center items-center text-white h-8 w-[150px] text-[13px] p-1.5 px-2.5 border hover:border-2 hover:bg-white/30 border-white rounded-full transition-colors" onClick={() => setIsLogin(false)}>Inscrivez-vous</button>
          </div>
        </div>
        {/* Right side */}
        <div className="flex flex-col lg:w-[55%] w-full h-full bg-orange-100 rounded-e-xl justify-center items-center transition-all">
          <div className="w-full h-full flex flex-col justify-center items-center gap-2">
            <div className="w-[170px] flex justify-center items-center mb-4">
              <img src={logo} alt="logo" className="w-full h-full object-contain" />
            </div>
            <p className="text-2xl font-extrabold">Restez connectés</p>
            <p className="font-light text-sm text-balance text-center text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor et dolore magna aliqua.</p>
            <form className="w-full flex flex-col justify-center items-center mt-4" onSubmit={handleLogin}>
              {/* Email */}
              <div className="relative w-[300px] max-w-full max-md:px-2 mb-2">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-700" viewBox="0 0 24 24"><path fill="currentColor" d="M12 21q-1.863 0-3.507-.708q-1.643-.709-2.859-1.924t-1.925-2.856T3 12.003t.708-3.51t1.924-2.859t2.856-1.925T11.997 3t3.51.709t2.859 1.924t1.925 2.857T21 12v.988q0 1.264-.868 2.138T18 16q-.894 0-1.63-.49t-1.09-1.306q-.57.821-1.425 1.309T12 16q-1.671 0-2.836-1.164T8 12t1.164-2.836T12 8t2.836 1.164T16 12v.988q0 .824.588 1.418Q17.177 15 18 15t1.412-.594t.588-1.418V12q0-3.35-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20h5v1zm0-6q1.25 0 2.125-.875T15 12t-.875-2.125T12 9t-2.125.875T9 12t.875 2.125T12 15"/></svg>
                </div>
                <input type="email" name="email" value={formData.email} className="bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block ps-10 p-2.5 outline-none" placeholder="name@gmail.com" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
              </div>
              {/* Password */}
              <div className="relative w-[300px] max-w-full max-md:px-2 mb-6">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-700" viewBox="0 0 24 24"><path fill="currentColor" d="M4 13q-1.25 0-2.125-.875T1 10t.875-2.125T4 7t2.125.875T7 10t-.875 2.125T4 13m-2 6v-2h20v2zm10-6q-1.25 0-2.125-.875T9 10t.875-2.125T12 7t2.125.875T15 10t-.875 2.125T12 13m8 0q-1.25 0-2.125-.875T17 10t.875-2.125T20 7t2.125.875T23 10t-.875 2.125T20 13"/></svg>
                </div>
                <input type={showPassword ? 'text' : 'password'} name="password" value={formData.password} className="bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block ps-10 p-2.5 outline-none" placeholder="***********" onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                <div className="absolute inset-y-0 end-0 flex items-center pe-3.5 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-500" viewBox="0 0 24 24"><path fill="currentColor" d="m16.1 13.3l-1.45-1.45q.225-1.175-.675-2.2t-2.325-.8L10.2 7.4q.425-.2.863-.3T12 7q1.875 0 3.188 1.313T16.5 11.5q0 .5-.1.938t-.3.862m3.2 3.15l-1.45-1.4q.95-.725 1.688-1.587T20.8 11.5q-1.25-2.525-3.588-4.012T12 6q-.725 0-1.425.1T9.2 6.4L7.65 4.85q1.025-.425 2.1-.638T12 4q3.775 0 6.725 2.087T23 11.5q-.575 1.475-1.513 2.738T19.3 16.45m.5 6.15l-4.2-4.15q-.875.275-1.762.413T12 19q-3.775 0-6.725-2.087T1 11.5q.525-1.325 1.325-2.463T4.15 7L1.4 4.2l1.4-1.4l18.4 18.4zM5.55 8.4q-.725.65-1.325 1.425T3.2 11.5q1.25 2.525 3.588 4.013T12 17q.5 0 .975-.062t.975-.138l-.9-.95q-.275.075-.525.113T12 16q-1.875 0-3.188-1.312T7.5 11.5q0-.275.038-.525t.112-.525zm4.2 4.2"/></svg>
                  ): (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-500" viewBox="0 0 24 24"><path fill="currentColor" d="M12 16q1.875 0 3.188-1.312T16.5 11.5t-1.312-3.187T12 7T8.813 8.313T7.5 11.5t1.313 3.188T12 16m0-1.8q-1.125 0-1.912-.788T9.3 11.5t.788-1.912T12 8.8t1.913.788t.787 1.912t-.787 1.913T12 14.2m0 4.8q-3.65 0-6.65-2.037T1 11.5q1.35-3.425 4.35-5.462T12 4t6.65 2.038T23 11.5q-1.35 3.425-4.35 5.463T12 19m0-2q2.825 0 5.188-1.487T20.8 11.5q-1.25-2.525-3.613-4.012T12 6T6.813 7.488T3.2 11.5q1.25 2.525 3.613 4.013T12 17"/></svg>
                  )}
                </div>
              </div>
              <div className="w-[70%] h-[1px] bg-gray-400 relative">
                <div className="absolute inset-0 flex justify-center items-center">
                  <p className="text-gray-700 font-light text-xs bg-orange-100 px-2">Ou se connecter avec</p>
                </div>
              </div>
              <div className="w-full flex justify-center items-center gap-6 mt-6">
                <div className="bg-red-600 hover:bg-red-700 flex justify-center items-center p-2 rounded-full transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" viewBox="0 0 1024 1024"><path fill="#ffffff" d="M881 442.4H519.7v148.5h206.4c-8.9 48-35.9 88.6-76.6 115.8c-34.4 23-78.3 36.6-129.9 36.6c-99.9 0-184.4-67.5-214.6-158.2c-7.6-23-12-47.6-12-72.9s4.4-49.9 12-72.9c30.3-90.6 114.8-158.1 214.7-158.1c56.3 0 106.8 19.4 146.6 57.4l110-110.1c-66.5-62-153.2-100-256.6-100c-149.9 0-279.6 86-342.7 211.4c-26 51.8-40.8 110.4-40.8 172.4S151 632.8 177 684.6C240.1 810 369.8 896 519.7 896c103.6 0 190.4-34.4 253.8-93c72.5-66.8 114.4-165.2 114.4-282.1c0-27.2-2.4-53.3-6.9-78.5"/></svg>
                </div>
              </div>
              <button type="submit" className="mt-8 focus:outline-none text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5">Connexion</button>
            </form>
          </div>
        </div>
        </>
        ) : (
        /* Registration Card */
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
              <div className="w-full grid grid-cols-2 gap-4">
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
              </div>

              {/* Email */}
              <div className="relative w-full">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-700" viewBox="0 0 24 24"><path fill="currentColor" d="M12 21q-1.863 0-3.507-.708q-1.643-.709-2.859-1.924t-1.925-2.856T3 12.003t.708-3.51t1.924-2.859t2.856-1.925T11.997 3t3.51.709t2.859 1.924t1.925 2.857T21 12v.988q0 1.264-.868 2.138T18 16q-.894 0-1.63-.49t-1.09-1.306q-.57.821-1.425 1.309T12 16q-1.671 0-2.836-1.164T8 12t1.164-2.836T12 8t2.836 1.164T16 12v.988q0 .824.588 1.418Q17.177 15 18 15t1.412-.594t.588-1.418V12q0-3.35-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20h5v1zm0-6q1.25 0 2.125-.875T15 12t-.875-2.125T12 9t-2.125.875T9 12t.875 2.125T12 15"/></svg>
                </div>
                <input type="email" name="email" value={formData.email} className="bg-gray-50 border w-full border-gray-300 text-gray-900 text-[13px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block ps-10 p-2 outline-none" placeholder="Adresse mail" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
              </div>

              {/* Password */}
              <div className="relative w-full">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-700" viewBox="0 0 24 24"><path fill="currentColor" d="M4 13q-1.25 0-2.125-.875T1 10t.875-2.125T4 7t2.125.875T7 10t-.875 2.125T4 13m-2 6v-2h20v2zm10-6q-1.25 0-2.125-.875T9 10t.875-2.125T12 7t2.125.875T15 10t-.875 2.125T12 13m8 0q-1.25 0-2.125-.875T17 10t.875-2.125T20 7t2.125.875T23 10t-.875 2.125T20 13"/></svg>
                </div>
                <input type={showRegisterPassword ? 'text' : 'password'} name="password" value={formData.password} className="bg-gray-50 w-full border border-gray-300 text-gray-900 text-[13px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block ps-10 p-2 outline-none" placeholder="Mot de passe" onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                <div className="absolute inset-y-0 end-0 flex items-center pe-3.5 cursor-pointer" onClick={() => setShowRegisterPassword(!showRegisterPassword)}>
                  {showRegisterPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-500" viewBox="0 0 24 24"><path fill="currentColor" d="m16.1 13.3l-1.45-1.45q.225-1.175-.675-2.2t-2.325-.8L10.2 7.4q.425-.2.863-.3T12 7q1.875 0 3.188 1.313T16.5 11.5q0 .5-.1.938t-.3.862m3.2 3.15l-1.45-1.4q.95-.725 1.688-1.587T20.8 11.5q-1.25-2.525-3.588-4.012T12 6q-.725 0-1.425.1T9.2 6.4L7.65 4.85q1.025-.425 2.1-.638T12 4q3.775 0 6.725 2.087T23 11.5q-.575 1.475-1.513 2.738T19.3 16.45m.5 6.15l-4.2-4.15q-.875.275-1.762.413T12 19q-3.775 0-6.725-2.087T1 11.5q.525-1.325 1.325-2.463T4.15 7L1.4 4.2l1.4-1.4l18.4 18.4zM5.55 8.4q-.725.65-1.325 1.425T3.2 11.5q1.25 2.525 3.588 4.013T12 17q.5 0 .975-.062t.975-.138l-.9-.95q-.275.075-.525.113T12 16q-1.875 0-3.188-1.312T7.5 11.5q0-.275.038-.525t.112-.525zm4.2 4.2"/></svg>
                  ): (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-500" viewBox="0 0 24 24"><path fill="currentColor" d="M12 16q1.875 0 3.188-1.312T16.5 11.5t-1.312-3.187T12 7T8.813 8.313T7.5 11.5t1.313 3.188T12 16m0-1.8q-1.125 0-1.912-.788T9.3 11.5t.788-1.912T12 8.8t1.913.788t.787 1.912t-.787 1.913T12 14.2m0 4.8q-3.65 0-6.65-2.037T1 11.5q1.35-3.425 4.35-5.462T12 4t6.65 2.038T23 11.5q-1.35 3.425-4.35 5.463T12 19m0-2q2.825 0 5.188-1.487T20.8 11.5q-1.25-2.525-3.613-4.012T12 6T6.813 7.488T3.2 11.5q1.25 2.525 3.613 4.013T12 17"/></svg>
                  )}
                </div>
              </div>
              {/* Confirm password */}
              <div className="relative w-full">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-500" viewBox="0 0 24 24"><path fill="currentColor" d="M4 13q-1.25 0-2.125-.875T1 10t.875-2.125T4 7t2.125.875T7 10t-.875 2.125T4 13m-2 6v-2h20v2zm10-6q-1.25 0-2.125-.875T9 10t.875-2.125T12 7t2.125.875T15 10t-.875 2.125T12 13m8 0q-1.25 0-2.125-.875T17 10t.875-2.125T20 7t2.125.875T23 10t-.875 2.125T20 13"/></svg>
                </div>
                <input type={showConfirmPassword ? 'text' : 'password'} name="confirmpassword" value={formData.confirmpassword} className="bg-gray-50 w-full border border-gray-300 text-gray-900 text-[13px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block ps-10 p-2 outline-none" placeholder="Confirmer le mot de passe" onChange={(e) => setFormData({ ...formData, confirmpassword: e.target.value })} />
                <div className="absolute inset-y-0 end-0 flex items-center pe-3.5 cursor-pointer" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-500" viewBox="0 0 24 24"><path fill="currentColor" d="m16.1 13.3l-1.45-1.45q.225-1.175-.675-2.2t-2.325-.8L10.2 7.4q.425-.2.863-.3T12 7q1.875 0 3.188 1.313T16.5 11.5q0 .5-.1.938t-.3.862m3.2 3.15l-1.45-1.4q.95-.725 1.688-1.587T20.8 11.5q-1.25-2.525-3.588-4.012T12 6q-.725 0-1.425.1T9.2 6.4L7.65 4.85q1.025-.425 2.1-.638T12 4q3.775 0 6.725 2.087T23 11.5q-.575 1.475-1.513 2.738T19.3 16.45m.5 6.15l-4.2-4.15q-.875.275-1.762.413T12 19q-3.775 0-6.725-2.087T1 11.5q.525-1.325 1.325-2.463T4.15 7L1.4 4.2l1.4-1.4l18.4 18.4zM5.55 8.4q-.725.65-1.325 1.425T3.2 11.5q1.25 2.525 3.588 4.013T12 17q.5 0 .975-.062t.975-.138l-.9-.95q-.275.075-.525.113T12 16q-1.875 0-3.188-1.312T7.5 11.5q0-.275.038-.525t.112-.525zm4.2 4.2"/></svg>
                  ): (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-500" viewBox="0 0 24 24"><path fill="currentColor" d="M12 16q1.875 0 3.188-1.312T16.5 11.5t-1.312-3.187T12 7T8.813 8.313T7.5 11.5t1.313 3.188T12 16m0-1.8q-1.125 0-1.912-.788T9.3 11.5t.788-1.912T12 8.8t1.913.788t.787 1.912t-.787 1.913T12 14.2m0 4.8q-3.65 0-6.65-2.037T1 11.5q1.35-3.425 4.35-5.462T12 4t6.65 2.038T23 11.5q-1.35 3.425-4.35 5.463T12 19m0-2q2.825 0 5.188-1.487T20.8 11.5q-1.25-2.525-3.613-4.012T12 6T6.813 7.488T3.2 11.5q1.25 2.525 3.613 4.013T12 17"/></svg>
                  )}
                </div>
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