import './style.css'

import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  query,
  orderBy
} from 'firebase/firestore';
import { db } from './firebase';
import { Task } from './types';

const taskForm = document.getElementById('taskForm') as HTMLFormElement;
const tasksList = document.getElementById('tasksList') as HTMLDivElement;

async function createTask(task: Omit<Task, 'id'>) {
  try {
    const docRef = await addDoc(collection(db, 'tasks'), task);
    console.log('Tarea creada con ID:', docRef.id);
    getTasks();
  } catch (error) {
    console.error('Error al crear tarea:', error);
  }
}

async function getTasks() {
  try {
    const tasksQuery = query(collection(db, 'tasks'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(tasksQuery);

    tasksList.innerHTML = '';
    querySnapshot.forEach((doc) => {
      const task = { id: doc.id, ...doc.data() } as Task;
      tasksList.innerHTML += `
        <div class="bg-white p-4 rounded-lg shadow mb-4">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-lg font-semibold ${task.completed ? 'line-through' : ''}">${task.title}</h3>
              <p class="text-gray-600">${task.description}</p>
            </div>
            <div class="space-x-2">
              <button
                onclick="toggleTask('${task.id}', ${!task.completed})"
                class="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
              >
                ${task.completed ? 'Deshacer' : 'Completar'}
              </button>
              <button
                onclick="editTask('${task.id}')"
                class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Editar
              </button>
              <button
                onclick="deleteTask('${task.id}')"
                class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      `;
    });
  } catch (error) {
    console.error('Error al obtener tareas:', error);
  }
}

async function updateTask(taskId: string, updates: Partial<Task>) {
  try {
    const taskRef = doc(db, 'tasks', taskId);
    await updateDoc(taskRef, updates);
    getTasks();
  } catch (error) {
    console.error('Error al actualizar tarea:', error);
  }
}

async function deleteTask(taskId: string) {
  try {
    await deleteDoc(doc(db, 'tasks', taskId));
    getTasks();
  } catch (error) {
    console.error('Error al eliminar tarea:', error);
  }
}

taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(taskForm);
  const task: Omit<Task, 'id'> = {
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    completed: false,
    createdAt: Date.now()
  };
  createTask(task);
  taskForm.reset();
});

getTasks();
declare global {
  interface Window {
    deleteTask: (id: string) => Promise<void>;
    toggleTask: (id: string, completed: boolean) => Promise<void>;
    editTask: (id: string) => void;
  }
}

window.deleteTask = deleteTask;
window.toggleTask = async (id: string, completed: boolean) => {
  await updateTask(id, { completed });
};
window.editTask = (id: string) => {
  console.log('Editar tarea:', id);
};