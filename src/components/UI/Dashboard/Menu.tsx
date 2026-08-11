import cn from 'clsx'
import { Bell } from 'lucide-react'
import React from 'react'
import { NavLink } from 'react-router'
import { menuData } from '../../../data/menu.data'
import { useFocus } from '../../../store/focus.store'

export function Menu() {
  const { zone, dashboardIndex } = useFocus()

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 ml-1.5">
          <img src="/images/avatar.png" alt="Avatar" width={25} height={25} />
          <span className="text-[12px] text-text">LolouTheFox</span>
        </div>
        <Bell size={15} />
      </div>

      <div className="flex flex-col gap-2 mt-3">
        {menuData.map((item, index) => (
          <NavLink
            key={item.id}
            to={`/${item.id}`}
            tabIndex={-1}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-2 w-full text-sm cursor-pointer px-2 py-2.5 rounded-xl transition-colors ease-in-out duration-300 outline-none',
                {
                  'bg-hover text-white font-semibold':
                    zone === 'dashboard' && dashboardIndex === index,
                  'text-text hover:bg-hover': !isActive
                }
              )
            }
          >
            {React.cloneElement(item.icon, { size: 18 })}
            <span>{item.title}</span>
          </NavLink>
        ))}
      </div>
    </div>
  )
}
