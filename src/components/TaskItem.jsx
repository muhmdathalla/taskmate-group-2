import React from 'react'

// Halo Fani! Ini komponen buat nampilin satu kartu tugas (item).
//
// Props dari TaskList / App.jsx:
// - task           : object datanya { id, title, course, deadline, notes, completed }
// - onToggleStatus : buat ubah status selesai / belum selesai
// - onEdit         : buat nge-trigger mode edit (ngirim data tugas ke form Ridho)
// - onRequestDelete: buat manggil popup konfirmasi hapus
//
// Style-nya udah gw bikin rapi, tapi kalau lu mau adjust card-nya silakan bangett yaa!


function formatDeadline(deadline) {
  if (!deadline) return '-'
  const date = new Date(deadline)
  if (Number.isNaN(date.getTime())) return deadline
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(date)
}

function isOverdue(task) {
  if (task.completed || !task.deadline) return false
  const date = new Date(task.deadline)
  if (Number.isNaN(date.getTime())) return false
  if (!String(task.deadline).includes('T')) date.setHours(23, 59, 59, 999)
  return date.getTime() < Date.now()
}


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

  return (
    <div
      style={{
        backgroundColor: 'var(--bg-surface)',
        border: `1px solid ${isEditing ? 'var(--color-primary)' : overdue ? 'var(--color-danger)' : 'var(--border-color)'}`,
        borderRadius: 'var(--radius-md)',
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.65rem',
        transition: 'all 0.2s ease',
        opacity: isCompleted ? 0.75 : 1,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem' }}>
        {/* Tombol Checklist Status */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', flex: 1 }}>
          <button
            type="button"
            onClick={() => onToggleStatus && onToggleStatus(task.id)}
            aria-label={isCompleted ? 'Tandai belum selesai' : 'Tandai selesai'}
            style={{
              marginTop: '0.2rem',
              width: '1.25rem',
              height: '1.25rem',
              borderRadius: '4px',
              border: `2px solid ${isCompleted ? 'var(--color-completed)' : 'var(--border-color)'}`,
              background: isCompleted ? 'var(--color-completed)' : 'transparent',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.75rem',
              fontWeight: 800,
              flexShrink: 0,
            }}
          >
            {isCompleted ? '✓' : ''}
          </button>

          <div>
            <h3
              style={{
                fontSize: '1rem',
                fontWeight: 600,
                color: 'var(--text-main)',
                textDecoration: isCompleted ? 'line-through' : 'none',
              }}
            >
              {task.title}
            </h3>
            <span
              style={{
                display: 'inline-block',
                marginTop: '0.25rem',
                padding: '0.15rem 0.5rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.75rem',
                fontWeight: 600,
                background: 'var(--bg-surface-soft)',
                color: 'var(--text-muted)',
                border: '1px solid var(--border-color)',
              }}
            >
              📚 {task.course}
            </span>
          </div>
        </div>

        {/* Badge status */}
        <span
          style={{
            padding: '0.2rem 0.6rem',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.75rem',
            fontWeight: 700,
            backgroundColor: isCompleted ? 'var(--color-completed-soft)' : 'var(--color-pending-soft)',
            color: isCompleted ? 'var(--color-completed)' : 'var(--color-pending)',
            flexShrink: 0,
          }}
        >
          {isCompleted ? 'Selesai' : 'Belum Selesai'}
        </span>
      </div>

      {/* Info deadline & catatan */}
      <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
        <p style={overdue ? { color: 'var(--color-danger)'} : undefined}>
          ⏰ Tenggat: {formatDeadline(task.deadline)}
        </p>
        {task.notes && (
          <p style={{ marginTop: '0.25rem', color: 'var(--text-subtle)', fontStyle: 'italic' }}>
            📝 {task.notes}
          </p>
        )}
      </div>

      {/* Tombol aksi: Edit & Hapus */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '0.25rem' }}>
        <button
          type="button"
          onClick={() => onEdit && onEdit(task)}
          style={{
            padding: '0.35rem 0.65rem',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.8rem',
            fontWeight: 600,
            background: 'var(--bg-surface-soft)',
            color: 'var(--text-main)',
            border: '1px solid var(--border-color)',
          }}
        >
          {isEditing ? '✏️ Sedang Diedit' : '✏️ Edit'}
        </button>

        <button
          type="button"
          onClick={() => onRequestDelete && onRequestDelete(task)}
          style={{
            padding: '0.35rem 0.65rem',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.8rem',
            fontWeight: 600,
            background: 'var(--color-danger-soft)',
            color: 'var(--color-danger)',
          }}
        >
          🗑️ Hapus
        </button>
      </div>
    </div>
  )
}
