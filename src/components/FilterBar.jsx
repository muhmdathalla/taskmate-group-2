import React from 'react'

/**
 * ============================================================================
 * MODUL PENCARIAN & FILTER (TANGGUNG JAWAB: RIFANI JUNIARTI)
 * ============================================================================
 * Halo Rifani! File ini adalah komponen bilah pencarian & filter status.
 * 
 * PROPS YANG DITERIMA:
 * - searchQuery        : String teks pencarian saat ini
 * - onSearchChange     : Fungsi callback saat input teks pencarian berubah
 * - statusFilter       : Nilai filter saat ini ('all', 'pending', 'completed')
 * - onStatusFilterChange: Fungsi callback saat tombol filter status ditekan
 * 
 * ATURAN SPESIFIKASI ITC:
 * 1. Pencarian judul tidak membedakan huruf kapital/kecil (case-insensitive)
 * 2. Filter: "Semua", "Belum Selesai", dan "Selesai"
 * ============================================================================
 */

export default function FilterBar({
  searchQuery = '',
  onSearchChange,
  statusFilter = 'all',
  onStatusFilterChange,
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.25rem' }}>
      {/* Input Pencarian */}
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

      {/* Tombol Filter Status */}
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
