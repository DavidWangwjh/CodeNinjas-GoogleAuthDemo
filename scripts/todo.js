import { auth, db } from "./firebase.js";
import {
  ref,
  push,
  set,
  update,
  remove,
  onValue,
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js";

// Elements
const newTodoInput = document.getElementById("new-todo-input");
const addTodoBtn = document.getElementById("add-todo-btn");
const todoList = document.getElementById("todo-list");

let userPath = null;
// Local state cache (key -> text)
let todos = {}; // { id: { text } }
let todosRef = null;

// Render function
function renderTodos() {
    // Clear list
    todoList.innerHTML = "";

    const keys = Object.keys(todos);

    keys.forEach((key) => {
        const { text } = todos[key];
        console.log(key, text)

        const li = document.createElement("li");
        li.className = "todo-item";
        li.dataset.id = key;

        const span = document.createElement("span");
        span.className = "todo-text";
        span.textContent = text;

        const input = document.createElement("input");
        input.type = "text";
        input.value = text;
        input.className = "input todo-input";
        input.style.display = "none";

        const actions = document.createElement("div");
        actions.className = "row todo-actions";

        const editBtn = document.createElement("button");
        editBtn.className = "btn btn-outline";
        editBtn.textContent = "Edit";

        const saveBtn = document.createElement("button");
        saveBtn.className = "btn";
        saveBtn.textContent = "Save";
        saveBtn.style.display = "none";

        const cancelBtn = document.createElement("button");
        cancelBtn.className = "btn btn-outline";
        cancelBtn.textContent = "Cancel";
        cancelBtn.style.display = "none";

        const delBtn = document.createElement("button");
        delBtn.className = "btn btn-outline";
        delBtn.textContent = "Delete";

        actions.append(editBtn, saveBtn, cancelBtn, delBtn);
        li.append(span, input, actions);
        todoList.appendChild(li);

        // Handlers
        editBtn.addEventListener("click", () => {
            span.style.display = "none";
            input.style.display = "block";
            editBtn.style.display = "none";
            delBtn.style.display = "none";
            saveBtn.style.display = "inline-block";
            cancelBtn.style.display = "inline-block";
            input.focus();
        });

        cancelBtn.addEventListener("click", () => {
            input.value = text; // revert
            span.style.display = "inline";
            input.style.display = "none";
            editBtn.style.display = "inline-block";
            delBtn.style.display = "inline-block";
            saveBtn.style.display = "none";
            cancelBtn.style.display = "none";
        });

        saveBtn.addEventListener("click", async () => {
            const newText = input.value.trim();
            if (!newText) {
                alert("Todo text cannot be empty.");
                return;
            }
            try {
                await update(ref(db, userPath + "/" + key), { text: newText });
            } catch (err) {
                console.error("Update failed:", err);
                alert("Failed to update todo.");
            }
        });

        delBtn.addEventListener("click", async () => {
            try {
                await remove(ref(db, userPath + "/" + key));
            } catch (err) {
                console.error("Delete failed:", err);
                alert("Failed to delete todo.");
            }
        });
    });
}

// Add new todo
if (addTodoBtn) {
  addTodoBtn.addEventListener("click", async () => {
    const text = (newTodoInput?.value || "").trim();
    if (!text) {
        alert("Please enter a todo.");
        return;
    }
    try {
        const newRef = push(todosRef);
        await set(newRef, { text });
        newTodoInput.value = "";
    } catch (err) {
        console.error("Create failed:", err);
        alert("Failed to add todo.");
    }
  });
}

// Watch auth, then attach realtime listener
auth.onAuthStateChanged((user) => {
  if (!user) return;
  // Path: /users/{uid}/todos
  userPath = `users/${user.uid}/todos`
  todosRef = ref(db, `users/${user.uid}/todos`);
  onValue(todosRef, (snapshot) => {
    todos = snapshot.val() || {};
    console.log(todos)
    renderTodos();
  });
});
