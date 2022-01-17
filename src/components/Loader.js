import { useLayoutEffect, useRef } from "react"
import gsap from "gsap"

const Loader = ({ gsapRef }) => {
  const loaderRef = useRef()

  useLayoutEffect(() => {
    gsapRef.current = gsap.to(loaderRef.current, {
      repeat: 1,
      repeatDelay: 0.35,
      rotation: "+=360",
      duration: 1.5,
      ease: "power1.inOut",
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <img
      ref={loaderRef}
      src="images/logo512.webp"
      alt="logo"
      className="fixed z-20 "
    />
  )
}

export default Loader
