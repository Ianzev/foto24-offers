import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react"
import { useContext, createContext, useState } from "react"
import foto24Logo from '../../assets/images/foto24_logo.png';

const SidebarContext = createContext()

export function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <aside className={`sticky top-0 h-screen ${expanded ? 'w-52' : '0'} flex flex-col bg-white border-r shadow-sm`}>
      <nav className={`sticky top-0 h-full flex flex-col bg-white border-r shadow-sm`}>
        <div className="p-4 pb-2 flex justify-between items-center">
          <img
            src={foto24Logo}
            className={`overflow-hidden transition-all ${
              expanded ? "w-32" : "w-0"
            }`}
            alt=""
          />
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? <ChevronFirst/> : <ChevronLast/>}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>

        <div className={`border-t ${expanded ? 'flex' : 'hidden'} p-3`}>
          <div
            className={`
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
          `}
          >
            <div className="leading-4">
              <h4 className="font-semibold">Ian Zevallos</h4>
              <span className="text-xs text-gray-600">ian.zevallos.m@gmail.com</span>
            </div>
            <MoreVertical className="w-[20px] border-l-0" size={20} />
          </div>
        </div>
      </nav>
    </aside>
  )
}

export function SidebarItem({ icon, text, active, alert }) {
  const { expanded } = useContext(SidebarContext)

  return (
    <li
      className={`
      relative flex items-center py-2 px-3 my-1
      font-medium rounded-md cursor-pointer
      transition-colors group
        ${
          active
            ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
            : "hover:bg-indigo-50 text-gray-600"
        }
    `}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "w-20px ml-3" : "w-0"
        }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
            expanded ? "" : "top-2"
          }`}
        />
      )}

      {!expanded && (
        <div
          className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-indigo-100 text-indigo-800 text-sm
          opacity-0 -translate-x-3 transition-all
          group-hover:opacity-100 group-hover:translate-x-0
          pointer-events-none
      `}
        >
          {text}
        </div>
      )}
    </li>
  )
}