import { useEffect, useRef } from 'react'
const ClickOutside = handler => {
  let domNode = useRef()
  useEffect(() => {
    let maybeHandler = event => {
      if (!domNode.current.contains(event.target)) {
        handler()
      }
    }
    document.addEventListener('mousedown', maybeHandler)
    return () => {
      document.removeEventListener('mousedown', maybeHandler)
    }
  })
  return domNode
}
export default ClickOutside
