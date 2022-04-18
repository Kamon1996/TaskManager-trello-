import { lists, tasks } from '../../consts/data.js';

class Header {
  constructor({ tasks, lists }) {
    this.tasks = tasks;
    this.lists = lists;
  }

  create() {
    this.element = document.createElement('header');
    this.element.classList.add('header');
    this.filteredTasks;
    this.filteredLists;
    this.otherListsID;
    this.element.innerHTML = ` 
        <div class="wrapper">
            <i class="header__logo"> Tasks </i>
            <input class="header__search" type="search" name="search" id="search" placeholder="Search" />
        </div>

    `;
    return this.element;
  }

  init() {
    return this.create();
  }
}

const header = new Header({ tasks, lists }).init();
export { header };
