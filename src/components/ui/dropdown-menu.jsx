import React, { useState, useRef } from "react";

export function DropdownMenu({ children }) {
  return <div className="relative inline-block">{children}</div>;
}

export function DropdownMenuTrigger({ asChild, children }) {
  return (
    <div className="cursor-pointer inline-block">
      {asChild ? children : <button>{children}</button>}
    </div>
  );
}

export function DropdownMenuContent({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div
      ref={ref}
      onMouseLeave={() => setIsOpen(false)}
      className="relative inline-block"
    >
      <button onClick={toggleMenu} className="focus:outline-none">
        {children[0]}
      </button>
      {isOpen && (
        <div className="absolute z-10 mt-2 py-2 w-48 bg-white rounded shadow-lg">
          {children.slice(1)}
        </div>
      )}
    </div>
  );
}

export function DropdownMenuItem({ children, onClick }) {
  return (
    <div
      className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
      onClick={onClick}
    >
      {children}
    </div>
  );
}
