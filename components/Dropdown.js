'use client'

import { useState, useRef, useEffect } from 'react'
import { FaChevronDown } from 'react-icons/fa'

export default function Dropdown({
  options,
  selected,
  onChange,
  isObject,
  rightIcon,
}) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = option => {
    onChange(isObject ? option.id : option)
    setIsOpen(false)
  }

  const getSelectedName = () => {
    if (isObject) {
      const selectedOption = options.find(opt => opt.id === selected)
      return selectedOption ? selectedOption.name : 'Select...'
    }
    return selected
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full gap-3 px-4 py-3 border border-gray-300 rounded-lg md:w-56 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      >
        <span className="capitalize">{getSelectedName()}</span>
        {rightIcon ? (
          rightIcon
        ) : (
          <FaChevronDown
            className={`transition-transform duration-200 ${
              isOpen ? 'transform rotate-180' : ''
            }`}
          />
        )}
      </button>
      {isOpen && (
        <ul className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700">
          {options.map(option => (
            <li
              key={isObject ? option.id : option}
              onClick={() => handleSelect(option)}
              className="px-4 py-2 capitalize cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {isObject ? option.name : option}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
