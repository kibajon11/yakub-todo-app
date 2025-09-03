const form = document.getElementById("new-task-form");
const input = document.getElementById("task-input");
const list = document.getElementById("task-list");

// 1) Загружаем из localStorage
let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
render();

// Добавление новой задачи
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = input.value.trim();
  if (!title) return;

  tasks.push({ id: Date.now(), title, done: false });
  input.value = "";
  saveAndRender();
});

// Переключить выполненность
function toggle(id) {
  tasks = tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t));
  saveAndRender();
}

// Удалить задачу
function removeTask(id) {
  tasks = tasks.filter((t) => t.id !== id);
  saveAndRender();
}

// Перерисовка списка
function render() {
  list.innerHTML = "";
  tasks.forEach((t) => {
    const li = document.createElement("li");
    li.className = t.done ? "completed" : "";
    li.innerHTML = `
      <input type="checkbox" ${t.done ? "checked" : ""} />
      <span class="title">${t.title}</span>
      <button class="remove" title="Удалить">✕</button>
    `;
    li.querySelector("input").addEventListener("change", () => toggle(t.id));
    li.querySelector(".remove").addEventListener("click", () =>
      removeTask(t.id)
    );
    list.appendChild(li);
  });
}

// Сохранить и обновить UI
function saveAndRender() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  render();
}
