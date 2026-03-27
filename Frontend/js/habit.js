document.addEventListener("DOMContentLoaded", () => {       // js run only after page(html) get loaded
    let habits = window.loadData('dlm_habits', []);

    const habitInput = document.getElementById("habit-input");
    const addHabitBtn = document.getElementById("add-btn");
    const habitsList = document.getElementById("habits-list");
    const moreBtn = document.getElementsByClassName("dots-btn");

    if (habitsList) {

        function renderHabits() {
            habitsList.innerHTML = "";
            habits.forEach((habit,index) => {
                const li = document.createElement("li");
                li.className = "table-row";

                li.innerHTML = `
                    <div class="col habit-col habit-info">
                      <span class="habit-name">${habit.title}</span>
                    </div>
                
                    <input type="checkbox" class="col day-col checkbox"/>
                    <input type="checkbox" class="col day-col checkbox"/>
                    <input type="checkbox" class="col day-col checkbox"/>
                    <input type="checkbox" class="col day-col checkbox"/>
                    <input type="checkbox" class="col day-col checkbox"/>
                    <input type="checkbox" class="col day-col checkbox"/>
                    <input type="checkbox" class="col day-col checkbox"/>
                    
                    <div class="col percent-col">
                        <span class="percent-badge">0%</span>
                    </div>
                    <div class="col option-col">
                      <button class="danger">Delete</button>
                    </div>
                `;
                habitsList.appendChild(li);
            });
        }

        renderHabits();

        addHabitBtn.addEventListener("click", () => {
            const title = habitInput.value.trim();  // cut extra space
            if (title) {
                habits.push({ title, completed: false });
                window.saveData('dlm_habits', habits);
                habitInput.value = "";
                renderHabits();
            }
        });

        addHabitBtn.addEventListener("click", () => {
            const title = habitInput.value.trim();
            if (title) {
                habits.push({ title, completed: false });
                window.saveData('dlm_habits', habits);
                habitInput.value = "";
                renderHabits();
            }
        });


        habitsList.addEventListener("click", (e) => {       //e-event object

            if(e.target.classList.contains("danger")){
                let index = e.target.dataset.index;
                habits.splice(index,1);
                window.saveData('dlm_habits',habits);
                renderHabits();
            }


            const index = e.target.getAttribute("data-index");
            if (index === null) return;

            if (e.target.tagName === "INPUT") {

                habits[index].completed = e.target.checked;
                window.saveData('dlm_habits', habits);
                renderHabits();
            } else if (e.target.tagName === "BUTTON") {

                habits.splice(index, 1);
                window.saveData('dlm_habits', habits);
                renderHabits();
            }
        });

        let allCheckBox = document.getElementsByClassName("checkbox");
        
        for(let i=0;i<allCheckBox.length;i++){
            allCheckBox[i].addEventListener("click", (e)=>{
                
                let parent = e.target.parentNode;
                let checkBox = parent.getElementsByClassName("checkbox");
                let count = 0;
                for(let i=0;i<checkBox.length;i++){
                    if(checkBox[i].checked){
                        count++;
                    }
                }
                let percent = Math.floor((count/7)*100);
                console.log(percent);
                parent.getElementsByClassName("percent-col")[0].innerHTML = `<span class="percent-badge">${percent}%</span>`;
            });
        }
        
    }

});