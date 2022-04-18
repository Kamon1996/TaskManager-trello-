import { comments } from './modal-info/comments/Comments.js';
import { setData } from '../../../consts/data.js';

class Modal {
  constructor({ pickedTask, tasks }) {
    this.pickedTask = pickedTask;
    this.allTasks = tasks;
    this.title;
    this.description;
    this.clearButtons;
  }
  create() {
    this.modal = document.createElement('div');
    this.modal.classList.add('modal');
    return this.modal;
  }

  addEdit(elem) {
    elem.setAttribute('contenteditable', true);
    elem.focus();
  }

  setEventToggleEdit() {
    this.title.addEventListener('click', (event) => this.addEdit(this.title));
  }

  ChangeDescription(newDescription, id, buttons) {
    this.allTasks.find((task) => {
      if (task.id == id) task.description = newDescription;
      setData('tasks', this.allTasks);
      buttons.classList.add('hide');
    });
  }

  setEventChangeDescription() {
    const SaveDescriptionBtn = this.modal.querySelector('.save-description');
    SaveDescriptionBtn.addEventListener('click', (e) =>
      this.ChangeDescription(
        e.target.parentElement.previousElementSibling.value,
        e.target.id,
        e.target.parentElement
      )
    );
  }
  // Добавляет комментарий по кнопке

  setEventAddComment(commentsArr, allTasks) {
    const addCommentBtn = this.modal.querySelector('.add-comment');
    addCommentBtn.addEventListener('click', (event) => {
      if (
        event.target
          .closest('.activity-add-field')
          .querySelector('.activity-text').value.length >= 2
      ) {
        commentsArr.push({
          id: +Date.now(),
          time: new Date().toString(),
          text: event.target
            .closest('.activity-add-field')
            .querySelector('.activity-text').value,
        });
        setData('tasks', allTasks);
        this.render();
      }
    });
  }

  // Прячет / Показывает кнопки если есть или нет контента в поле

  onChangeText(textField, buttonsDiv) {
    if (textField.tagName === 'TEXTAREA' || textField.tagName === 'INPUT') {
      if (textField.value.length == 0) {
        buttonsDiv.classList.add('hide');
      } else {
        buttonsDiv.classList.remove('hide');
      }
    } else {
      if (textField.innerHTML.length == 0) {
        buttonsDiv.classList.add('hide');
      } else {
        buttonsDiv.classList.remove('hide');
      }
    }
  }
  setEventOnChange() {
    this.commentField.addEventListener('input', (event) => {
      this.onChangeText(
        this.commentField,
        this.commentField.nextElementSibling
      );
    });
    this.description.addEventListener('input', (event) => {
      this.onChangeText(this.description, this.description.nextElementSibling);
    });
    this.title.addEventListener('input', (event) => {
      this.onChangeText(this.title, this.title.nextElementSibling);
    });
  }

  // --------------------------------------------------------------------

  clearFieldComment(field) {
    field.value = '';
    field.nextElementSibling.classList.add('hide');
  }
  setEventClearComment() {
    this.modal
      .querySelector('.clear-field')
      .addEventListener('click', (event) =>
        this.clearFieldComment(
          event.target.parentElement.previousElementSibling
        )
      );
  }

  removeChangesDscrpt(textField, buttons) {
    textField.value = this.pickedTask.description;
    buttons.classList.add('hide');
  }

  setEventRemoveChangesDescription() {
    this.modal
      .querySelector('.remove-changes-dscrpt')
      .addEventListener('click', (event) =>
        this.removeChangesDscrpt(
          this.description,
          this.description.nextElementSibling
        )
      );
  }

  removeChangesTitle(textField, buttons) {
    JSON.parse(localStorage.getItem('tasks')).find((task) => {
      if (task.id == textField.id) {
        textField.innerHTML = task.head;
      }
    });
    buttons.classList.add('hide');
  }

  setEventRemoveChangesTitle() {
    this.modal
      .querySelector('.cansel-changes-title')
      .addEventListener('click', (event) =>
        this.removeChangesTitle(this.title, this.title.nextElementSibling)
      );
  }

  saveTitle(event, newTitle, buttons) {
    event.stopPropagation();
    this.allTasks.find((task) => {
      if (task.id == +newTitle.id) {
        task.head = newTitle.innerHTML;
      }
    });
    setData('tasks', this.allTasks);
    buttons.classList.add('hide');
    this.render();
  }

  setEventSaveTitle() {
    this.modal
      .querySelector('.save-title')
      .addEventListener('click', (event) =>
        this.saveTitle(event, this.title, this.title.nextElementSibling)
      );
  }

  render() {
    this.modal.innerHTML = ``;
    this.modal.innerHTML = ` 


    <div class="modal-wrapper">
    <i class="modal-close fas fa-times gray-btn-ico"></i>
    <i class="task-delete fas fa-trash gray-btn-ico"></i>
    <h1 id="${this.pickedTask.id}" class="modal-title">${
      this.pickedTask.head
    }</h1>

        <div id="${this.pickedTask.id}" class="buttons hide">
          <button id="${
            this.pickedTask.id
          }" class="save-title btn">Save</button>
          <i id="${
            this.pickedTask.id
          }" class="gray-btn-ico cansel-changes-title fas fa-times"></i>
        </div>
    

    <p class="modal-subtitle">in list In Progress</p>

    <div class="created-data">
      <h4 class="created-data-title"></h4>
      <p class="created-data-value">${this.pickedTask.createData}</p>
    </div>

    <div class="description">
      <h4 class="description-title">Description</h4>
      <textarea
        class="description-text"
        name="description"
        id="${this.pickedTask.id}"
        placeholder="Add a more detailed description"
      >
${this.pickedTask.description}</textarea
      >
      <div id="${this.pickedTask.id}" class="buttons hide">
            <button id="${
              this.pickedTask.id
            }" class="save-description btn">Save</button>
            <i id="${
              this.pickedTask.id
            }" class="gray-btn-ico remove-changes-dscrpt fas fa-times"></i>
      </div>
    </div>

    <div class="activity">
      <h4 class="activity-title">Activity</h4>

      ${comments(this.pickedTask.comments)}
        
        <div class="activity-add-field">
          <textarea
            class="activity-text"
            name="activity"
            id="${this.pickedTask.id}"
            placeholder="Write a comment"
          ></textarea>
          <div id="${this.pickedTask.id}" class="buttons hide">
            <button id="${
              this.pickedTask.id
            }" class="add-comment btn">Save</button>
            <i id="${
              this.pickedTask.id
            }" class="gray-btn-ico clear-field fas fa-times"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
    `;
    this.title = this.modal.querySelector('.modal-title');
    this.description = this.modal.querySelector('.description-text');
    this.commentField = this.modal.querySelector('.activity-text');
    this.clearButtons = this.modal.querySelectorAll('.clear-field');
    this.setEventAddComment(this.pickedTask.comments, this.allTasks);
    this.setEventOnChange();
    this.setEventClearComment();
    this.setEventChangeDescription();
    this.setEventToggleEdit();
    this.setEventRemoveChangesDescription();
    this.setEventRemoveChangesTitle();
    this.setEventSaveTitle();
    return this.modal;
  }

  init() {
    this.create();
    return this.render();
  }
}

export const modal = ({ ...props }) => new Modal({ ...props }).init();
