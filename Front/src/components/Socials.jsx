
const Socials = () => {
  return (
    <div
      className="group grid grid-cols-3 gap-0 hover:gap-2 duration-500 relative shadow-lg rounded-lg overflow-hidden"
    >
      <h1
        className="absolute z-10 group-hover:hidden duration-200 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          height="24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="w-7 h-7 text-gray-800"
        >
          <path
            d="M5 7h14M5 12h14M5 17h14"
            strokeWidth="2"
            strokeLinecap="round"
            stroke="currentColor"
          ></path>
        </svg>
      </h1>

      {/* Instagram */}
      <a href="#">
        <svg
          className="group-hover:rounded-lg group-hover:opacity-1 p-3 bg-white/50 hover:bg-[#cc39a4] backdrop-blur-md group-hover:shadow-xl rounded-tl-lg flex justify-center items-center w-full h-full text-[#cc39a4] hover:text-white duration-200"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            className="opacity-0 group-hover:opacity-100 duration-200"
            fill="currentColor"
            fillRule="evenodd"
            d="M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Zm5-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm7.597 2.214a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2h-.01a1 1 0 0 1-1-1ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z"
            clipRule="evenodd"
          ></path>
        </svg>
      </a>

      {/* Twitter */}
      <a href="#">
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          height="24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="group-hover:rounded-lg group-hover:opacity-1 p-3 bg-white/50 hover:bg-blue-500 backdrop-blur-md group-hover:shadow-xl flex justify-center items-center w-full h-full text-blue-500 hover:text-white duration-200"
        >
          <path
            clipRule="evenodd"
            d="M22 5.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.343 8.343 0 0 1-2.605.981A4.13 4.13 0 0 0 15.85 4a4.068 4.068 0 0 0-4.1 4.038c0 .31.035.618.105.919A11.705 11.705 0 0 1 3.4 4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 6.1 13.635a4.192 4.192 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 2 18.184 11.732 11.732 0 0 0 8.291 20 11.502 11.502 0 0 0 19.964 8.5c0-.177 0-.349-.012-.523A8.143 8.143 0 0 0 22 5.892Z"
            fillRule="evenodd"
            className="opacity-0 group-hover:opacity-100 duration-200"
          ></path>
        </svg>
      </a>

      {/* Pinterest */}
      <a href="#">
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          height="24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="group-hover:rounded-lg group-hover:opacity-1 p-3 bg-white/50 hover:bg-red-500 backdrop-blur-md group-hover:shadow-xl rounded-tr-lg flex justify-center items-center w-full h-full text-red-500 hover:text-white duration-200"
        >
          <path
            d="M9.04 21.54c.96.29 1.93.46 2.96.46a10 10 0 0 0 10-10A10 10 0 0 0 12 2A10 10 0 0 0 2 12c0 4.25 2.67 7.9 6.44 9.34c-.09-.78-.18-2.07 0-2.96l1.15-4.94s-.29-.58-.29-1.5c0-1.38.86-2.41 1.84-2.41c.86 0 1.26.63 1.26 1.44c0 .86-.57 2.09-.86 3.27c-.17.98.52 1.84 1.52 1.84c1.78 0 3.16-1.9 3.16-4.58c0-2.4-1.72-4.04-4.19-4.04c-2.82 0-4.48 2.1-4.48 4.31c0 .86.28 1.73.74 2.3c.09.06.09.14.06.29l-.29 1.09c0 .17-.11.23-.28.11c-1.28-.56-2.02-2.38-2.02-3.85c0-3.16 2.24-6.03 6.56-6.03c3.44 0 6.12 2.47 6.12 5.75c0 3.44-2.13 6.2-5.18 6.2c-.97 0-1.92-.52-2.26-1.13l-.67 2.37c-.23.86-.86 2.01-1.29 2.7z"
            className="opacity-0 group-hover:opacity-100 duration-200"
          />
        </svg>
      </a>

      {/* WhatsApp */}
      <a href="#">
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          height="24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="group-hover:rounded-lg group-hover:opacity-1 p-3 bg-white/50 hover:bg-green-500 backdrop-blur-md group-hover:shadow-xl flex justify-center items-center w-full h-full text-green-500 hover:text-white duration-200"
        >
          <path
            className="opacity-0 group-hover:opacity-100 duration-200"
            d="M19.05 4.91A9.816 9.816 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91c0-2.65-1.03-5.14-2.9-7.01m-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18l-3.12.82l.83-3.04l-.2-.31a8.264 8.264 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24c2.2 0 4.27.86 5.82 2.42a8.183 8.183 0 0 1 2.41 5.83c.02 4.54-3.68 8.23-8.22 8.23m4.52-6.16c-.25-.12-1.47-.72-1.69-.81c-.23-.08-.39-.12-.56.12c-.17.25-.64.81-.78.97c-.14.17-.29.19-.54.06c-.25-.12-1.05-.39-1.99-1.23c-.74-.66-1.23-1.47-1.38-1.72c-.14-.25-.02-.38.11-.51c.11-.11.25-.29.37-.43s.17-.25.25-.41c.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31c-.22.25-.86.85-.86 2.07c0 1.22.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.23 3.74c.59.26 1.05.41 1.41.52c.59.19 1.13.16 1.56.1c.48-.07 1.47-.6 1.67-1.18c.21-.58.21-1.07.14-1.18s-.22-.16-.47-.28"
          />
        </svg>
      </a>

      {/* Plus */}
      <a href="#">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          height="24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="group-hover:rounded-lg group-hover:opacity-1 p-3 bg-white/50 hover:bg-black backdrop-blur-md group-hover:shadow-xl flex justify-center items-center w-full h-full text-black hover:text-white duration-200"
        >
          <path
            d="M12 7.757v8.486M7.757 12h8.486M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
            stroke="currentColor"
            className="opacity-0 group-hover:opacity-100 duration-200"
          ></path>
        </svg>
      </a>

      {/* Snapchat */}
      <a href="#">
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          height="24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="group-hover:rounded-lg group-hover:opacity-1 p-3 bg-white/50 hover:bg-yellow-300 backdrop-blur-md group-hover:shadow-xl flex justify-center items-center w-full h-full text-yellow-400 hover:text-black duration-200"
        >
          <path
            className="opacity-0 group-hover:opacity-100 duration-200"
            d="M21.93 16.56c-.14-.38-.43-.56-.71-.75c-.05-.03-.11-.06-.15-.08c-.07-.05-.18-.09-.27-.14c-.94-.5-1.68-1.13-2.19-1.87a6 6 0 0 1-.37-.66c-.04-.13-.04-.2-.01-.26c.03-.05.07-.1.12-.13c.15-.11.33-.21.44-.29c.21-.13.36-.23.46-.3c.39-.27.66-.58.83-.88c.24-.45.27-.98.08-1.45c-.25-.67-.89-1.09-1.66-1.09c-.16 0-.32.02-.5.05c0 .01-.06.02-.1.03c0-.46-.01-.94-.05-1.42c-.14-1.68-.73-2.56-1.35-3.26c-.39-.44-.85-.82-1.36-1.11c-.93-.53-1.99-.8-3.14-.8s-2.2.27-3.13.8c-.52.29-.98.67-1.37 1.11c-.62.7-1.2 1.58-1.35 3.26c-.04.48-.05.96-.04 1.42c-.05-.01-.11-.02-.11-.03c-.18-.03-.34-.05-.5-.05c-.77 0-1.41.42-1.66 1.09c-.19.47-.16 1 .08 1.45c.17.3.44.61.83.88c.1.07.25.17.46.31l.42.27c.06.04.1.09.14.14c.03.07.03.14-.02.27c-.1.23-.22.43-.36.65c-.5.73-1.21 1.35-2.12 1.84c-.49.26-.99.44-1.2 1c-.16.44-.07.94.35 1.35c.15.15.32.28.51.38c.4.21.82.39 1.25.5c.09.03.18.06.25.12c.15.12.13.32.33.59c.1.16.24.29.37.39c.41.29.87.3 1.37.32c.44.02.94.04 1.5.23c.26.06.5.23.79.41c.71.42 1.63 1 3.21 1c1.57 0 2.5-.58 3.22-1.01c.28-.17.53-.34.78-.4c.55-.19 1.06-.21 1.5-.23c.5-.01.96-.03 1.37-.32c.17-.12.31-.28.42-.46c.14-.24.14-.43.27-.52c.07-.05.15-.09.24-.11c.44-.12.86-.3 1.26-.51q.315-.165.54-.42h.01c.39-.41.47-.87.32-1.31m-1.4.75c-.86.47-1.43.42-1.87.69c-.16.12-.21.28-.24.44l-.03.2c-.02.14-.05.26-.15.33c-.34.23-1.33-.02-2.61.4c-1.06.35-1.73 1.36-3.63 1.36s-2.55-1-3.63-1.36c-1.27-.42-2.27-.17-2.6-.4c-.27-.19-.05-.71-.43-.97c-.44-.27-1.01-.22-1.84-.69c-.31-.16-.36-.31-.32-.38c.04-.09.16-.16.24-.2c1.65-.79 2.58-1.82 3.05-2.63c.44-.72.53-1.27.56-1.35c.03-.21.06-.37-.17-.58c-.22-.21-1.2-.81-1.47-1c-.46-.32-.65-.63-.51-1.02c.12-.27.35-.37.62-.37q.12 0 .24.03c.5.1.98.35 1.26.42c.03.01.06.01.1.01c.09 0 .14-.03.17-.09c.01-.04.02-.09.02-.15c-.04-.54-.11-1.59-.03-2.58c.04-.42.11-.78.2-1.09c.2-.68.54-1.13.88-1.54c.25-.29 1.41-1.52 3.66-1.52c1.85 0 2.96.84 3.44 1.29c.1.1.18.18.22.23c.38.44.72.92.92 1.68c.07.27.13.59.16.95c.08.98.01 2.04-.03 2.58c0 .04 0 .08.01.11c.01.09.07.13.18.13c.04 0 .07 0 .1-.01c.28-.07.76-.32 1.26-.43c.08-.01.16-.02.24-.02c.25 0 .5.09.6.32l.01.04h.01v.01c.15.38-.05.7-.5 1.01c-.27.19-1.26.8-1.48 1c-.23.22-.2.38-.17.59c.03.1.21 1.05 1.11 2.11c.55.64 1.34 1.31 2.5 1.87c.07.03.16.08.21.14c.03.05.05.09.04.13c-.01.1-.1.2-.3.31"
          />
        </svg>
      </a>

      {/* Gmail */}
      <a href="#">
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          height="24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="group-hover:rounded-lg group-hover:opacity-1 p-3 bg-white/50 hover:bg-slate-600 backdrop-blur-md group-hover:shadow-xl rounded-bl-lg flex justify-center items-center w-full h-full text-slate-600 hover:text-white duration-200"
        >
          <path
            className="opacity-0 group-hover:opacity-100 duration-200"
            d="M4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.587 1.413T20 20zm8-7l8-5V6l-8 5l-8-5v2z"
          />
        </svg>
      </a>
      <a href="#">
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          height="24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="group-hover:rounded-lg group-hover:opacity-1 p-3 bg-white/50 hover:bg-blue-600 backdrop-blur-md group-hover:shadow-xl flex justify-center items-center w-full h-full text-blue-600 hover:text-white duration-200"
        >
          <path
            clipRule="evenodd"
            d="M13.135 6H15V3h-1.865a4.147 4.147 0 0 0-4.142 4.142V9H7v3h2v9.938h3V12h2.021l.592-3H12V6.591A.6.6 0 0 1 12.592 6h.543Z"
            fillRule="evenodd"
            className="opacity-0 group-hover:opacity-100 duration-200"
          ></path>
        </svg>
      </a>
      <a href="#">
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          height="24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="group-hover:rounded-lg group-hover:opacity-1 p-3 bg-white/50 hover:bg-red-500 backdrop-blur-md group-hover:shadow-xl rounded-br-lg flex justify-center items-center w-full h-full text-red-500 hover:text-white duration-200"
        >
          <path
            clipRule="evenodd"
            d="M21.7 8.037a4.26 4.26 0 0 0-.789-1.964 2.84 2.84 0 0 0-1.984-.839c-2.767-.2-6.926-.2-6.926-.2s-4.157 0-6.928.2a2.836 2.836 0 0 0-1.983.839 4.225 4.225 0 0 0-.79 1.965 30.146 30.146 0 0 0-.2 3.206v1.5a30.12 30.12 0 0 0 .2 3.206c.094.712.364 1.39.784 1.972.604.536 1.38.837 2.187.848 1.583.151 6.731.2 6.731.2s4.161 0 6.928-.2a2.844 2.844 0 0 0 1.985-.84 4.27 4.27 0 0 0 .787-1.965 30.12 30.12 0 0 0 .2-3.206v-1.516a30.672 30.672 0 0 0-.202-3.206Zm-11.692 6.554v-5.62l5.4 2.819-5.4 2.801Z"
            fillRule="evenodd"
            className="opacity-0 group-hover:opacity-100 duration-200"
          ></path>
        </svg>
      </a>
    </div>

  )
}

export default Socials