import { LibraryBig, LineChart, MessageSquare, Shield } from 'lucide-react'
import React from 'react'

const SideNavbar = () => {
  const menuList=[
    {
      id:1,
      name: 'My Forms',
      icon: LibraryBig,
      path: '/'
    },
    {
      id:1,
      name: 'Responses',
      icon: MessageSquare,
      path: '/'
    },
    {
      id:1,
      name: 'Analytics',
      icon: LineChart,
      path: '/'
    },
    {
      id:1,
      name: 'Upgrade',
      icon: Shield,
      path: '/'
    }
  ]

  return (
    <div className='h-screen shadow-md border'>
      <div>
        {menuList.map((menu, index)=>(
          <h2 key={index}>
            <menu.icon />
            {menu.name}
          </h2>
        ))}
      </div>
    </div>
  )
}

export default SideNavbar
