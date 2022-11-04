/* eslint-disable no-undef */

const todoList = require("../todo");
const { all, markAsComplete, add, dueToday, dueLater, overdue } = todoList();

const today = new Date();
const oneDay = 60 * 60 * 24 * 1000;
const yesterday = new Date(today.getTime() - 1 * oneDay);
const tomorrow = new Date(today.getTime() + 1 * oneDay);

today.toLocaleDateString("en-CA");
tomorrow.toLocaleDateString("en-CA");
yesterday.toLocaleDateString("en-CA");

describe("Todolist test suite", () => {
  beforeAll(() => {
    add({ title: "Submit assignment", dueDate: yesterday, completed: false });
    add({ title: "Pay rent", dueDate: today, completed: true });
    add({ title: "Service Vehicle", dueDate: today, completed: true });
    add({ title: "File taxes", dueDate: yesterday, completed: true });
    add({ title: "Pay electric bill", dueDate: tomorrow, completed: false });
  });

  test("Todo that checks creating a new todo", () => {
    const todoItemsCount = all.length;
    expect(all.length).toBe(todoItemsCount);
    add({
      title: "A new Todo",
      dueDate: today,
      completed: false,
    });
    expect(all.length).toBe(todoItemsCount + 1);
  });

  test("Todo that checks marking a todo as completed.", () => {
    for (let i = 0; i < all.length; i++) {
      if (all[i].completed === false) {
        expect(all[i].completed).toBe(false);
        markAsComplete(i);
      }
      expect(all[i].completed).toBe(true);
    }
  });

  test("Todo that checks retrieval of overdue items.", () => {
    const checkOverdue = overdue().every((item) => item.dueDate < today);
    expect(checkOverdue).toEqual(true);
  });

  test("Todo that checks retrieval of due today items.", () => {
    const checduetoday = dueToday().every((item) => item.duetoday === today);
    expect(checduetoday).toEqual(true);
  });

  test("Todo that checks retrieval of due later items.", () => {
    const checkduelater = dueLater().every((item) => item.dueDate > today);
    expect(checkduelater).toEqual(true);
  });
});
