import React from 'react'
import { SearchIcon, CloseIcon } from './Icons'

// Modul Pencarian & Filter Status (Implementasi oleh Rifani Juniarti)
export default function FilterBar({
  searchQuery = '',
  onSearchChange,
  statusFilter = 'all',
  onStatusFilterChange,
  taskCounts = { all: 0, pending: 0, completed: 0 },
}) {
  const tabs = [
    { key: 'all', label: 'Semua', count: taskCounts.all },
    { key: 'pending', label: 'Belum Selesai', count: taskCounts.pending },
    { key: 'completed', label: 'Selesai', count: taskCounts.completed },
  ]

  return (
    <div className="filter-bar-wrapper">
      {/* Kolom Pencarian */}
      <div className="search-input-container">
        <span className="search-icon-prefix" aria-hidden="true">
          <SearchIcon size={16} />
        </span>
        <input
          type="text"
          className="search-input"
          placeholder="Cari tugas berdasarkan judul..."
          value={searchQuery}
          onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
          aria-label="Cari tugas"
        />

        {searchQuery && (
          <button
            type="button"
            className="search-clear-btn"
            aria-label="Hapus kata kunci pencarian"
            onClick={() => onSearchChange && onSearchChange('')}
          >
            <CloseIcon size={12} />
          </button>
        )}
      </div>

      {/* Pilihan Filter Status */}
      <div className="filter-tabs" role="tablist" aria-label="Filter status tugas">
        {tabs.map((tab) => {
          const isActive = statusFilter === tab.key
          return (
            <button
              key={tab.key}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`filter-tab-btn ${isActive ? 'active' : ''}`}
              onClick={() => onStatusFilterChange && onStatusFilterChange(tab.key)}
            >
              <span>{tab.label}</span>
              <span className="filter-tab-count">{tab.count}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
