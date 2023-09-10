if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready() {
    function markDatesWithNotes(month) {
        const markedDays = document.querySelectorAll('.Calendar-Dates td');
        markedDays.forEach(function (dayElement) {
            const day = dayElement.textContent;
            const note = localStorage.getItem(`note-${month}-${day}`);
            if (note) {
                dayElement.classList.add('has-note');
            }
        });
    }

    // Get the unique identifier for the current month
    const monthNameElement = document.querySelector('.Month-Name');
    const month = monthNameElement.getAttribute('data-month');

    markDatesWithNotes(month);

    const calendarDates = document.querySelectorAll('.Calendar-Dates td');

    calendarDates.forEach(function (date) {
        date.addEventListener('click', function () {
            const day = date.textContent;
            showNoteInterface(month, day);
        });
    });

    function showNoteInterface(month, day) {
        const noteContainer = document.getElementById('note-container');
        const noteText = document.getElementById('note-text');
        const saveButton = document.getElementById('save-note');

        const existingNote = localStorage.getItem(`note-${month}-${day}`);
        noteText.value = existingNote || '';

        saveButton.onclick = () => {
            saveNote(month, day);
            markDatesWithNotes(month);
        };

        noteContainer.style.display = 'block';
        noteContainer.dataset.day = day;
    }

    function saveNote(month, day) {
        const noteText = document.getElementById('note-text').value;
        localStorage.setItem(`note-${month}-${day}`, noteText);

        const noteContainer = document.getElementById('note-container');
        noteContainer.style.display = 'none';
    }
}

