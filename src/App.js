import "./App.css"
import { gsap } from "gsap"
import { Draggable } from "gsap/Draggable"
import { useEffect, useRef, useState } from "react"
import { ReactComponent as Omnitrix } from "./images/Omnitrix.svg"

gsap.registerPlugin(Draggable)

function App() {
  const dragInstance = useRef(null)
  const boxRef = useRef(null)
  const [buttonText, setButtonText] = useState("")

  let pokeList = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(() => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${Math.round(
      400 * Math.random()
    )}.png`
  })

  const [pokeImage, setPokeImage] = useState(pokeList[0])
  console.log(pokeImage)

  const createDraggableComponent = () => {
    dragInstance.current = Draggable.create(boxRef.current, {
      type: "rotation",
      onDrag() {
        setButtonText(Math.random())
        setPokeImage(pokeList[this.rotation / 45])
      },
      onDragEnd() {
        setButtonText("Humongousaur!")
      },
      onDragStart() {
        setButtonText("Its Hero Time!")
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

  useEffect(() => {
    createDraggableComponent()
  }, [])

  return (
    <div className="App">
      <Omnitrix ref={boxRef} className="Onmitrix" />
      <img src={pokeImage} alt="pokemon"></img>
      <button className="box"></button>
    </div>
  )
}

export default App
