class Main {
  constructor(props) {}
  create() {
    this.main = document.createElement('main');
    this.main.classList.add('main');
    this.main.classList.add('bg_white2');
    this.main.innerHTML = ` 

    <div class="wrapper">
      <div class="main__lists"></div>

      <div class="enter-list-title hide">
        <textarea class="list-title-input" name="list-title" id=""></textarea>
        <div class="buttons">
          <button id="add-list" class="btn">Add list</button>
          <i class="gray-btn-ico close fas fa-times"></i>
        </div>
      </div>

      <button class="add-list-btn">
      <i class="fas fa-plus-circle"></i>
      Add another list
      </button>
    </div>

    `;
    return this.main;
  }

  init() {
    return this.create();
  }
}

const main = new Main().init();
const addAnotherListBtn = main.querySelector('.add-list-btn');
const modalAddList = main.querySelector('.enter-list-title');
const addNewListBtn = modalAddList.querySelector('#add-list');
const inputTitle = modalAddList.querySelector('.list-title-input');
const closeIcon = modalAddList.querySelector('.fa-times');

export {
  main,
  addAnotherListBtn,
  closeIcon,
  modalAddList,
  addNewListBtn,
  inputTitle,
};
