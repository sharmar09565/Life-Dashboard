document.addEventListener("DOMContentLoaded", () => {
    let notes = window.loadData('dlm_notes', []);

    const notesInput = document.getElementById("notes-input");
    const addNotesBtn = document.getElementById("add-notes-btn");
    const notesList = document.getElementById("notes-list");

    if (notesList) {
        function renderNotes() {
            notesList.innerHTML = "";
            notes.forEach((note) => {
                const li = document.createElement("li");
                li.className = "note-item";

                li.innerHTML = `
                    <div class="note-text">
                        <h3>${note.title}</h3>
                    </div>
                    <div class="note-actions">
                        <button class="action-btn edit-btn">Edit</button>
                        <button class="action-btn delete-btn">Delete</button>
                    </div>
                `;
                notesList.appendChild(li);
            });
        }
        renderNotes();

        function addNotes(){
            const title = notesInput.value.trim();

            if(title){
                notes.push({ title: title });
                window.saveData('dlm_notes',notes);
                notesInput.value = "";
                renderNotes();
            }
        }
        addNotesBtn.addEventListener("click", addNotes);

        notesList.addEventListener("click", (e)=>{
            if(e.target.classList.contains("delete-btn")){
                let index = e.target.dataset.index;
                notes.splice(index,1);
                window.saveData('dlm_habits',notes);
                renderNotes();
            }
        })

        notesInput.addEventListener("keydown",(e)=>{
            if(e.key=='Enter'){
                addNotes();
            }
        })

    }
})