import React, { useEffect } from 'react'
import { AlertTriangleIcon } from './Icons'

// Modul Modal Konfirmasi Hapus (Implementasi oleh Rifani Juniarti)
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
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-confirm-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onCancel()
      }}
    >
      <div className="modal-dialog">
        <div className="modal-header">
          <AlertTriangleIcon size={20} />
          <h3 id="modal-confirm-title">Konfirmasi Hapus Tugas</h3>
        </div>

        <p className="modal-desc">
          Apakah kamu yakin ingin menghapus tugas{' '}
          <strong>"{task.title}"</strong>?
          Tindakan ini tidak dapat dibatalkan.
        </p>

        <div className="modal-actions">
          <button
            type="button"
            className="btn-secondary"
            onClick={onCancel}
          >
            Batal
          </button>
          <button
            type="button"
            className="btn-danger-confirm"
            onClick={onConfirm}
          >
            Ya, Hapus
          </button>
        </div>
      </div>
    </div>
  )
}
