document.addEventListener("DOMContentLoaded", ()=>{     // 
    const habits = window.loadData('dlm_habits', []);
    const task = window.loadData('dlm_task', []);
    const profile = window.loadData('dlm_profile',{name: 'user', goal: 'be productive', bio: ''});

    const greetingEl = document.getElementById("greeting-msg");
    const dateEl = document.getElementById("curr-date");

    if(greetingEl && dateEl){
        //date
        const today = new Date();           // Gives curr date
        const options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
        dateEl.textContent = `Today is ${today.toLocaleDateString(undefined, options)}`;    // 

        const hour = today.getHours();      // 
        let greeting = "Good Evening";

        if(hour<12){greeting = "Good Morning";}
        else if(hour<18){greeting = "Good Afternoon";}
        greetingEl.textContent = `${greeting}, ${profile.name}`;

        const totalHabits = document.getElementById("total-habits");
        const completedHabits = document.getElementById("completed-habits");
        const totalTask = document.getElementById("total-task");

        if(totalHabits){totalHabits.textContent = habits.length ;}
        if(completedHabits){
            const completed = habits.filter(h=>h.completed).length;
            completedHabits.textContent = completed;
        }
        if(totalTask){totalTask.textContent = task.length;}
    }
})