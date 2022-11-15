/* eslint-disable no-unused-vars */
const todoList = () => {
  const all = [];
  const add = (todoItem) => {
    all.push(todoItem);
  };
  const markAsComplete = (index) => {
    all[index].completed = true;
  };
  const today = new Date().toLocaleDateString("en-CA");
  const overdue = () => {
    return all.filter((dolist) => dolist.dueDate < today);
  };

  const dueToday = () => {
    return all.filter((x) => today == x.dueDate);
  };

  const dueLater = () => {
    return all.filter((x) => x.dueDate > today);
  };

  const toDisplayableList = (list) => {
    return list
      .map((todos) => {
        const complete = todos.completed ? "x" : " ";
        return `[${complete}] ${todos.title} ${
          todos.dueDate == today ? "" : todos.dueDate
        }`;
      })
      .join("\n");
  };
  return {
    all,
    add,
    markAsComplete,
    overdue,
    dueToday,
    dueLater,
  };
};
module.exports = todoList;
