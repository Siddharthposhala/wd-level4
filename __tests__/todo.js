/* eslint-disable no-undef */

const todoList = require("../todo");
const { all, markAsComplete, add, dueToday, dueLater, overdue } = todoList();
var a = [];
const today = new Date().toLocaleDateString("en-CA");
describe("Todolist test suite", () => {
  beforeAll(() => {
    a = [
      { title: "Submit assignment", dueDate: "2022-11-01", completed: false },
      { title: "Pay rent", dueDate: today, completed: true },
      { title: "Service Vehicle", dueDate: today, completed: true },
      { title: "File taxes", dueDate: "2022-11-04", completed: true },
      { title: "Pay electric bill", dueDate: "2022-11-06", completed: false },
    ];
  });

  test("Todo that checks creating a new todo", () => {
    a.forEach((x) => {
      const todoItemsCount = all.length;
      expect(all.length).toBe(todoItemsCount);
      add(x);
      expect(all.length).toBe(todoItemsCount + 1);
    });
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
    overdue().forEach((x) => {
      let f = x.dueDate < today;
      expect(f).toEqual(true);
      expect(overdue().length).toEqual(1);
    });
  });

  test("Todo that checks retrieval of due today items.", () => {
    dueToday().forEach((x) => {
      expect(dueToday().length).toEqual(2);
      expect(x.dueDate).toEqual(today);
    });
  });

  test("Todo that checks retrieval of due later items.", () => {
    dueLater().forEach((x) => {
      let s = x.dueDate > today;
      expect(s).toEqual(true);
      expect(dueLater().length).toEqual(2);
    });
  });
});
