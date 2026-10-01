import React, { useState, useEffect } from 'react'

/**
 * ============================================================================
 * MODUL FORM TUGAS (TANGGUNG JAWAB: RIDHO SATRIO)
 * ============================================================================
 * Halo Ridho! File ini adalah template untuk fitur Form Tugas.
 * Kamu bertugas mengelola alur Tambah Tugas, Edit Tugas, dan Validasi Input.
 * 
 * PROPS YANG DITERIMA DARI App.jsx:
 * - onAddTask(taskData)      : Fungsi untuk menyimpan tugas baru ke state utama
 * - editingTask              : Object tugas yang sedang diedit (null jika mode tambah)
 * - onUpdateTask(updatedTask): Fungsi untuk menyimpan perubahan data tugas yang diedit
 * - onCancelEdit()           : Fungsi untuk membatalkan mode edit dan kembali ke mode tambah
 * 
 * ATURAN VALIDASI SESUAI SPESIFIKASI ITC:
 * 1. Judul Tugas (Wajib): Tidak boleh kosong atau cuma berisi spasi (.trim() === '')
 * 2. Mata Kuliah (Wajib): Tidak boleh kosong atau cuma berisi spasi
 * 3. Tenggat Waktu (Wajib): Harus memilih tanggal/waktu yang valid
 * 4. Catatan (Opsional): Boleh diisi atau dikosongkan
 * ============================================================================
 */

export default function TaskForm({
  onAddTask,
  editingTask = null,
  onUpdateTask,
  onCancelEdit,
}) {
  // State form lokal
  const [title, setTitle] = useState('')
  const [course, setCourse] = useState('')
  const [deadline, setDeadline] = useState('')
  const [notes, setNotes] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  // Efek ketika mode edit aktif (mengisi form dengan data yang dipilih)
  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title || '')
      setCourse(editingTask.course || '')
      setDeadline(editingTask.deadline || '')
      setNotes(editingTask.notes || '')
      setErrorMessage('')
    } else {
      resetForm()
    }
  }, [editingTask])

  const resetForm = () => {
    setTitle('')
    setCourse('')
    setDeadline('')
    setNotes('')
    setErrorMessage('')
  }

  // TODO [Ridho]: Lengkapi / sempurnakan logika validasi & pengiriman data
  const handleSubmit = (e) => {
    e.preventDefault()

    // 1. Validasi input wajib & spasi kosong
    if (!title.trim() || !course.trim() || !deadline) {
      setErrorMessage('Judul, mata kuliah, dan tenggat wajib diisi!')
      return
    }

    const payload = {
      title: title.trim(),
      course: course.trim(),
      deadline,
      notes: notes.trim(),
    }

    if (editingTask) {
      // Mode Edit
      if (onUpdateTask) {
        onUpdateTask({ ...editingTask, ...payload })
      }
    } else {
      // Mode Tambah Baru
      if (onAddTask) {
        onAddTask({
          id: `task-${Date.now()}`,
          ...payload,
          completed: false,
          createdAt: new Date().toISOString(),
        })
      }
    }

    resetForm()
  }

  const handleCancel = () => {
    resetForm()
    if (onCancelEdit) onCancelEdit()
  }

  return (
    <div className="surface-card">
      <h2 className="card-title">
        {editingTask ? '✏️ Edit Tugas' : '➕ Tambah Tugas Baru'}
      </h2>

      {errorMessage && (
        <div style={{ color: 'var(--color-danger)', marginBottom: '1rem', fontSize: '0.875rem' }}>
          ⚠️ {errorMessage}
        </div>
      )}

      {/* TODO [Ridho]: Sesuaikan atau percantik styling form ini sesuai kebutuhan */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.35rem', color: 'var(--text-muted)' }}>
            Judul Tugas <span style={{ color: 'var(--color-danger)' }}>*</span>
          </label>
          <input
            type="text"
            placeholder="Contoh: Makalah Kecerdasan Buatan"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              width: '100%',
              padding: '0.65rem 0.85rem',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-surface-soft)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-main)',
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.35rem', color: 'var(--text-muted)' }}>
            Mata Kuliah <span style={{ color: 'var(--color-danger)' }}>*</span>
          </label>
          <input
            type="text"
            placeholder="Contoh: Pemrograman Web"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            style={{
              width: '100%',
              padding: '0.65rem 0.85rem',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-surface-soft)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-main)',
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.35rem', color: 'var(--text-muted)' }}>
            Tenggat Waktu <span style={{ color: 'var(--color-danger)' }}>*</span>
          </label>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            style={{
              width: '100%',
              padding: '0.65rem 0.85rem',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-surface-soft)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-main)',
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.35rem', color: 'var(--text-muted)' }}>
            Catatan Tambahan (Opsional)
          </label>
          <textarea
            rows="3"
            placeholder="Tambahkan detail, link referensi, dll."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            style={{
              width: '100%',
              padding: '0.65rem 0.85rem',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-surface-soft)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-main)',
              resize: 'vertical',
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
          <button
            type="submit"
            style={{
              flex: 1,
              padding: '0.75rem',
              background: 'var(--color-primary)',
              color: '#ffffff',
              fontWeight: 700,
              borderRadius: 'var(--radius-md)',
              transition: 'background 0.2s',
            }}
          >
            {editingTask ? 'Simpan Perubahan' : 'Tambah Tugas'}
          </button>

          {editingTask && (
            <button
              type="button"
              onClick={handleCancel}
              style={{
                padding: '0.75rem 1rem',
                background: 'var(--bg-surface-soft)',
                color: 'var(--text-muted)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
              }}
            >
              Batal
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
