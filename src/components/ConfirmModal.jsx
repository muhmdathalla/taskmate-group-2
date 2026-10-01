import React from 'react'

/**
 * ============================================================================
 * MODUL MODAL KONFIRMASI HAPUS (TANGGUNG JAWAB: RIFANI JUNIARTI)
 * ============================================================================
 * Halo Rifani! File ini menampilkan modal popup untuk konfirmasi sebelum hapus.
 * 
 * PROPS YANG DITERIMA:
 * - isOpen       : Boolean penanda modal sedang terbuka/tertutup
 * - task         : Object tugas yang hendak dihapus
 * - onConfirm    : Callback saat tombol "Ya, Hapus" ditekan
 * - onCancel     : Callback saat tombol "Batal" ditekan
 * ============================================================================
 */

export default function ConfirmModal({
  isOpen,
  task,
  onConfirm,
  onCancel,
}) {
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
          ⚠️ Konfirmasi Hapus Tugas
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.25rem', lineHeight: 1.5 }}>
          Apakah kamu yakin ingin menghapus tugas{' '}
          <strong style={{ color: 'var(--text-main)' }}>"{task.title}"</strong>?
          Tindakan ini tidak dapat dibatalkan.
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
