import { useState } from "react";
import NoTaskFound from "../NoTaskFound";
import AddTaskModal from "./AddTaskModal";
import SearchTask from "./SearchTask";
import TaskActions from "./TaskActions";
import TaskList from "./TaskList";

export default function TaskBoard() {
  const defaultTask = {
    id: crypto.randomUUID(),
    title: "Learn React ",
    description:
      "I want to learn React so that I can use it like my slave and I can do what ever I want to do.",
    tags: ["web", "react", "JS"],
    priority: "High",
    isFavourite: false,
  };
  const [tasks, setTasks] = useState([defaultTask]);
  const [showModal, setShowModal] = useState();
  const [taskToUpdate, setTaskToUpdate] = useState(null);

  const handleAddTask = (newTask, isAdd) => {
    // if "isAdd" is true than it will remain as it is
    if (isAdd) {
      setTasks([...tasks, newTask]);
    }
    // if false than it have to find that particular task by id and edit it
    else {
      setTasks(
        tasks.map((task) => {
          if (task.id === newTask.id) {
            return newTask;
          }
          return task;
        })
      );
    }
    setShowModal(false);
  };

  const handleCloseClick = () => {
    setShowModal(false);
    setTaskToUpdate(null);
  };

  const handleEditTask = (editTask) => {
    setTaskToUpdate(editTask);
    setShowModal(true);
  };

  const handleDeleteTask = (taskId) => {
    const taskAfterDelete = tasks.filter((task) => task.id !== taskId);
    setTasks(taskAfterDelete);
  };

  const handleDeleteAllClick = () => {
    tasks.length = 0;
    setTasks([...tasks]);
  };

  const handleFavourite = (taskId) => {
    const taskIndex = tasks.findIndex((task) => task.id === taskId);

    const newTasks = [...tasks];

    newTasks[taskIndex].isFavourite = !newTasks[taskIndex].isFavourite;
    setTasks(newTasks);
  };

  const handleSearchTask = (searchValue) => {
    console.log(searchValue);
    const filtered = tasks.filter((task) =>
      task.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    setTasks([...filtered]);
  };

  return (
    <>
      {" "}
      <section className="mb-20" id="tasks">
        {showModal && (
          <AddTaskModal
            onSave={handleAddTask}
            taskToUpdate={taskToUpdate}
            handleCloseClick={handleCloseClick}
          />
        )}
        <div className="container">
          <div className="p-2 flex justify-end">
            <SearchTask onSearch={handleSearchTask} />
          </div>

          <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
            <TaskActions
              onActionClick={() => setShowModal(true)}
              onDeleteAllClick={handleDeleteAllClick}
            />

            {tasks.length > 0 ? (
              <TaskList
                tasks={tasks}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
                isFav={handleFavourite}
              />
            ) : (
              <NoTaskFound />
            )}
          </div>
        </div>
      </section>
    </>
  );
}
