import React from 'react'
import TaskItem from './TaskItem'

/**
 * ============================================================================
 * MODUL DAFTAR TUGAS (TANGGUNG JAWAB: RIFANI JUNIARTI)
 * ============================================================================
 * Halo Rifani! File ini menampilkan seluruh daftar kartu tugas (TaskList).
 * 
 * PROPS YANG DITERIMA:
 * - tasks          : Array list tugas yang sudah difilter/dicari
 * - totalTasksCount: Jumlah total tugas sebelum filter (untuk deteksi empty state)
 * - onToggleStatus : Diteruskan ke TaskItem
 * - onEdit         : Diteruskan ke TaskItem
 * - onRequestDelete: Diteruskan ke TaskItem
 * 
 * ATURAN SPESIFIKASI ITC:
 * - Tampilkan petunjuk ramah saat data tugas masih kosong
 * ============================================================================
 */

export default function TaskList({
  tasks = [],
  totalTasksCount = 0,
  onToggleStatus,
  onEdit,
  onRequestDelete,
}) {
  // Empty State: Ketika belum ada tugas sama sekali
  if (totalTasksCount === 0) {
    return (
      <div className="surface-card" style={{ textAlign: 'center', padding: '3rem 1.5rem' }}>
        <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>📋</div>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.35rem', color: 'var(--text-main)' }}>
          Belum Ada Tugas Kuliah
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Gunakan formulir di samping untuk menambahkan tugas kuliah pertamamu!
        </p>
      </div>
    )
  }

  // Empty State: Ketika pencarian / filter tidak menemukan hasil
  if (tasks.length === 0) {
    return (
      <div className="surface-card" style={{ textAlign: 'center', padding: '3rem 1.5rem' }}>
        <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>🔍</div>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.35rem', color: 'var(--text-main)' }}>
          Tugas Tidak Ditemukan
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Tidak ada tugas yang cocok dengan kata kunci pencarian atau filter status yang dipilih.
        </p>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleStatus={onToggleStatus}
          onEdit={onEdit}
          onRequestDelete={onRequestDelete}
        />
      ))}
    </div>
  )
}
