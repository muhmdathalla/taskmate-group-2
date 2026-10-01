import React, { useState, useEffect } from 'react'

// Halo Dho! Ini file buat bagian form input & edit tugas yaa.
// Struktur dasarnya udah gw siapin, nnti lu tinggal poles logic / styling-nya kalau mau diubah lagi.
//
// Props yang udah gw sediain dari App.jsx:
// - onAddTask(data)        : buat nge-save tugas baru ke state & localStorage
// - editingTask            : data tugas yg lagi di-edit (isinya null kalau lagi mode nambah tugas biasa)
// - onUpdateTask(dataBaru) : buat simpen hasil editan
// - onCancelEdit()         : buat batalin edit & balikin form ke mode nambah
//
// Catatan dari slide ITC:
// 1. Judul, matkul, sama tenggat (deadline) itu wajib diisi yaa.
// 2. Awasin inputan yg cuma spasi doang (pake .trim()).
// 3. Catatan sifatnya opsional (boleh kosong).

export default function TaskForm({
  onAddTask,
  editingTask = null,
  onUpdateTask,
  onCancelEdit,
}) {
  const [title, setTitle] = useState('')
  const [course, setCourse] = useState('')
  const [deadline, setDeadline] = useState('')
  const [notes, setNotes] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  // Pas tombol edit diklik di daftar tugas, otomatis ngisi inputan form pake data lama
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

  // Handle submit form (tambah baru atau update hasil edit)
  const handleSubmit = (e) => {
    e.preventDefault()

    // Validasi sederhana: jangan bolehin kosong atau cuma spasi doang
    if (!title.trim() || !course.trim() || !deadline) {
      setErrorMessage('Judul, mata kuliah, dan tenggat wajib diisi ya!')
      return
    }

    const payload = {
      title: title.trim(),
      course: course.trim(),
      deadline,
      notes: notes.trim(),
    }

    if (editingTask) {
      if (onUpdateTask) {
        onUpdateTask({ ...editingTask, ...payload })
      }
    } else {
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

      {/* Dho, form-nya udah bisa dipake langsung, tapi kalau mau dipercantik atau diatur lagi feel free ya! */}
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
            placeholder="Catatan kecil / link referensi..."
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
