import { useEffect, useRef, useState } from 'react'

const useClickOutside = () => {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef(null)
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (ref.current && !ref.current.contains(event.target )){
        setExpanded(false)
      }
    }
    document.addEventListener('mouseup', handleOutsideClick)
    return () => {
      document.removeEventListener('mouseup', handleOutsideClick)
    }
  }, [ref, setExpanded])
  return (
    {expanded, setExpanded, ref}
  )
}

export default useClickOutside