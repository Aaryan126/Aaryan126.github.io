import { useRef, useCallback, useState } from 'react'
import { motion } from 'framer-motion'

export default function Window({ id, title, x, y, width, height, zIndex, onClose, onFocus, onMinimize, onDragEnd, children }) {
  const windowRef = useRef(null)
  const dragOffset = useRef({ x: 0, y: 0 })
  const [size, setSize] = useState({ w: width, h: height })

  const handleTitleBarMouseDown = useCallback((e) => {
    if (e.target.closest('.desktop-window-btn')) return
    e.preventDefault()
    onFocus(id)

    const rect = windowRef.current.getBoundingClientRect()
    dragOffset.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }

    const handleMouseMove = (e) => {
      const newX = e.clientX - dragOffset.current.x
      const newY = Math.max(28, e.clientY - dragOffset.current.y)
      windowRef.current.style.left = `${newX}px`
      windowRef.current.style.top = `${newY}px`
    }

    const handleMouseUp = (e) => {
      const newX = e.clientX - dragOffset.current.x
      const newY = Math.max(28, e.clientY - dragOffset.current.y)
      onDragEnd(id, newX, newY)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
  }, [id, onFocus, onDragEnd])

  const handleResizeMouseDown = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    onFocus(id)

    const startX = e.clientX
    const startY = e.clientY
    const startW = size.w
    const startH = size.h

    const handleMouseMove = (e) => {
      const newW = Math.max(320, startW + (e.clientX - startX))
      const newH = Math.max(200, startH + (e.clientY - startY))
      setSize({ w: newW, h: newH })
    }

    const handleMouseUp = () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
  }, [id, onFocus, size])

  return (
    <motion.div
      ref={windowRef}
      className="desktop-window"
      style={{ left: x, top: y, width: size.w, height: size.h, zIndex }}
      initial={{ opacity: 0, scale: 0.85, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.85, y: 15, transition: { duration: 0.15 } }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      onMouseDown={(e) => {
        if (!e.target.closest('.desktop-window-content')) {
          onFocus(id)
        }
      }}
    >
      <div className="desktop-window-frame" />
      <div className="desktop-window-titlebar" onMouseDown={handleTitleBarMouseDown}>
        <div className="desktop-window-buttons">
          <button className="desktop-window-btn close" onClick={() => onClose(id)} aria-label="Close" />
          <button className="desktop-window-btn minimize" onClick={() => onMinimize(id)} aria-label="Minimize" />
          <button className="desktop-window-btn maximize" aria-label="Maximize" />
        </div>
        <span className="desktop-window-title">{title}</span>
      </div>
      <div className="desktop-window-content">
        {children}
      </div>
      <div className="desktop-window-resize" onMouseDown={handleResizeMouseDown} />
    </motion.div>
  )
}
