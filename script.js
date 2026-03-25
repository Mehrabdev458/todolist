$(document).ready(function () {

  // Load tasks from LocalStorage
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  renderTasks();

  // Add Task
  $("#addBtn").click(function () {
    let taskText = $("#taskInput").val().trim();

    if (taskText === "") return;

    tasks.push({ text: taskText, completed: false });
    localStorage.setItem("tasks", JSON.stringify(tasks));

    $("#taskInput").val("");
    renderTasks();
  });

  // Render Tasks
  function renderTasks() {
    $("#taskList").empty();

    tasks.forEach((task, index) => {
      let li = $(`
        <li class="${task.completed ? 'completed' : ''}">
          <span class="task-text">${task.text}</span>
          <span>
            <button class="complete-btn">✔</button>
            <button class="delete-btn">✖</button>
          </span>
        </li>
      `);

      // Mark Complete
      li.find(".complete-btn").click(function () {
        tasks[index].completed = !tasks[index].completed;
        localStorage.setItem("tasks", JSON.stringify(tasks));
        renderTasks();
      });

      // Delete Task
      li.find(".delete-btn").click(function () {
        tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        renderTasks();
      });

      $("#taskList").append(li);
    });
  }

});