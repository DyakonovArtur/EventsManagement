// Загружаем события из localStorage
let events = JSON.parse(localStorage.getItem('events')) || [];

// Получаем элемент для отображения списка событий
const eventsList = document.getElementById('events-list');

// Функция для отображения списка событий
function renderEvents() {
  // Очищаем список
  eventsList.innerHTML = '';

  // Проверяем, есть ли события
  if (events.length === 0) {
    eventsList.innerHTML = '<p>Нет доступных событий</p>';
    return;
  }

  // Проходим по каждому событию и добавляем его в список
  events.forEach((event, index) => {
    const li = document.createElement('li');

    // Проверяем, существует ли массив участников, если нет, создаем пустой массив
    const participants = Array.isArray(event.participants) ? event.participants : [];

    li.innerHTML = `
      <strong>${event.title}</strong><br>
      Описание: ${event.description}<br>
      Дата: ${event.date}<br>
      Цена билета: ${event.price} руб.<br>
      Участники: ${participants.length > 0 ? participants.join(', ') : 'Нет участников'}<br>
      <button onclick="editEvent(${index})">Редактировать</button>
      <button onclick="deleteEvent(${index})">Удалить</button>
    `;
    eventsList.appendChild(li);
  });
}

// Функция для редактирования события
function editEvent(index) {
  window.location.href = `edit.html?index=${index}`;
}

// Функция для удаления события
function deleteEvent(index) {
  // Подтверждение удаления
  const confirmed = confirm("Вы уверены, что хотите удалить это событие?");
  
  if (confirmed) {
    // Удаляем событие по индексу
    events.splice(index, 1);

    // Обновляем данные в localStorage
    localStorage.setItem('events', JSON.stringify(events));

    // Перерисовываем список событий
    renderEvents();
  }
}

// Отображаем события при загрузке страницы
renderEvents();
