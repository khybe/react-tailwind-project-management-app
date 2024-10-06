import { useState, useRef } from "react";

import { useProjectsContext } from "../context/projectContext";
import Modal from "./Modal";

export default function NewTask() {
  const { projectsState, dispatch } = useProjectsContext();
  const modal = useRef();
  const [enteredTask, setEnteredTask] = useState("");

  function handleChange(event) {
    setEnteredTask(event.target.value);
  }

  function handleAddTask() {
    if (enteredTask.trim() === "") {
      modal.current.open();
      return;
    }

    const taskId = Math.random();
    const newTask = {
      text: enteredTask,
      projectId: projectsState.selectedProjectId,
      id: taskId,
    };
    dispatch({ type: "ADD_TASK", payload: newTask });

    setEnteredTask("");
  }

  return (
    <>
      <Modal ref={modal} buttonCaption="Okay">
        <h2 className="text-xl font-bold text-stone-700 my-4">Invalid Input</h2>
        <p className="text-stone-600 mb-4">
          Please enter a valid text before adding it to the tasks collection.
        </p>
      </Modal>
      <div className="flex flex-wrap items-center gap-4">
        <input
          type="text"
          className="w-64 px-2 py-1 rounded-sm bg-stone-200"
          onChange={handleChange}
          value={enteredTask}
        />
        <button
          className="text-stone-700 hover:text-stone-950"
          onClick={handleAddTask}
        >
          Add Task
        </button>
      </div>
    </>
  );
}
