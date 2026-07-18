function Tasks(){
  const tasks =[
  {
    "title": "DBMS Assignment 2",
    "category": "Assignment",
    "due_status": "Due in 2 days"
  },
  {
    "title": "OS Mid-sem revision",
    "category": "Revision",
    "due_status": "Due tomorrow"
  },
  {
    "title": "Daily DSA practice",
    "category": "Daily",
    "due_status": "Due today"
  },
  {
    "title": "Discrete Math quiz prep • BACKLOG",
    "category": "Exam",
    "due_status": "Overdue by 1 day"
  },
  {
    "title": "Software Eng project report",
    "category": "Assignment",
    "due_status": "Due in 5 days"
  }
]

  return(
    <div className="bg-bg min-h-screen text-heading relative">
      <div className="bg-surface text-2xl font-bold py-4 pl-8">Tasks</div>

      <div className="bg-surface rounded-xl flex m-6 p-4 gap-4">
        <input type="text" placeholder="Enter task name" className="bg-lighter rounded-xl p-4 w-3/5" />
        <input type="text" placeholder="Due date" className="bg-lighter rounded-xl p-4 w-3/10" />
        <button type="button" className="bg-lighter hover:bg-bg rounded-xl p-4 w-1/10">Add</button>
      </div>

      <div className="bg-surface m-6 rounded-xl">
        {tasks.map((task,index)=>(
          <div key={index} className="flex flex-col border-b-2 p-4" >
            <div>
              <div className="justify-between flex ">
              <div>
                <p>{task.title}</p>
              </div>
              <div className="flex gap-6">
                <p>{task.category}</p>
                <p>{task.due_status}</p>
              </div>
              </div>
            </div>
          </div>
        ))}

      </div>
    </div>
  )
}
export default Tasks