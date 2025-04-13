const taskNameInput = document.getElementById("task-name");
const taskLabelInput = document.getElementById("task-label");
const addTaskBtn = document.getElementById("add-task");
const taskList = document.getElementById("tasklist");
const doneCount = document.getElementById("done");

let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
let countdone = tarefas.filter(t => t.concluida).length;
doneCount.textContent = countdone;

function salvarTarefas() {
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function renderTarefa(tarefa) {
  const task = document.createElement("div");
  task.classList.add("task-card");

  const taskInfo = document.createElement("div");
  taskInfo.classList.add("task-info");
  if (tarefa.concluida) taskInfo.classList.add("done");


  taskInfo.innerHTML = `
    <strong>${tarefa.name}</strong>
    <div class="label">${tarefa.label}</div>
    <small>Criado em: ${tarefa.dataCriacao}</small>
  `;

  const btnConcluir = document.createElement("button");
  btnConcluir.classList.add("concluir-btn");
  btnConcluir.textContent = tarefa.concluida ? "✔" : "Concluir";

  if (tarefa.concluida) {
    btnConcluir.classList.add("check");
    btnConcluir.disabled = true;
  }

  btnConcluir.addEventListener("click", () => {
    tarefa.concluida = true;
    taskInfo.classList.add("done");
    btnConcluir.textContent = "✔";
    btnConcluir.classList.add("check");
    btnConcluir.disabled = true;
    countdone++;
    doneCount.textContent = countdone;
    salvarTarefas();
  });

  task.appendChild(taskInfo);
  task.appendChild(btnConcluir);
  taskList.appendChild(task);
}

function criarTarefa(name, label) {
  const dataCriacao = new Date().toLocaleDateString("pt-BR");
  const tarefa = { name, label, dataCriacao, concluida: false };
  tarefas.push(tarefa);
  salvarTarefas();
  renderTarefa(tarefa);
}

// Carrega as tarefas salvas
tarefas.forEach(renderTarefa);

addTaskBtn.addEventListener("click", () => {
  const name = taskNameInput.value.trim();
  const label = taskLabelInput.value.trim();
  if (name === "") return;

  criarTarefa(name, label);
  taskNameInput.value = "";
  taskLabelInput.value = "";
});









