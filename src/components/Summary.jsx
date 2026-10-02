import React from 'react'
import { TaskListIcon, ClockIcon, CheckIcon } from './Icons'

export default function Summary({ tasks = [] }) {
  const total = tasks.length
  const completed = tasks.filter((t) => t.completed).length
  const pending = total - completed
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0

  return (
    <section className="summary-dashboard" aria-label="Ringkasan Statistik Tugas">
      <div className="summary-header-row">
        <div>
          <h2 className="summary-title">Progres Tugas Kuliah</h2>
          <p className="summary-subtitle">
            {total === 0
              ? 'Belum ada tugas yang dicatat'
              : `${completed} dari ${total} tugas telah diselesaikan`}
          </p>
        </div>
        <div className="summary-percent-badge">
          <span>{percent}%</span> Selesai
        </div>
      </div>

      {/* Progress Track Bar */}
      <div className="summary-progress-track" role="progressbar" aria-valuenow={percent} aria-valuemin="0" aria-valuemax="100">
        <div
          className="summary-progress-fill"
          style={{ width: `${percent}%` }}
        />
      </div>

      {/* 3 Metrics Row */}
      <div className="summary-metrics-row">
        <div className="metric-chip">
          <div className="metric-chip-icon total" aria-hidden="true">
            <TaskListIcon size={14} />
          </div>
          <div className="metric-chip-content">
            <span className="metric-chip-label">Total</span>
            <span className="metric-chip-number">{total}</span>
          </div>
        </div>

        <div className="metric-chip">
          <div className="metric-chip-icon pending" aria-hidden="true">
            <ClockIcon size={14} />
          </div>
          <div className="metric-chip-content">
            <span className="metric-chip-label">Belum Selesai</span>
            <span className="metric-chip-number">{pending}</span>
          </div>
        </div>

        <div className="metric-chip">
          <div className="metric-chip-icon completed" aria-hidden="true">
            <CheckIcon size={14} />
          </div>
          <div className="metric-chip-content">
            <span className="metric-chip-label">Selesai</span>
            <span className="metric-chip-number">{completed}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
