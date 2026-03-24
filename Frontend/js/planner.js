document.addEventListener("DOMContentLoaded", () => {
    let tasks = window.loadData("dlm_tasks", []);

    const taskInput = document.getElementById("task-input");
    const timeInput = document.getElementById("time-input");
    const taskList = document.getElementById("task-list");
    const addTaskBtn = document.getElementById("add-task-btn");

    if (taskList) {
        function renderTask() {
            taskList.innerHTML = "";

            tasks.forEach((task, index) => {
                const li = document.createElement("li");
                li.className = "task-item";

                li.innerHTML = `
                    <div class="task-left">
                        <input type="checkbox" />
                        <span class="task-dot purple"></span>
                        <p>${task.title1}</p>
                    </div>
                    <span class="task-time">${task.title2}</span>
                `;

                taskList.appendChild(li);
            });
        }

        renderTask();

        addTaskBtn.addEventListener("click", () => {
            const title1 = taskInput.value.trim();
            const title2 = timeInput.value.trim();

            if (title1 && title2) {
                tasks.push({ title1, title2 });
                window.saveData("dlm_tasks", tasks);

                taskInput.value = "";
                timeInput.value = "";
                renderTask();
            }
        });

    }
});