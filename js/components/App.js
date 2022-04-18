import { header } from './Header/Header.js';
import {
  main,
  addAnotherListBtn,
  modalAddList,
  addNewListBtn,
  inputTitle,
  closeIcon,
} from './Main/Main.js';
import { lists, tasks, setData } from '../consts/data.js';
import { modal } from './Main/components/Modal-info.js';
import { TasksComponent } from './Main/components/Task/TasksComponent.js';

class App {
  constructor({ ...props }) {
    this.lists = [...props.lists];
    this.tasks = [...props.tasks];
    this.copiedTask = [];
  }
  create() {
    this.element = document.createElement('div');
    this.element.classList.add('root');
  }

  setEventsBody = () => {
    document.body.addEventListener('mousedown', (event) => {
      if (event.target.closest('.modal')) return;
      event.stopPropagation();
      if (event.target.classList.contains('btn-small')) return;
      else if (!event.target.classList.contains('list-more-btn')) {
        main
          .querySelectorAll('.list-more-popup')
          .forEach((el) => el.classList.add('hide'));
      }

      if (!event.target.classList.contains('card-title')) {
        this.removeEffects(
          main.querySelectorAll('.card-title'),
          'contenteditable',
          'editeble'
        );
      }

      const taskTitles = main.querySelectorAll('.card-title');
      taskTitles.forEach((newTitle) => {
        this.tasks.find((task) => {
          if (task.id == +newTitle.id) {
            task.head = newTitle.innerHTML;
          }
        });
      });
      setData('tasks', this.tasks);

      if (!event.target.classList.contains('list-title')) {
        this.removeEffects(
          main.querySelectorAll('.list-title'),
          'readonly',
          'editeble'
        );

        const listTitles = main.querySelectorAll('.list-title');
        listTitles.forEach((title) => {
          this.lists.find((list) => {
            if (list.id == +title.id) {
              list.head = title.value;
            }
          });
        });
        setData('lists', this.lists);
      }
    });
  };

  // Снимает все эффекты ..

  removeEffects = (elements, attr, className) => {
    elements.forEach((el) => {
      el.removeAttribute(attr);
      el.classList.remove(className);
    });
  };

  // сохраняет названия заголовков

  saveTitles = (arr, id, newTitle) => {
    arr = arr.map((el) => (el.id != id ? el : (el.head = newTitle)));
    setData('tasks', arr);
  };

  // Открывает поле для добавление нового списка
  togglAddList(event) {
    event.preventDefault();
    modalAddList.classList.toggle('hide');
    this.displayMain();
    inputTitle.value = ``;
  }
  setEventtoggleModal() {
    addAnotherListBtn.addEventListener('click', (event) => {
      this.togglAddList(event);
      inputTitle.focus();
    });
    closeIcon.addEventListener('click', (event) => {
      this.togglAddList(event);
    });
  }
  //------------------------------------------------------------------------------//

  // Добавляет новый лист в общий массив, сохраняет в локалсторедж, заново отрисовывает
  addnewList(event) {
    {
      event.preventDefault();
      if (inputTitle.value.length >= 3) {
        this.lists.push({
          id: Date.now(),
          head: inputTitle.value,
        });
        setData('lists', this.lists);
        inputTitle.value = ``;
        this.displayMain();
      }
      return;
    }
  }
  setEventAddList() {
    addNewListBtn.addEventListener('click', (event) => this.addnewList(event));
  }
  // ------------------------------------------------------------------------------//

  // Открывает / Закрывает поле для добавление новой карточки
  toggleAddCard(event) {
    event.preventDefault();
    event.target
      .closest(`.list-item`)
      .querySelector('.add-task-btn')
      .classList.toggle('hide');
    event.target
      .closest(`.list-item`)
      .querySelector('.enter-card-title')
      .classList.toggle('hide');
  }

  setEventOpenAddField() {
    const addCardButtons = main.querySelectorAll('.add-task-btn');
    const closeAddField = main.querySelectorAll('.close-field-btn');
    addCardButtons.forEach((btn) => {
      btn.addEventListener('click', (event) => this.toggleAddCard(event));
    });
    closeAddField.forEach((btn) => {
      btn.addEventListener('click', (event) => this.toggleAddCard(event));
    });
  }
  // ------------------------------------------------------------------------------//

  // Добавляет новую карточку в общий массив, сохраняет в локалсторедж, заново отрисовывает

  addNewCard(event) {
    this.lists.map((list) => {
      if (list.id === +event.target.parentElement.id) {
        this.tasks.push({
          createData: new Date().toDateString(),
          id: +Date.now(),
          listId: +event.target.parentElement.id,
          isDone: false,
          head: event.target.parentElement.previousElementSibling.value,
          description: '',
          comments: [],
        });
        return this.lists;
      }
    });

    setData('tasks', this.tasks);
    event.target.parentElement.previousElementSibling.value = '';
    this.displayMain();
  }

  setEventAddCard() {
    const addCardButtons = main.querySelectorAll('.add-card');
    addCardButtons.forEach((el) => {
      el.addEventListener('click', (event) => {
        this.addNewCard(event);
      });
    });
  }
  //------------------------------------------------------------------------------//

  // Удаляет карточку из массива - сохр. отрисовывает

  deleteTask = (deletedTask) => {
    this.tasks = this.tasks.filter((task) => task.id != deletedTask.id);
    setData('tasks', this.tasks);
    this.displayMain();
  };

  setEventDeleteCard = () => {
    const allTrashButtons = main.querySelectorAll('.btn-delete-task');
    allTrashButtons.forEach((trash) => {
      trash.addEventListener('click', () => {
        event.stopPropagation();
        const deletedTask = this.tasks.find((task) => task.id == trash.id);
        this.deleteTask(deletedTask);
      });
    });
  };

  //------------------------------------------------------------------------------//

  // Изменяет заголовок карточки из массива - сохр. отрисовывает

  ChangeTitleTask = (id, newTitle) => {
    this.tasks = this.tasks.map((task) =>
      task.id != deletedTask.id ? task : (task.head = newTitle)
    );
    setData('tasks', this.tasks);
    this.displayMain();
  };

  setEventChangeTitleCard = () => {
    const allRenameButtons = main.querySelectorAll('.btn-rename-task');
    const allCardsTitles = main.querySelectorAll('.card-title');
    allRenameButtons.forEach((pen) => {
      pen.addEventListener('click', () => {
        event.stopPropagation();

        this.removeEffects(allCardsTitles, 'contenteditable', false);

        const cardTitle = pen
          .closest('.card-item')
          .querySelector('.card-title');
        cardTitle.setAttribute('contenteditable', true);
        cardTitle.classList.add('editeble');
        cardTitle.focus();
      });
    });
  };

  //------------------------------------------------------------------------------//

  // 1 Удаляет выбранный лист, сохраняет в локалсторедж, заново отрисовывает
  deleteList(id) {
    this.lists = this.lists.filter((list) => {
      if (list.id != id) {
        return list;
      } else {
        this.tasks = this.tasks.filter((task) => {
          if (list.id != task.listId) {
            return task;
          }
        });
      }
    });
    setData('lists', this.lists);
    setData('tasks', this.tasks);
    this.displayMain();
  }

  setEventDeletList() {
    const deleteButtons = main.querySelectorAll('.delete-list');
    deleteButtons.forEach((el) => {
      el.addEventListener('click', (event) =>
        this.deleteList(+event.target.id)
      );
    });
  }

  //------------------------------------------------------------------------------//

  // 2 Удаляет все карточки из листа , сохраняет в локалсторедж, заново отрисовывает

  deleteAllCardsFromList(id) {
    this.tasks = this.tasks.filter((task) => task.listId != id);
    setData('tasks', this.tasks);
    this.displayMain();
  }
  setEventClearListBtn() {
    const clearListBtns = main.querySelectorAll('.clear-list');
    clearListBtns.forEach((el) => {
      el.addEventListener('click', (event) =>
        this.deleteAllCardsFromList(+event.target.id)
      );
    });
  }

  //------------------------------------------------------------------------------//

  // 3 Копирует все карточки из листа в буффер

  copyTasks(event, id) {
    const shadowTasks = JSON.parse(JSON.stringify(this.tasks));
    this.copiedTask = shadowTasks.filter((task) => task.listId == id);
  }
  setEventCopyTasks() {
    const copyTasksBtns = main.querySelectorAll('.copy-all-tasks');
    copyTasksBtns.forEach((el) => {
      el.addEventListener('click', (event) => {
        this.copyTasks(event, +event.target.id);
        el.closest('.list-more-popup').classList.add('hide');
      });
    });
  }

  //------------------------------------------------------------------------------//

  // 4 Вставляет все карточки из буффера , сохраняет в локалсторедж, заново отрисовывает

  pasteTasks(id) {
    this.copiedTask.map((task, index) => {
      task.listId = id;
      task.id = Date.now() + index;
      return task;
    });
    this.tasks.push(...this.copiedTask);
    this.copiedTask = [];
    setData('tasks', this.tasks);
    this.displayMain();
  }
  setEventpasteTasks() {
    const pasteTasksBtns = main.querySelectorAll('.paste-tasks');
    pasteTasksBtns.forEach((el) => {
      el.addEventListener('click', (event) =>
        this.pasteTasks(+event.target.id)
      );
    });
  }

  //------------------------------------------------------------------------------//

  //  Меняет название в листе // Открывает // Закрывает выпадающее меню для листа

  setEventListHeadHandler() {
    const listHeads = main.querySelectorAll('.list-item-head');
    listHeads.forEach((el) => {
      el.addEventListener('mousedown', (event) => {
        event.stopPropagation();
        const titleText = el.querySelector('.list-title');
        if (event.target.classList.contains('list-more-btn')) {
          main
            .querySelectorAll('.list-more-popup')
            .forEach((el) => el.classList.add('hide'));
          el.querySelector('.list-more-popup').classList.toggle('hide');
        } else if (event.target.classList.contains('list-title')) {
          el.querySelector('.list-more-popup').classList.add('hide');
          titleText.removeAttribute('readonly');
          titleText.classList.add('editeble');
        } else if (event.target.classList.contains('list-item-head')) {
          el.querySelector('.list-more-popup').classList.add('hide');
          titleText.setAttribute('readonly', true);
          titleText.classList.remove('editeble');
          this.lists.find((list) => {
            if (list.id == el.id) {
              list.head = titleText.value;
            }
          });
          setData('lists', this.lists);
        }
      });
    });
  }
  // Открывает/Закрывает модальное окно отдельной карточки
  eventToggleModal() {
    const tasks = main.querySelectorAll('.card-item');
    tasks.forEach((el) => {
      el.addEventListener('click', (event) => {
        if (
          event.target.classList.contains('card-title') &&
          event.target.hasAttribute('contenteditable')
        )
          return;
        else {
          document.body.classList.toggle('hidden-x');
          const pickedTask = this.tasks.find((task) => +el.id === task.id);
          document.body.appendChild(modal({ pickedTask, tasks: this.tasks }));
          const modalWindow = document.body.querySelector('.modal');
          modalWindow.addEventListener('mousedown', (event) => {
            if (
              event.target.classList.contains('modal-close') ||
              event.target.classList.contains('modal')
            ) {
              document.body.classList.toggle('hidden-x');
              document.body.removeChild(modalWindow);
              this.displayMain();
            }
            if (event.target.classList.contains('task-delete')) {
              this.deleteTask(pickedTask);
              document.body.removeChild(modalWindow);
            }
          });
        }
      });
    });
  }

  //------------------------------------------------------------------------------//

  // Drag and Drop ----------------------------------------------------------///

  dragNdrop() {
    const allLists = main.querySelectorAll('.cards');
    const allTasks = main.querySelectorAll('.card-item');

    let movedTask;
    let afterElement;

    let movedTaskID;
    let afterElementID;
    let listToID;

    const dragStart = function () {
      movedTask = this;
      movedTask.classList.add('dragging');
    };

    const dragEnd = function (event, arr, el) {
      if (afterElement != undefined) {
        afterElementID = afterElement.id;
      } else {
        afterElementID = undefined;
      }
      movedTaskID = movedTask.id;
      listToID = el.id;
      movedTask.classList.remove('dragging');

      moveElement(arr, movedTaskID, afterElementID, listToID);
    };

    const dragOver = function (e) {
      e.preventDefault();

      afterElement = getDragAfterElement(this, e.clientY);
      if (afterElement == null) {
        this.append(movedTask);
      } else {
        this.insertBefore(movedTask, afterElement);
      }
    };

    const getDragAfterElement = function (container, y) {
      const draggableElements = [
        ...container.querySelectorAll('.card-item:not(.dragging)'),
      ];

      return draggableElements.reduce(
        (closest, child) => {
          const box = child.getBoundingClientRect();
          const offset = y - box.top - box.height / 2;
          if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
          } else {
            return closest;
          }
        },
        { offset: Number.NEGATIVE_INFINITY }
      ).element;
    };

    const drop = function (event) {};

    allLists.forEach((el) => {
      el.addEventListener('dragover', dragOver);
      el.addEventListener('drop', drop);
      el.addEventListener('dragend', (event) => dragEnd(event, this.tasks, el));
    });

    allTasks.forEach((el) => {
      el.addEventListener('dragstart', dragStart);
    });

    function moveElement(arr, movedElemID, beforeElemID, listID) {
      let movedTask;

      arr = arr.filter((task) => {
        if (task.id == movedElemID) {
          task.listId = +listID;
          movedTask = task;
        } else {
          return task;
        }
      });

      if (beforeElemID === undefined) {
        arr.push(movedTask);
      } else {
        let to = arr.findIndex((task) => task.id == beforeElemID);
        arr.splice(to, 0, movedTask);
      }
      setData('tasks', arr);
    }
  }

  // ПОИСКОВИК !!!

  search(inputValue) {
    this.otherListsID = [];
    this.filteredTasks = this.tasks.filter((task) => {
      if (task.head.toLowerCase().includes(inputValue.toLowerCase())) {
        this.otherListsID.push(task.listId);
        return task;
      }
    });

    this.filteredLists = this.lists.filter((list) => {
      if (
        list.head.toLowerCase().includes(inputValue.toLowerCase()) ||
        this.otherListsID.some((id) => id == list.id)
      ) {
        return list;
      }
    });

    this.displayMain(this.filteredLists, this.filteredTasks);
  }

  setEventSearch() {
    document.body
      .querySelector('.header__search')
      .addEventListener('input', (event) => this.search(event.target.value));
  }

  // --------------------------------------------------------------------------------

  displayMain = (lists = this.lists, tasks = this.tasks) => {
    this.listContainer = main.querySelector('.main__lists');
    this.listContainer.innerHTML = ``;

    lists.forEach((list) => {
      this.listContainer.innerHTML += `

        <div id="${list.id}" class="list-item">
          <div id="${list.id}" class="list-item-head bg_blue-dark">
            <input id=${list.id} value="${
        list.head
      }" readonly class="list-title"></input>
            <div class="list-buttons">
                <i id="${
                  list.id
                }" class="list-more-btn more-btn fas fa-ellipsis-h"></i>


              <div class="list-more-popup hide">
                <button id="${
                  list.id
                }" class="copy-all-tasks btn-small">Copy tasks</button>
                <button id="${
                  list.id
                }" class="paste-tasks btn-small">Paste tasks</button>
                <button id="${
                  list.id
                }" class="clear-list btn-small">Clear List</button>
                <button id="${
                  list.id
                }" class="delete-list btn-small">Delete List</button>
              </div>
            </div>
          </div>

          ${TasksComponent({ tasks: tasks, listID: list.id })}

            <div id="field-${list.id}" class="enter-card-title hide">
              <textarea id="${
                list.id
              }" class="card-title-input" name="list-title" id="${
        list.id
      }" placeholder="Enter a title for the card"></textarea>
              <div id="${list.id}" class="buttons">
                <button id="${list.id}"  class="add-card btn">Add card</button>
                <i id="${
                  list.id
                }"  class="close-field-btn gray-btn-ico fas fa-times"></i>
              </div>
            </div>
        </div>
      `;
    });
    this.setEventCopyTasks();
    this.setEventpasteTasks();
    this.setEventClearListBtn();
    this.setEventDeletList();
    this.setEventDeleteCard();
    this.setEventChangeTitleCard();

    this.setEventOpenAddField();
    this.setEventAddCard();
    this.setEventListHeadHandler();
    this.eventToggleModal();
    this.dragNdrop();
  };

  render() {
    this.element.appendChild(header);
    this.element.appendChild(main);
    document.body.appendChild(this.element);
  }

  async init() {
    this.create();
    this.displayMain();
    this.setEventtoggleModal();
    this.setEventAddList();
    this.render();
    this.setEventsBody();
    this.setEventSearch();
  }
}

export default new App({ lists, tasks }).init();
