import React, { useState, useEffect, useMemo } from 'react'
import Header from './components/Header'
import Summary from './components/Summary'
import TaskForm from './components/TaskForm'
import FilterBar from './components/FilterBar'
import TaskList from './components/TaskList'
import ConfirmModal from './components/ConfirmModal'
import './App.css'

const STORAGE_KEY = 'taskmate_tasks_kelompok2'

const INITIAL_TASKS = [
  {
    id: 'task-1',
    title: 'Mengerjakan Proyek Front End ITC',
    course: 'Web Development',
    deadline: '2026-10-07',
    notes: 'Implementasi komponen React dan uji responsivitas layar ponsel.',
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'task-2',
    title: 'Review Slide Pemrograman Web',
    course: 'Basis Data & Web',
    deadline: '2026-10-04',
    notes: 'Pelajari konsep state management dan hooks di React.',
    completed: true,
    createdAt: new Date().toISOString(),
  },
]

export default function App() {
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : INITIAL_TASKS
    } catch {
      return INITIAL_TASKS
    }
  })

  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [editingTask, setEditingTask] = useState(null)
  const [taskToDelete, setTaskToDelete] = useState(null)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
    } catch (err) {
      console.error('Gagal menyimpan tugas ke localStorage:', err)
    }
  }, [tasks])

  const handleAddTask = (newTask) => {
    setTasks((prev) => [newTask, ...prev])
  }

  const handleUpdateTask = (updatedTask) => {
    setTasks((prev) => prev.map((t) => (t.id === updatedTask.id ? updatedTask : t)))
    setEditingTask(null)
  }

  const handleCancelEdit = () => {
    setEditingTask(null)
  }

  const handleToggleStatus = (taskId) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t))
    )
  }

  const handleConfirmDelete = () => {
    if (!taskToDelete) return
    setTasks((prev) => prev.filter((t) => t.id !== taskToDelete.id))
    if (editingTask && editingTask.id === taskToDelete.id) {
      setEditingTask(null)
    }
    setTaskToDelete(null)
  }

  // Reset pencarian dan filter
  const handleResetFilters = () => {
    setSearchQuery('')
    setStatusFilter('all')
  }

  const taskCounts = {
    all: tasks.length,
    pending: tasks.filter((task) => !task.completed).length,
    completed: tasks.filter((task) => task.completed).length,
  }

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchQuery = task.title
        .toLowerCase()
        .includes(searchQuery.trim().toLowerCase())

      if (!matchQuery) return false

      if (statusFilter === 'pending') return !task.completed
      if (statusFilter === 'completed') return task.completed
      return true
    })
  }, [tasks, searchQuery, statusFilter])

  return (
    <div className="app-wrapper">
      <main className="app-container">
        <Header />

        <Summary tasks={tasks} />

        <div className="main-content-layout">
          <aside>
            <TaskForm
              onAddTask={handleAddTask}
              editingTask={editingTask}
              onUpdateTask={handleUpdateTask}
              onCancelEdit={handleCancelEdit}
            />
          </aside>

          <section>
            <FilterBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              statusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
              taskCounts={taskCounts}
            />

            <TaskList
              tasks={filteredTasks}
              totalTasksCount={tasks.length}
              onToggleStatus={handleToggleStatus}
              onEdit={setEditingTask}
              onRequestDelete={setTaskToDelete}
              searchQuery={searchQuery}
              onResetFilters={handleResetFilters}
              editingTask={editingTask}
            />
          </section>
        </div>
      </main>

      <ConfirmModal
        isOpen={Boolean(taskToDelete)}
        task={taskToDelete}
        onConfirm={handleConfirmDelete}
        onCancel={() => setTaskToDelete(null)}
      />

      <footer className="app-footer">
        <p>
          TaskMate • Dibangun oleh{' '}
          <span className="footer-team-highlight">
            Kelompok 2 (Muhammad Athalla, Ridho Satrio, Rifani Juniarti)
          </span>
        </p>
      </footer>
    </div>
  )
}
