function Planner () {

  const studySchedule = [
  {
    day: "Day 1",
    sessions: [
      {
        subject: "Discrete Math",
        duration: "45m",
        topic: "Graph theory basics"
      },
      {
        subject: "OS",
        duration: "45m",
        topic: "Process scheduling"
      }
    ],
    note: "15 min break between sessions"
  },
  {
    day: "Day 2",
    sessions: [
      {
        subject: "Discrete Math",
        duration: "60m",
        topic: "Recurrence relations"
      },
      {
        subject: "DBMS",
        duration: "30m",
        topic: "Normalization (revision)"
      }
    ],
    note: "Short walk after Discrete Math"
  },
  {
    day: "Day 3",
    sessions: [
      {
        subject: "OS",
        duration: "60m",
        topic: "Deadlocks"
      },
      {
        subject: "Data Structures",
        duration: "30m",
        topic: "AVL trees"
      }
    ],
    note: "10 min stretch break"
  },
  {
    day: "Day 4",
    sessions: [
      {
        subject: "Discrete Math",
        duration: "45m",
        topic: "Set theory + relations"
      },
      {
        subject: "Tasks",
        duration: "45m",
        topic: "DBMS Assignment 2"
      }
    ],
    note: "Longer break — assignment due tomorrow"
  },
  {
    day: "Day 5",
    sessions: [
      {
        subject: "OS",
        duration: "60m",
        topic: "Memory management"
      },
      {
        subject: "Discrete Math",
        duration: "30m",
        topic: "Practice problems"
      }
    ],
    note: "15 min break"
  },
  {
    day: "Day 6",
    sessions: [
      {
        subject: "Revision",
        duration: "90m",
        topic: "Weak topics review"
      }
    ],
    note: "20 min break midway"
  },
  {
    day: "Day 7",
    sessions: [
      {
        subject: "Light review",
        duration: "30m",
        topic: "Flip through notes only"
      }
    ],
    note: "Rest — exam week starts"
  }
]

  return (
    <div className="text-heading min-h-screen pb-4 bg-bg">
      <div className="bg-surface text-2xl font-bold py-4 pl-8">AI Study Planner</div>

      <div className="m-6 bg-surface flex flex-col rounded-xl">
        <p className="px-6 pt-6 pb-2">Plan generated from your weak subjects: Discrete Mathematics, Operating Systems according to your requierements</p>
        <input placeholder="Enter your study hour details and requierements" className=" p-4 mx-6 mb-6 rounded-xl bg-lighter"></input>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 m-6">
  {studySchedule.map((study, index) => (
    <div key={index} className="bg-surface rounded-xl flex flex-col p-4">
      
      <div> 
        <p className="font-bold">{study.day}</p>
      </div>

      <div className="grow">
        {study.sessions.map((session, sessionIndex) => (
          <div key={sessionIndex} className="mb-2">
            <p>{session.subject}</p>
            <p>{session.topic}</p>
            <p className="text-sm opacity-75">{session.duration}</p>
          </div>
        ))}
      </div>

      <div className="mt-2 pt-2 border-t border-gray-200">
        <p className="text-sm italic">{study.note}</p>
      </div>
      
    </div>
  ))}
</div>

    </div>

  )
}
export default Planner