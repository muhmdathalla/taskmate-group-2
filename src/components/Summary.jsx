import React from 'react'

export default function Summary({ tasks = [] }) {
  const total = tasks.length
  const completed = tasks.filter((t) => t.completed).length
  const pending = total - completed

  return (
    <section className="summary-grid" aria-label="Ringkasan Tugas">
      <div className="summary-card total">
        <div className="summary-icon-box">📊</div>
        <div className="summary-info">
          <h3>Total Tugas</h3>
          <p>{total}</p>
        </div>
      </div>

      <div className="summary-card pending">
        <div className="summary-icon-box">⏳</div>
        <div className="summary-info">
          <h3>Belum Selesai</h3>
          <p>{pending}</p>
        </div>
      </div>

      <div className="summary-card completed">
        <div className="summary-icon-box">✅</div>
        <div className="summary-info">
          <h3>Selesai</h3>
          <p>{completed}</p>
        </div>
      </div>
    </section>
  )
}
