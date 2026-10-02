import React from 'react'
import { CheckIcon } from './Icons'

export default function Header() {
  return (
    <header className="app-header">
      <div className="header-top">
        <div className="brand-group">
          <div className="brand-logo-icon" aria-hidden="true">
            <CheckIcon size={20} />
          </div>
          <div>
            <h1 className="brand-title">TaskMate</h1>
            <p className="brand-slogan">Catat tugas. Tetapkan tenggat. Pantau selesai.</p>
          </div>
        </div>
        <div className="header-badge">
          <span className="header-badge-dot"></span>
          ITC Front End • Kelompok 2
        </div>
      </div>
    </header>
  )
}
