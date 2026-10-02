import React from 'react'
import { TaskListIcon, ClockIcon, CheckIcon } from './Icons'

export default function Summary({ tasks = [] }) {
  const total = tasks.length
  const completed = tasks.filter((t) => t.completed).length
  const pending = total - completed

  return (
    <section className="summary-grid" aria-label="Ringkasan Statistik Tugas">
      <div className="summary-card total">
        <div className="summary-icon-box" aria-hidden="true">
          <TaskListIcon size={18} />
        </div>
        <div className="summary-info">
          <span className="summary-label">Total Tugas</span>
          <span className="summary-value">{total}</span>
        </div>
      </div>

      <div className="summary-card pending">
        <div className="summary-icon-box" aria-hidden="true">
          <ClockIcon size={18} />
        </div>
        <div className="summary-info">
          <span className="summary-label">Belum Selesai</span>
          <span className="summary-value">{pending}</span>
        </div>
      </div>

      <div className="summary-card completed">
        <div className="summary-icon-box" aria-hidden="true">
          <CheckIcon size={18} />
        </div>
        <div className="summary-info">
          <span className="summary-label">Selesai</span>
          <span className="summary-value">{completed}</span>
        </div>
      </div>
    </section>
  )
}
