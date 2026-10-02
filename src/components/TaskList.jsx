import React from 'react'
import TaskItem from './TaskItem'
import { TaskListIcon, SearchIcon } from './Icons'

// Modul Daftar Tugas (Implementasi oleh Rifani Juniarti)
export default function TaskList({
  tasks = [],
  totalTasksCount = 0,
  onToggleStatus,
  onEdit,
  onRequestDelete,
  searchQuery = '',
  onResetFilters,
  editingTask,
}) {
  // Empty state 1: Ketika belum ada tugas sama sekali
  if (totalTasksCount === 0) {
    return (
      <div className="empty-state-card" role="status">
        <div className="empty-state-icon" aria-hidden="true">
          <TaskListIcon size={24} />
        </div>
        <h3 className="empty-state-title">
          Belum Ada Tugas Kuliah
        </h3>
        <p className="empty-state-desc">
          Mulai catat tugas kuliah pertamamu melalui formulir yang tersedia.
        </p>
      </div>
    )
  }

  // Empty state 2: Ketika pencarian / filter tidak menemukan hasil
  if (tasks.length === 0) {
    const keyword = searchQuery.trim()
    return (
      <div className="empty-state-card" role="status">
        <div className="empty-state-icon" aria-hidden="true">
          <SearchIcon size={24} />
        </div>
        <h3 className="empty-state-title">
          Tugas Tidak Ditemukan
        </h3>
        <p className="empty-state-desc">
          {keyword
            ? `Tidak ada tugas dengan judul "${keyword}" pada filter ini.`
            : 'Tidak ada tugas yang sesuai dengan filter status yang dipilih.'}
        </p>

        {onResetFilters && (
          <button
            type="button"
            className="empty-state-btn"
            onClick={onResetFilters}
          >
            Reset Pencarian & Filter
          </button>
        )}
      </div>
    )
  }

  return (
    <div className="task-list-container">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleStatus={onToggleStatus}
          onEdit={onEdit}
          onRequestDelete={onRequestDelete}
          editingTask={editingTask}
        />
      ))}
    </div>
  )
}
