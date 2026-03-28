import { useState, useCallback, useEffect, useRef, useMemo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Window from './Window'
import AppContent from './AppContent'
import './desktop.css'

const APPS = [
  { id: 'about', title: 'Contacts', icon: '/desktop-icons/contacts.png', pos: { x: 120, y: 80 }, size: { w: 620, h: 530 }, dockOnly: true },
  { id: 'projects', title: 'Projects', icon: '/desktop-icons/folder.png', pos: { x: 180, y: 60 }, size: { w: 760, h: 560 } },
  { id: 'experience', title: 'Notes', icon: '/desktop-icons/notes.png', pos: { x: 100, y: 40 }, size: { w: 900, h: 620 } },
  { id: 'skills', title: 'aaryan \u2014 -zsh \u2014 120\u00d730', icon: '/desktop-icons/terminal.png', pos: { x: 100, y: 70 }, size: { w: 720, h: 480 }, dockOnly: true },
  { id: 'contact', title: 'Mail', icon: '/desktop-icons/mail.png', pos: { x: 80, y: 50 }, size: { w: 920, h: 580 }, dockOnly: true },
  { id: 'resume', title: 'Aaryan_Kandiah_Resume.pdf - Preview', icon: '/desktop-icons/preview.png', pos: { x: 200, y: 50 }, size: { w: 700, h: 600 } },
  { id: 'commands', title: 'Terminal Commands', icon: '/desktop-icons/textedit.png', pos: { x: 260, y: 80 }, size: { w: 480, h: 520 } },
  { id: 'safari', title: 'Safari', icon: '/desktop-icons/safari.png', pos: { x: 120, y: 50 }, size: { w: 900, h: 600 }, dockOnly: true },
]

const DESKTOP_APPS = APPS.filter(a => !a.dockOnly)
const DOCK_APPS = APPS.filter(a => a.id !== 'commands')

function useClockTime() {
  const [time, setTime] = useState('')
  useEffect(() => {
    const update = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }))
    }
    update()
    const id = setInterval(update, 10000)
    return () => clearInterval(id)
  }, [])
  return time
}

const APPLE_MENU = [
  { label: 'About This Mac', action: 'about' },
  { divider: true },
  { label: 'System Settings...', action: 'settings' },
  { divider: true },
  { label: 'Sleep', disabled: true },
  { label: 'Restart...', disabled: true },
  { label: 'Shut Down...', disabled: true },
  { divider: true },
  { label: 'Exit Desktop Mode', action: 'exit' },
]

const FILE_MENU = [
  { label: 'New Finder Window', shortcut: '\u2318N', disabled: true },
  { label: 'New Folder', shortcut: '\u21e7\u2318N', disabled: true },
  { divider: true },
  { label: 'Open', shortcut: '\u2318O', disabled: true },
  { label: 'Close Window', shortcut: '\u2318W', disabled: true },
  { divider: true },
  { label: 'Get Info', shortcut: '\u2318I', disabled: true },
]

const EDIT_MENU = [
  { label: 'Undo', shortcut: '\u2318Z', disabled: true },
  { label: 'Redo', shortcut: '\u21e7\u2318Z', disabled: true },
  { divider: true },
  { label: 'Cut', shortcut: '\u2318X', disabled: true },
  { label: 'Copy', shortcut: '\u2318C', disabled: true },
  { label: 'Paste', shortcut: '\u2318V', disabled: true },
  { label: 'Select All', shortcut: '\u2318A', disabled: true },
]

const VIEW_MENU = [
  { label: 'as Icons', shortcut: '\u2318\u0031', disabled: true },
  { label: 'as List', shortcut: '\u2318\u0032', disabled: true },
  { label: 'as Columns', shortcut: '\u2318\u0033', disabled: true },
  { divider: true },
  { label: 'Show Path Bar', disabled: true },
  { label: 'Show Status Bar', disabled: true },
]

const WIFI_MENU = [
  { label: 'Wi-Fi', toggle: true },
  { divider: true },
  { label: 'AaryanOS-5G', icon: 'fas fa-wifi', active: true },
  { label: 'Neighbor-WiFi', icon: 'fas fa-wifi' },
  { label: 'Coffee-Shop', icon: 'fas fa-wifi' },
  { divider: true },
  { label: 'Network Settings...', disabled: true },
]

function TopBar({ time, onExit }) {
  const [openMenu, setOpenMenu] = useState(null)
  const barRef = useRef(null)

  useEffect(() => {
    const handleClick = (e) => {
      if (barRef.current && !barRef.current.contains(e.target)) {
        setOpenMenu(null)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const handleMenuClick = (key) => {
    setOpenMenu(prev => prev === key ? null : key)
  }

  const handleItemClick = (item) => {
    if (item.disabled) return
    if (item.action === 'exit') onExit()
    setOpenMenu(null)
  }

  const renderDropdown = (items) => (
    <motion.div
      className="topbar-dropdown"
      initial={{ opacity: 0, y: -4, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -4, scale: 0.98, transition: { duration: 0.1 } }}
      transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
    >
      {items.map((item, i) => {
        if (item.divider) return <div key={i} className="topbar-dropdown-divider" />
        return (
          <div
            key={i}
            className={`topbar-dropdown-item ${item.disabled ? 'disabled' : ''} ${item.active ? 'active' : ''}`}
            onClick={() => handleItemClick(item)}
          >
            {item.icon && <i className={item.icon} style={{ width: 16, textAlign: 'center', fontSize: 11 }}></i>}
            <span>{item.label}</span>
            {item.shortcut && <span className="topbar-dropdown-shortcut">{item.shortcut}</span>}
            {item.toggle !== undefined && <span className="topbar-toggle-dot" />}
            {item.active && <i className="fas fa-check" style={{ fontSize: 10, marginLeft: 'auto' }}></i>}
          </div>
        )
      })}
    </motion.div>
  )

  return (
    <div className="desktop-topbar" ref={barRef}>
      <div className="desktop-topbar-left">
        <div className="topbar-menu-item" onClick={() => handleMenuClick('apple')}>
          <svg className="topbar-apple-logo" viewBox="0 0 814 1000" xmlns="http://www.w3.org/2000/svg">
            <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105.6-57.8-155.5-127.4c-58.8-82.7-106.8-211.2-106.8-333.8 0-196.3 127.5-300.6 253.3-300.6 66.6 0 122.1 43.7 163.8 43.7 39.5 0 101.1-46.4 177.2-46.4 28.7 0 131.7 2.6 199.1 98.5zM554.1 159.4c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 103.3-30.4 135.5-71.3z" fill="currentColor"/>
          </svg>
          <AnimatePresence>{openMenu === 'apple' && renderDropdown(APPLE_MENU)}</AnimatePresence>
        </div>
        <span className="desktop-topbar-logo">AaryanOS</span>
        <div className="desktop-topbar-menu">
          {[['Finder', null], ['File', FILE_MENU], ['Edit', EDIT_MENU], ['View', VIEW_MENU]].map(([label, menu]) => (
            <div
              key={label}
              className={`topbar-menu-item ${openMenu === label ? 'open' : ''}`}
              onClick={() => menu && handleMenuClick(label)}
              onMouseEnter={() => openMenu && menu && setOpenMenu(label)}
            >
              <span>{label}</span>
              <AnimatePresence>{openMenu === label && menu && renderDropdown(menu)}</AnimatePresence>
            </div>
          ))}
        </div>
      </div>
      <div className="desktop-topbar-right">
        <div className="topbar-menu-item topbar-right-item" onClick={() => handleMenuClick('wifi')}
          onMouseEnter={() => openMenu && setOpenMenu('wifi')}>
          <i className="fas fa-wifi"></i>
          <AnimatePresence>{openMenu === 'wifi' && renderDropdown(WIFI_MENU)}</AnimatePresence>
        </div>
        <div className="topbar-right-item">
          <i className="fas fa-battery-full"></i>
        </div>
        <div className="topbar-right-item">
          <span>{time}</span>
        </div>
      </div>
    </div>
  )
}

export default function DesktopView({ onExit }) {
  const [openWindows, setOpenWindows] = useState([])
  const [minimized, setMinimized] = useState(new Set())
  const [positions, setPositions] = useState({})
  const [focusOrder, setFocusOrder] = useState([])
  const [selectedIcon, setSelectedIcon] = useState(null)
  const time = useClockTime()
  const nextZ = useRef(10)

  const openApp = useCallback((appId) => {
    setMinimized(prev => {
      const next = new Set(prev)
      next.delete(appId)
      return next
    })
    setOpenWindows(prev => {
      if (prev.includes(appId)) return prev
      return [...prev, appId]
    })
    setFocusOrder(prev => [...prev.filter(id => id !== appId), appId])
    nextZ.current += 1
  }, [])

  const closeApp = useCallback((appId) => {
    setOpenWindows(prev => prev.filter(id => id !== appId))
    setFocusOrder(prev => prev.filter(id => id !== appId))
    setMinimized(prev => {
      const next = new Set(prev)
      next.delete(appId)
      return next
    })
  }, [])

  const minimizeApp = useCallback((appId) => {
    setMinimized(prev => new Set([...prev, appId]))
  }, [])

  const focusApp = useCallback((appId) => {
    setFocusOrder(prev => [...prev.filter(id => id !== appId), appId])
    nextZ.current += 1
  }, [])

  const updatePos = useCallback((appId, x, y) => {
    setPositions(prev => ({ ...prev, [appId]: { x, y } }))
  }, [])

  const handleIconDoubleClick = useCallback((appId) => {
    setSelectedIcon(appId)
    openApp(appId)
  }, [openApp])

  const handleDesktopClick = useCallback((e) => {
    if (e.target === e.currentTarget || e.target.classList.contains('desktop-bg')) {
      setSelectedIcon(null)
    }
  }, [])

  return (
    <motion.div
      className="desktop-mode"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      onClick={handleDesktopClick}
    >
      <div className="desktop-bg" />

      {/* Top Bar */}
      <TopBar time={time} onExit={onExit} />

      {/* Desktop Icons */}
      <div className="desktop-icons">
        {DESKTOP_APPS.map(app => (
          <div
            key={app.id}
            className={`desktop-icon ${selectedIcon === app.id ? 'selected' : ''}`}
            onClick={() => setSelectedIcon(app.id)}
            onDoubleClick={() => handleIconDoubleClick(app.id)}
          >
            <div className="desktop-icon-img">
              <img src={app.icon} alt={app.title} draggable={false} />
            </div>
            <span className="desktop-icon-label">{app.title}</span>
          </div>
        ))}
      </div>

      {/* Windows */}
      <AnimatePresence>
        {openWindows.map(appId => {
          if (minimized.has(appId)) return null
          const app = APPS.find(a => a.id === appId)
          const pos = positions[appId] || app.pos
          const zIndex = focusOrder.indexOf(appId) + 10

          return (
            <Window
              key={appId}
              id={appId}
              title={app.title}
              x={pos.x}
              y={pos.y}
              width={app.size.w}
              height={app.size.h}
              zIndex={zIndex}
              onClose={closeApp}
              onFocus={focusApp}
              onMinimize={minimizeApp}
              onDragEnd={updatePos}
            >
              <AppContent appId={appId} onClose={() => closeApp(appId)} onMinimize={() => minimizeApp(appId)} />
            </Window>
          )
        })}
      </AnimatePresence>

      {/* Dock */}
      <div className="desktop-dock">
        {DOCK_APPS.map(app => (
          <div
            key={app.id}
            className="desktop-dock-item"
            onClick={() => openApp(app.id)}
            title={app.title}
          >
            <div className="desktop-dock-icon">
              <img src={app.icon} alt={app.title} draggable={false} />
            </div>
            {openWindows.includes(app.id) && <div className="desktop-dock-indicator" />}
          </div>
        ))}
        <div className="desktop-dock-separator" />
        <div className="desktop-dock-item" onClick={onExit} title="Exit Desktop">
          <div className="desktop-dock-icon desktop-dock-exit">
            <i className="fas fa-arrow-right-from-bracket"></i>
          </div>
        </div>
      </div>

    </motion.div>
  )
}
