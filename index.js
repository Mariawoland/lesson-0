document.addEventListener('DOMContentLoaded', () => {
    const noteForm = document.getElementById('noteForm');
    const notesContainer = document.getElementById('notes');

    // Fetch initial notes from data.json when the page loads
    fetchNotes();

    // Function to fetch notes from data.json and display them
    function fetchNotes() {
        fetch('/data.json')
            .then(response => response.json())
            .then(data => displayNotes(data))
            .catch(error => console.error('Error fetching notes:', error));
    }

    // Function to display notes in the DOM
    function displayNotes(notes) {
        notesContainer.innerHTML = ''; // Clear previous notes
        const ul = document.createElement('ul');

        notes.forEach(note => {
            const li = document.createElement('li');
            li.textContent = note.content;
            ul.appendChild(li);
        });

        notesContainer.appendChild(ul);
    }

    // Event listener for form submission
    noteForm.addEventListener('submit', event => {
        event.preventDefault();
        const newNoteInput = document.getElementById('newNote');
        const newNoteValue = newNoteInput.value.trim();

        if (newNoteValue !== '') {
            addNewNote(newNoteValue);
            newNoteInput.value = ''; // Clear the input field after adding note
        }
    });

    // Function to add a new note
    function addNewNote(content) {
        fetch('/new_note', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ content })
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Failed to add new note.');
            })
            .then(data => {
                fetchNotes(); // Fetch and display updated notes
            })
            .catch(error => console.error('Error adding note:', error));
    }
});
