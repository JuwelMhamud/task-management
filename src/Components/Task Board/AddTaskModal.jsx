import { useState } from "react";
export default function AddTaskModal({onSave , taskToUpdate , handleCloseClick}) {
  const [task, setTask] = useState(  taskToUpdate ||{
    id: crypto.randomUUID(),
    title: "",
    description: "",
    tags: [],
    priority: "",
    isFavourite: false,
  });

  // it will check is "taskToUpdate = null" than "isAdd = true"
  const [isAdd, setIsAdd] = useState(Object.is(taskToUpdate, null))

  const handleChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;

    // as tags will be arry with multiple or single value , so we need to use "split" to separate two value or more values and return as a array.
    if(name === 'tags'){
      value = value.split(',')
      // now value holding an array 
    }

    setTask({
      ...task,
      [name]: value,
    });


  };
  return (
    <div>
      <div className="bg-black bg-opacity-70 w-full h-full z-10 absolute top-0 left-0 "></div>
      <form className=" mx-auto my-10 w-full max-w-[740px] rounded-xl border border-[#FEFBFB]/[36%] bg-[#191D26] p-9 max-md:px-4 lg:my-20 lg:p-11 z-10 relative top-8 left-1/3"
      onSubmit={(e) => {
        e.preventDefault(); 
        onSave(task , isAdd); 
      }}>
        <h2 className="mb-9 text-center text-2xl font-bold text-white lg:mb-11 lg:text-[28px]">
          {isAdd ? "Add New Task" : "Edit Task" }
        </h2>

        <div className="space-y-9 text-white lg:space-y-10">
          <div className="space-y-2 lg:space-y-3">
            <label htmlFor="title">Title</label>
            <input
              className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
              type="text"
              name="title"
              value={task.title}
              onChange={handleChange}
              id="title"
              required
            />
          </div>

          <div className="space-y-2 lg:space-y-3">
            <label htmlFor="description">Description</label>
            <textarea
              className="block min-h-[120px] w-full rounded-md bg-[#2D323F] px-3 py-2.5 lg:min-h-[180px]"
              type="text"
              name="description"
              value={task.description}
              onChange={handleChange}
              id="description"
              required
            ></textarea>
          </div>
          <div className="grid-cols-2 gap-x-4 max-md:space-y-9 md:grid lg:gap-x-10 xl:gap-x-20">
            <div className="space-y-2 lg:space-y-3">
              <label htmlFor="tags">Tags</label>
              <input
                className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
                type="text"
                name="tags"
                value={task.tags}
                onChange={handleChange}
                id="tags"
                required
              />
            </div>
            <div className="space-y-2 lg:space-y-3">
              <label htmlFor="priority">Priority</label>
              <select
                className="block w-full cursor-pointer rounded-md bg-[#2D323F] px-3 py-2.5"
                name="priority"
                value={task.priority}
                onChange={handleChange}
                id="priority"
                required
              >
                <option value="">Select Priority</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>
        </div>
        <div className="mt-16 flex justify-between lg:mt-20">
          <button
            type="submit"
            className="rounded bg-blue-600 px-4 py-2 text-white transition-all hover:opacity-80"
          >
           {isAdd ? " Create new Task" : "Edit Task"}
          </button>
          <button
            
            className="rounded-md bg-red-500 px-3.5 py-2.5 text-sm font-semibold"
            onClick={handleCloseClick}
          >
           Close
          </button>
        </div>
      </form>
    </div>
  );
}
