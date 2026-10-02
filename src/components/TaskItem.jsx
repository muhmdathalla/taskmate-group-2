import React from 'react'
import { CheckIcon, CalendarIcon, BookIcon, EditIcon, TrashIcon, ClockIcon } from './Icons'

function formatDeadline(deadline) {
  if (!deadline) return '-'
  const date = new Date(deadline)
  if (Number.isNaN(date.getTime())) return deadline

  const options = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }

  // Jika menyertakan jam & menit
  if (String(deadline).includes('T')) {
    options.hour = '2-digit'
    options.minute = '2-digit'
  }

  return new Intl.DateTimeFormat('id-ID', options).format(date)
}

function isOverdue(task) {
  if (task.completed || !task.deadline) return false
  const date = new Date(task.deadline)
  if (Number.isNaN(date.getTime())) return false
  if (!String(task.deadline).includes('T')) date.setHours(23, 59, 59, 999)
  return date.getTime() < Date.now()
}

// Modul Kartu Tugas (Implementasi oleh Rifani Juniarti)
export default function TaskItem({
  task,
  onToggleStatus,
  onEdit,
  onRequestDelete,
  editingTask,
}) {
  if (!task) return null

  const isCompleted = Boolean(task.completed)
  const overdue = isOverdue(task)
  const isEditing = editingTask && editingTask.id === task.id

  let cardClasses = 'task-item-card'
  if (isCompleted) cardClasses += ' is-completed'
  if (isEditing) cardClasses += ' is-editing'
  if (overdue) cardClasses += ' is-overdue'

  return (
    <article className={cardClasses}>
      <div className="task-item-top">
        <div className="task-item-main">
          {/* Tombol Checklist Status */}
          <button
            type="button"
            className={`task-checkbox-btn ${isCompleted ? 'checked' : ''}`}
            onClick={() => onToggleStatus && onToggleStatus(task.id)}
            aria-label={isCompleted ? 'Tandai belum selesai' : 'Tandai selesai'}
          >
            {isCompleted && <CheckIcon size={12} />}
          </button>

          <div className="task-title-group">
            <h3 className={`task-title ${isCompleted ? 'strikethrough' : ''}`}>
              {task.title}
            </h3>

            <div className="task-badges-row">
              <span className="course-badge">
                <BookIcon size={12} />
                <span>{task.course}</span>
              </span>

              {/* Status Badge */}
              {isCompleted ? (
                <span className="status-badge completed">
                  <CheckIcon size={11} />
                  Selesai
                </span>
              ) : overdue ? (
                <span className="status-badge overdue">
                  <ClockIcon size={11} />
                  Terlambat
                </span>
              ) : (
                <span className="status-badge pending">
                  <ClockIcon size={11} />
                  Belum Selesai
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Info Tenggat & Catatan */}
      <div className="task-details">
        <div className={`task-deadline-info ${overdue ? 'is-overdue' : ''}`}>
          <CalendarIcon size={13} />
          <span>Tenggat: {formatDeadline(task.deadline)}</span>
        </div>

        {task.notes && (
          <p className="task-notes-info">
            {task.notes}
          </p>
        )}
      </div>

      {/* Tombol Aksi: Edit & Hapus */}
      <div className="task-actions-row">
        <button
          type="button"
          className="btn-item-action"
          onClick={() => onEdit && onEdit(task)}
        >
          <EditIcon size={13} />
          <span>{isEditing ? 'Sedang Diedit' : 'Edit'}</span>
        </button>

        <button
          type="button"
          className="btn-item-action delete-btn"
          onClick={() => onRequestDelete && onRequestDelete(task)}
        >
          <TrashIcon size={13} />
          <span>Hapus</span>
        </button>
      </div>
    </article>
  )
}
