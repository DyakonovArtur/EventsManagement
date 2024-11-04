// Получаем элементы формы
const eventForm = document.getElementById('event-form');
const participantsList = document.getElementById('participants-list');
const addParticipantBtn = document.getElementById('add-participant-btn');
const eventParticipantInput = document.getElementById('event-participant');

// Массив для хранения участников
let participants = [];

// Обработчик для добавления участника
addParticipantBtn.addEventListener('click', () => {
  const participantName = eventParticipantInput.value;
  if (participantName) {
    participants.push(participantName);
    eventParticipantInput.value = '';  // Очищаем поле ввода
    renderParticipants();
  }
});

// Функция для отображения участников
function renderParticipants() {
  participantsList.innerHTML = '';
  participants.forEach((participant, index) => {
    const li = document.createElement('li');
    li.textContent = participant;
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Удалить';
    deleteBtn.onclick = () => {
      participants.splice(index, 1);  // Удаляем участника
      renderParticipants();
    };
    li.appendChild(deleteBtn);
    participantsList.appendChild(li);
  });
}

// Обработчик отправки формы
eventForm.addEventListener('submit', function (e) {
    e.preventDefault();  // Предотвращаем перезагрузку страницы

    // Получаем данные из формы
    const title = document.getElementById('event-title').value;
    const description = document.getElementById('event-description').value;
    const date = document.getElementById('event-date').value;
    const price = document.getElementById('event-price').value;  // Получаем цену билета

    // Загружаем события из localStorage или создаем пустой массив
    let events = JSON.parse(localStorage.getItem('events')) || [];

    // Убедимся, что участники всегда сохраняются как массив
    const participants = [];  // Изначально пустой массив участников

    // Добавляем новое событие с участниками и ценой в массив
    events.push({ title, description, date, price, participants });

    // Сохраняем обновленный список событий в localStorage
    localStorage.setItem('events', JSON.stringify(events));

    // Очищаем форму
    eventForm.reset();

    // Перенаправление на страницу списка событий
    window.location.href = 'events.html';
  });

// Обработчик для кнопки "Вернуться на главную"
document.getElementById('back-button').addEventListener('click', () => {
  window.location.href = 'index.html';
});
