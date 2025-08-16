import React, { useState } from "react";

const initialTasks = [
  { id: 1, title: "Task 1", status: "todo" },
  { id: 2, title: "Task 2", status: "inprogress" },
  { id: 3, title: "Task 3", status: "done" }
];

const statuses = ["todo", "inprogress", "done"];

function KanbanBoard({ tasks, setTasks }) {
  const onDrop = (taskId, newStatus) => {
    setTasks(tasks.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
  };
  return (
    <div style={{ display: "flex", gap: "2rem", marginTop: "2rem" }}>
      {statuses.map(status => (
        <div key={status} style={{ flex: 1, background: "#222", border: "2px solid #03fc62", borderRadius: "12px", padding: "1rem" }}>
          <h3 style={{ color: "#03fc62", textAlign: "center" }}>{status.toUpperCase()}</h3>
          {tasks.filter(t => t.status === status).map(task => (
            <div key={task.id} draggable onDragStart={e => e.dataTransfer.setData("taskId", task.id)} style={{ background: "#333", color: "#fff", margin: "0.5rem 0", padding: "0.7rem", borderRadius: "8px", cursor: "grab" }}>
              {task.title}
            </div>
          ))}
          <div onDragOver={e => e.preventDefault()} onDrop={e => {
            const taskId = Number(e.dataTransfer.getData("taskId"));
            onDrop(taskId, status);
          }} style={{ minHeight: "2rem" }} />
        </div>
      ))}
    </div>
  );
}

function Calendar() {
  const today = new Date();
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return d;
  });
  return (
    <div style={{ background: "#222", border: "2px solid #03fc62", borderRadius: "12px", padding: "1rem", marginTop: "2rem", maxWidth: "500px", margin: "2rem auto" }}>
      <h3 style={{ color: "#03fc62", textAlign: "center" }}>Calendar (Next 7 Days)</h3>
      <ul style={{ listStyle: "none", padding: 0, color: "#fff" }}>
        {days.map((d, i) => (
          <li key={i} style={{ padding: "0.5rem 0", borderBottom: "1px solid #03fc62" }}>
            {d.toDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Dashboard() {
  const [tasks, setTasks] = useState(initialTasks);
  return (
    <div style={{ minHeight: "100vh", background: "#181818", color: "#fff", fontFamily: "Open Sans, Arial, Helvetica, sans-serif" }}>
      <h1 style={{ color: "#03fc62", textAlign: "center", marginTop: "2rem" }}>Dashboard</h1>
      <Calendar />
      <KanbanBoard tasks={tasks} setTasks={setTasks} />
    </div>
  );
}
