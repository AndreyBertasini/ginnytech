import React from 'react'
import Link from 'next/link'

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Chi sono', href: '/chi-sono' },
  { label: 'Cerca', href: '/cerca' },
]

export function Header() {
  return (
    <header className="site-header">
      <nav className="site-nav">
        <ul className="nav-list">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
