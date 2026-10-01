import React from 'react'
import TaskItem from './TaskItem'

// Halo Fani! Ini komponen utama buat nampilin list seluruh tugas (TaskList).
// Di sini juga udah ada handling buat Empty State (kondisi pas datanya kosong).
//
// Props dari App.jsx:
// - tasks          : array list tugas yg udah difilter/dicari
// - totalTasksCount: total semua tugas sebelum difilter (buat bedain empty state awal vs ga ketemu pas dicari)
// - onToggleStatus, onEdit, onRequestDelete : diterusin ke TaskItem yaa

export default function TaskList({
  tasks = [],
  totalTasksCount = 0,
  onToggleStatus,
  onEdit,
  onRequestDelete,
}) {
  // Empty state 1: Kalau user emang belum pernah nambah tugas sama sekali
  if (totalTasksCount === 0) {
    return (
      <div className="surface-card" style={{ textAlign: 'center', padding: '3rem 1.5rem' }}>
        <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>📋</div>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.35rem', color: 'var(--text-main)' }}>
          Belum Ada Tugas Kuliah
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Yuk catat tugas kuliah pertamamu lewat form di samping!
        </p>
      </div>
    )
  }

  // Empty state 2: Pas user ngetik pencarian atau filter status tapi ga ada yang cocok
  if (tasks.length === 0) {
    return (
      <div className="surface-card" style={{ textAlign: 'center', padding: '3rem 1.5rem' }}>
        <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>🔍</div>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.35rem', color: 'var(--text-main)' }}>
          Tugas Tidak Ditemukan
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Coba cek kata kunci pencarian atau ubah filter statusnya ya.
        </p>
      </div>
    )
  }

  // Kalau datanya ada, tinggal di-render satu per satu lewat TaskItem
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
