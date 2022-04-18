let lists = [
  {
    id: 1,
    head: 'ToDo',
    tasks: [2],
  },
  {
    id: 2,
    head: 'InProgress',
    tasks: [],
  },
  {
    id: 3,
    head: 'Done',
    tasks: [],
  },
];

let tasks = [
  {
    createData: '12',
    id: 1,
    listId: 1,
    isDone: false,
    head: 'do something',
    description: 'that dosent mean anything, just read it and thx',
    comments: [
      {
        userName: 'Jhon',
        comment: 'thx, that was helpaful',
      },
      {
        userName: 'Ann',
        comment: 'thx, that was really helpaful',
      },
    ],
  },
  {
    createData: '32',
    id: 2,
    listId: 1,
    isDone: false,
    head: 'do something 2',
    description: 'that dosent mean anything, just read it and thx 2',
    comments: [
      {
        userName: 'Jhon',
        comment: 'thx, that was helpaful 2',
      },
      {
        userName: 'Ann',
        comment: 'thx, that was really helpaful 2',
      },
    ],
  },
  {
    createData: '3232',
    id: 1,
    listId: 2,
    isDone: false,
    head: 'do something 3',
    description: 'that dosent mean anything, just read it and thx 3',
    comments: [
      {
        userName: 'Jhon',
        comment: 'thx, that was helpaful 3',
      },
      {
        userName: 'Ann',
        comment: 'thx, that was really helpaful 3',
      },
    ],
  },
];

function getData() {
  if (localStorage.getItem('lists')) {
    console.log('Беру листы из локалстор');
    lists = JSON.parse(localStorage.getItem('lists'));
  }
  if (localStorage.getItem('tasks')) {
    console.log('Беру карточки из локалстор');
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
}
getData();

function setData(name, data) {
  localStorage.setItem(name, JSON.stringify(data));
}

export { lists, tasks, setData };
