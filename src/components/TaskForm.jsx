import React, { useState, useEffect } from 'react'
import { PlusIcon, EditIcon, AlertTriangleIcon } from './Icons'

// Modul Form Input & Edit Tugas (Implementasi oleh Ridho Satrio)
export default function TaskForm({
  onSubmitTask,
  onAddTask,
  onUpdateTask,
  editingTask = null,
  onCancelEdit,
}) {
  const [title, setTitle] = useState('')
  const [course, setCourse] = useState('')
  const [deadline, setDeadline] = useState('')
  const [notes, setNotes] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title || '')
      setCourse(editingTask.course || '')
      setDeadline(editingTask.deadline || '')
      setNotes(editingTask.notes || '')
      setError('')
    } else {
      resetForm()
    }
  }, [editingTask])

  const resetForm = () => {
    setTitle('')
    setCourse('')
    setDeadline('')
    setNotes('')
    setError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!title.trim() || !course.trim() || !deadline.trim()) {
      setError('Judul, Mata Kuliah, dan Tenggat Waktu wajib diisi!')
      return
    }

    const payload = {
      ...(editingTask && { id: editingTask.id }),
      title: title.trim(),
      course: course.trim(),
      deadline,
      notes: notes.trim(),
    }

    if (onSubmitTask) {
      onSubmitTask(payload)
    } else if (editingTask && onUpdateTask) {
      onUpdateTask({ ...editingTask, ...payload })
    } else if (onAddTask) {
      onAddTask({
        id: `task-${Date.now()}`,
        ...payload,
        completed: false,
        createdAt: new Date().toISOString(),
      })
    }

    resetForm()
  }

  const handleCancel = () => {
    resetForm()
    if (onCancelEdit) {
      onCancelEdit()
    }
  }

  return (
    <div className="surface-card">
      <form onSubmit={handleSubmit} className="task-form">
        <h2 className="card-heading">
          {editingTask ? (
            <>
              <EditIcon size={18} />
              Edit Tugas
            </>
          ) : (
            <>
              <PlusIcon size={18} />
              Tambah Tugas Baru
            </>
          )}
        </h2>

        {error && (
          <div className="form-error-alert" role="alert">
            <AlertTriangleIcon size={16} />
            <span>{error}</span>
          </div>
        )}

        <div className="form-group">
          <label htmlFor="task-title" className="form-label">
            Judul Tugas <span className="form-required">*</span>
          </label>
          <input
            type="text"
            id="task-title"
            className="form-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Contoh: Laporan Praktikum Web"
          />
        </div>

        <div className="form-group">
          <label htmlFor="task-course" className="form-label">
            Mata Kuliah <span className="form-required">*</span>
          </label>
          <input
            type="text"
            id="task-course"
            className="form-input"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            placeholder="Contoh: Pemrograman Web"
          />
        </div>

        <div className="form-group">
          <label htmlFor="task-deadline" className="form-label">
            Tenggat Waktu <span className="form-required">*</span>
          </label>
          <input
            type="datetime-local"
            id="task-deadline"
            className="form-input"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="task-notes" className="form-label">
            Catatan Tambahan (Opsional)
          </label>
          <textarea
            id="task-notes"
            className="form-textarea"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Catatan khusus, referensi link, dll..."
            rows="3"
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-primary">
            {editingTask ? (
              <>
                <EditIcon size={16} />
                Simpan Perubahan
              </>
            ) : (
              <>
                <PlusIcon size={16} />
                Tambah Tugas
              </>
            )}
          </button>

          {editingTask && (
            <button type="button" onClick={handleCancel} className="btn-secondary">
              Batal
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
