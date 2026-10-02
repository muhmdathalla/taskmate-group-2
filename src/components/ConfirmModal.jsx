import React, { useEffect } from 'react'

// Halo Fani! Ini popup modal konfirmasi sebelum hapus tugas yaa.
// Biar user ga sengaja kepencet tombol hapus terus datanya langsung ilang.
//
// Props dari App.jsx:
// - isOpen    : true kalau modal lagi kebuka, false kalau ditutup
// - task      : tugas yg mau dihapus (buat ditampilin judulnya di pesan konfirmasi)
// - onConfirm : fungsi pas tombol "Ya, Hapus" diklik
// - onCancel  : fungsi pas tombol "Batal" diklik

export default function ConfirmModal({
  isOpen,
  task,
  onConfirm,
  onCancel,
}) {
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onCancel()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onCancel])

  if (!isOpen || !task) return null

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(3px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 999,
        padding: '1rem',
      }}
    >
      <div
        className="surface-card"
        style={{
          width: '100%',
          maxWidth: '420px',
          padding: '1.5rem',
          boxShadow: 'var(--shadow-lg)',
          animation: 'fadeIn 0.15s ease',
        }}
      >
        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-danger)', marginBottom: '0.5rem' }}>
          ⚠️ Konfirmasi Hapus
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.25rem', lineHeight: 1.5 }}>
          Yakin mau hapus tugas{' '}
          <strong style={{ color: 'var(--text-main)' }}>"{task.title}"</strong>?
          Data yg dihapus ga bisa dibalikin lagi yaa.
        </p>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
          <button
            type="button"
            onClick={onCancel}
            style={{
              padding: '0.6rem 1rem',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-surface-soft)',
              color: 'var(--text-main)',
              fontWeight: 600,
              fontSize: '0.875rem',
            }}
          >
            Batal
          </button>
          <button
            type="button"
            onClick={onConfirm}
            style={{
              padding: '0.6rem 1rem',
              borderRadius: 'var(--radius-md)',
              background: 'var(--color-danger)',
              color: '#ffffff',
              fontWeight: 700,
              fontSize: '0.875rem',
            }}
          >
            Ya, Hapus
          </button>
        </div>
      </div>
    </div>
  )
}
