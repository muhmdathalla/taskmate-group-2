import { useState, useRef, useEffect } from 'react'

const TaskForm = ({ onSubmitTask, editingTask, onCancelEdit }) => {
  const [title, setTitle] = useState('');
  const [course, setCourse] = useState('');
  const [deadline, setDeadline] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title || '');
      setCourse(editingTask.course || '');
      setDeadline(editingTask.deadline || '');
      setNotes(editingTask.notes || '');
      setError('');
    } else {
      resetForm();
    }
  }, [editingTask]);

  const resetForm = () => {
    setTitle('');
    setCourse('');
    setDeadline('');
    setNotes('');
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !course.trim() || !deadline.trim()) {
      setError('Judul, Mata Kuliah, dan Tenggat Waktu wajib diisi!');
      return;
    }

    onSubmitTask({
      ...(editingTask && { id: editingTask.id }),
      title: title.trim(),
      course: course.trim(),
      deadline,
      notes: notes.trim(),
    });

    resetForm();
  };

  const handleCancel = () => {
    resetForm();
    if (onCancelEdit) {
      onCancelEdit();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <h2>{editingTask ? 'Edit Tugas' : 'Tambah Tugas Baru'}</h2>


      {error && <div className="error-badge">{error}</div>}

      <div className="form-group">
        <label htmlFor="title">Judul Tugas </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Contoh: Laporan Praktikum Web"
        />
      </div>

      <div className="form-group">
        <label htmlFor="course">Mata Kuliah </label>
        <input
          type="text"
          id="course"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          placeholder="Contoh: Pemrograman Web"
        />
      </div>

      <div className="form-group">
        <label htmlFor="deadline">Tenggat Waktu </label>
        <input
          type="datetime-local"
          id="deadline"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="notes">Catatan Tambahan (Opsional)</label>
        <textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Catatan khusus atau instruksi pengerjaan..."
          rows="3"
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="btn-primary">
          {editingTask ? 'Simpan Perubahan' : 'Tambah Tugas'}
        </button>

        {editingTask && (
          <button type="button" onClick={handleCancel} className="btn-secondary">
            Batal
          </button>
        )}
      </div>
    </form>
  );
};

export default TaskForm;