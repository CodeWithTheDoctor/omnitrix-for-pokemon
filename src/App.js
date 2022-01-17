import "./App.css"
import { gsap } from "gsap"
import { Draggable } from "gsap/Draggable"
import { useEffect, useRef, useState } from "react"
import { ReactComponent as Omnitrix } from "./images/Omnitrix.svg"

gsap.registerPlugin(Draggable)

function App() {
  const dragInstance = useRef(null)
  const boxRef = useRef(null)
  const [isLoading, setIsLoading] = useState(true)
  const [pokeImage, setPokeImage] = useState("")

  const createDraggableComponent = (pokeList) => {
    dragInstance.current = Draggable.create(boxRef.current, {
      type: "rotation",
      onDrag() {
        setPokeImage(pokeList[this.rotation / 45])
      },
      liveSnap: function (value) {
        return Math.round(value / 45) * 45
      },
      bounds: {
        minRotation: 0,
        maxRotation: 360,
      },
    })
  }

  const cacheImages = async (srcArray) => {
    const promises = await srcArray.map((src) => {
      return new Promise((resolve, reject) => {
        const img = new Image()

        img.src = src
        img.onload = resolve()
        img.onerror = reject()
      })
    })

    await Promise.all(promises)
    setIsLoading(false)
    createDraggableComponent(srcArray)
  }

  useEffect(() => {
    let pokeList = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(() => {
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${Math.round(
        400 * Math.random()
      )}.png`
    })
    setPokeImage(pokeList[0])
    cacheImages(pokeList)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="App flex relative justify-center h-screen items-center">
      {isLoading ? (
        <h1>Loading</h1>
      ) : (
        <>
          <Omnitrix ref={boxRef} />
          <img
            src={pokeImage}
            className="absolute z-10 h-60 pointer-events-none"
            alt="pokemon"
          ></img>
          <button className="box"></button>
        </>
      )}
    </div>
  )
}

export default App
