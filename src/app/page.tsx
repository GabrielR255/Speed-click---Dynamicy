'use client'

import React, { useRef, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'

function App() {
  const [click, setClick] = useState(0)
  const [time, setTime] = useState(0)
  const [running, setRunning] = useState(false)
  const [targetClicks, setTargetClicks] = useState(20)
  const [totalTime, setTotalTime] = useState(10)

  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const startGame = () => {
    setClick(0)
    setTime(totalTime)
    setRunning(true)

    if (intervalRef.current) clearInterval(intervalRef.current)

    intervalRef.current = setInterval(() => {
      setTime(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!)
          setRunning(false)

          if (click >= targetClicks) {
            toast.success('Você venceu o desafio')
          } else {
            toast.error('Você perdeu, tente novamente')
          }

          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const handleClick = () => {
    if (running && time > 0) {
      setClick(prev => {
        const newClick = prev + 1

        if (newClick >= targetClicks) {
          clearInterval(intervalRef.current!)
          setRunning(false)
          toast.success('Você venceu o desafio')
        }

        return newClick
      })
    }
  }

  const reset = () => {
    setClick(0)
    setTime(0)
    setRunning(false)
    if (intervalRef.current) clearInterval(intervalRef.current)
  }

  return (
    <div className="relative bg-gradient-to-l from-50% to-gray-900 w-screen h-screen sm:bg-blue-950">
      <div className="flex flex-col justify-center items-center p-4 sm:p-10">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-20 w-full max-w-3xl">
          {/* Lado Esquerdo */}
          <div className="flex flex-col gap-4 lg:gap-8 w-full lg:w-auto">
            <div className="bg-gray-900 p-6 sm:p-10 rounded-2xl text-center">
              <h1 className="text-green-400 text-2xl sm:text-4xl font-semibold">Aumentar desafio +</h1>
            </div>

            <div className="bg-gray-900 p-4 sm:p-8 w-full rounded-2xl flex flex-col gap-4 sm:gap-6 justify-center items-center">
              <button
                onClick={() => {
                  reset()
                  setTargetClicks(20)
                  setTotalTime(10)
                  setTime(10)
                }}
                className="bg-blue-600 hover:bg-blue-700 p-3 sm:p-4 rounded-2xl w-full sm:w-[250px] text-white font-semibold cursor-pointer"
              >
                Iniciante: 20 para 10s
              </button>

              <button
                onClick={() => {
                  reset()
                  setTargetClicks(20)
                  setTotalTime(7)
                  setTime(7)
                }}
                className="bg-pink-500 hover:bg-pink-600 p-3 sm:p-4 rounded-2xl w-full sm:w-[250px] text-white font-semibold cursor-pointer"
              >
                Intermediário: 20 para 7s
              </button>

              <button
                onClick={() => {
                  reset()
                  setTargetClicks(20)
                  setTotalTime(5)
                  setTime(5)
                }}
                className="bg-red-600 hover:bg-red-700 p-3 sm:p-4 rounded-2xl w-full sm:w-[250px] text-white font-semibold cursor-pointer"
              >
                Avançado: 20 para 5s
              </button>

              <button
                onClick={reset}
                className="bg-gray-600 hover:bg-gray-700 p-3 sm:p-4 rounded-2xl w-full sm:w-[250px] text-white font-semibold cursor-pointer"
              >
                Resetar desafio
              </button>
            </div>
          </div>

          {/* Lado Direito */}
          <div className="flex flex-col justify-center items-center w-full lg:w-auto">
            <div className="bg-gradient-to-r from-yellow-700 to-yellow-300 p-4 sm:p-5 w-full sm:w-[250px] rounded-2xl shadow-2xl">
              <h1 className="text-center text-3xl sm:text-4xl font-bold text-white">{time}</h1>
              <h1 className="text-center text-lg sm:text-xl">Cronômetro</h1>
            </div>

            <div className="bg-gray-900 p-2 w-[80px] sm:w-[100px] rounded-2xl shadow-2xl mt-4 border-2 border-green-500">
              <h1 className="text-center text-2xl sm:text-3xl font-bold text-white">{click}</h1>
              <h1 className="text-center text-xs sm:text-sm">Contagem</h1>
            </div>

            <Toaster position="top-center" reverseOrder={false} />

            <div className="mt-6">
              <div className="flex bg-green-500 w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] rounded-full justify-center items-center shadow-2xl">
                <button
                  onClick={running ? handleClick : startGame}
                  className="font-bold cursor-pointer w-full h-full active:scale-95 transition duration-150 ease-in-out rounded-full text-white text-lg sm:text-xl"
                >
                  {running ? 'CLIQUE' : 'INICIAR'}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center bg-gray-800 p-2 sm:p-5 w-full sm:w-[860px]  mt-5 rounded-2xl">
          <h1 className="text-sm sm:text-xl text-white text-center">DESAFIO - SPEED CLICK DINÂMICO</h1>
        </div>
      </div>
    </div>
  )
}

export default App
