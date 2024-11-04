// Получаем индекс события из URL
const urlParams = new URLSearchParams(window.location.search);
const eventIndex = urlParams.get('index');

// Загружаем события из localStorage
let events = JSON.parse(localStorage.getItem('events')) || [];
let event = events[eventIndex];

// Получаем элементы формы и списка участников
const eventForm = document.getElementById('edit-event-form');
const participantsList = document.getElementById('participants-list');
const eventParticipantInput = document.getElementById('event-participant');
const addParticipantBtn = document.getElementById('add-participant-btn');

// Массив для хранения участников
let participants = event.participants || [];

// Заполняем форму текущими данными события
document.getElementById('event-title').value = event.title;
document.getElementById('event-description').value = event.description;
document.getElementById('event-date').value = event.date;
document.getElementById('event-price').value = event.price;

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

// Отображаем текущий список участников
renderParticipants();

// Обработчик для добавления участника
addParticipantBtn.addEventListener('click', () => {
  const participantName = eventParticipantInput.value;
  if (participantName) {
    participants.push(participantName);
    eventParticipantInput.value = '';  // Очищаем поле ввода
    renderParticipants();
  }
});

// Обработчик для сохранения изменений
eventForm.addEventListener('submit', function (e) {
  e.preventDefault();  // Предотвращаем перезагрузку страницы

  // Обновляем данные события
  event.title = document.getElementById('event-title').value;
  event.description = document.getElementById('event-description').value;
  event.date = document.getElementById('event-date').value;
  event.price = document.getElementById('event-price').value;
  event.participants = participants;

  // Сохраняем изменения в localStorage
  events[eventIndex] = event;
  localStorage.setItem('events', JSON.stringify(events));

  // Переходим обратно на страницу списка событий
  window.location.href = 'events.html';
});

// Обработчик для кнопки "Вернуться к списку событий"
document.getElementById('back-button').addEventListener('click', () => {
  window.location.href = 'events.html';
});
