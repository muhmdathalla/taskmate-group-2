import React from 'react'

// Halo Fani! Ini komponen buat search bar sama filter status tugas yaa.
//
// Props dari App.jsx:
// - searchQuery         : teks yg lagi diketik user buat nyari judul
// - onSearchChange      : fungsi biar teks pencarian di App.jsx ikut update
// - statusFilter        : tab filter aktif ('all', 'pending', atau 'completed')
// - onStatusFilterChange : fungsi pas tombol filter status diklik
//
// Sesuai slide: pencarian judul tugas case-insensitive (ga bedain huruf besar/kecil).
// Logika filternya udah jalan di App.jsx, di sini tinggal urus UI & interaksinya ya!

export default function FilterBar({
  searchQuery = '',
  onSearchChange,
  statusFilter = 'all',
  onStatusFilterChange,
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.25rem' }}>
      {/* Kolom Pencarian */}
      <div>
        <input
          type="text"
          placeholder="🔍 Cari tugas berdasarkan judul..."
          value={searchQuery}
          onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
          style={{
            width: '100%',
            padding: '0.65rem 0.85rem',
            borderRadius: 'var(--radius-md)',
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-main)',
          }}
        />
      </div>

      {/* Pilihan Filter Status */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {[
          { key: 'all', label: 'Semua' },
          { key: 'pending', label: 'Belum Selesai' },
          { key: 'completed', label: 'Selesai' },
        ].map((tab) => {
          const isActive = statusFilter === tab.key
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => onStatusFilterChange && onStatusFilterChange(tab.key)}
              style={{
                padding: '0.4rem 0.85rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.85rem',
                fontWeight: 600,
                background: isActive ? 'var(--color-primary)' : 'var(--bg-surface)',
                color: isActive ? '#ffffff' : 'var(--text-muted)',
                border: `1px solid ${isActive ? 'var(--color-primary)' : 'var(--border-color)'}`,
                transition: 'all 0.2s',
              }}
            >
              {tab.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
