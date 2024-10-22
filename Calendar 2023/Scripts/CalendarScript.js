if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready() {
    const calendarDates = document.querySelectorAll('.Calendar-Dates td');

    calendarDates.forEach(function (date) {
        date.addEventListener('click', function () {
            const monthNameElement = document.querySelector('.Month-Name');
            const month = monthNameElement.getAttribute('data-month');
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

        const monthNameElement = document.querySelector('.Month-Name');
        const currentMonth = monthNameElement.getAttribute('data-month');
        document.querySelector('.Note-Header').textContent = `${currentMonth} ${day}`;

        saveButton.onclick = () => {
            saveNote(month, day);
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
