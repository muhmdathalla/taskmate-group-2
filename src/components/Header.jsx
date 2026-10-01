import React from 'react'

export default function Header() {
  return (
    <header className="app-header">
      <div className="header-top">
        <div className="brand-group">
          <div className="brand-icon">✓</div>
          <div>
            <h1 className="brand-title">TaskMate</h1>
            <p className="brand-slogan">Catat tugas. Tetapkan tenggat. Pantau selesai.</p>
          </div>
        </div>
        <div className="brand-badge">ITC Front End • Kelompok 2</div>
      </div>
    </header>
  )
}
