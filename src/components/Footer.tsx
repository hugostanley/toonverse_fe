// import React from 'react'

function Footer() {
  return (
    <div className="w-full h-[40vh] border-2 border-black flex-center bg-black flex-col gap-8">
          <div className="w-[50%] text-[1rem] text-white">
            <h1 className="font-extrabold">Disclaimer</h1>
            <p>
              We are in no way associated with or authorized by the Fox
              Broadcasting Company or FXX and neither these entities nor any of
              its affiliates have licensed or endorsed us.  We are a project run
              by fans for fans.
            </p>
          </div>
          <div>
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
              © 2024
              <a href="#" className="hover:underline">
                ToonVerse™
              </a>
              . All Rights Reserved.
            </span>
          </div>
        </div>
  )
}

export default Footer