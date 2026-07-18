function Dashboard ()
{ const cpi = 8.1;
  const attendence = 'On track';
  const backlogs = 1;
  const tasks = [
    {
      title:'Daily DSA practice',
      description : 'Data structures',
      due : 'Today'
    },
    {
      title:'OS midsem revesion',
      description : 'Revesion',
      due : 'Tomorrow'
    },
    {
      title:'DBMS Assignment',
      description : 'PPTX',
      due : 'due in 2 days'
    }
  ];

  const announ = [
    {
      type : 'Alert',
      info : 'attendence kam hai gelchode'
    },
    {
      type : 'Alert',
      info : 'DBMS ka assignment bhi hai BC'
    },
    {
      type : 'Announcement',
      info : 'Midsem Ka tt aagaya'
    }
  ];

  return (
    <div className="bg-bg min-h-screen pb-8 relative text-heading">
      <div className="bg-surface text-2xl font-bold py-4 pl-8">Dashboard</div>

      <div className="lg:flex-row m-6 justify-center gap-4 lg:gap-8  text-sm flex flex-col">
        <div className="bg-surface flex-auto rounded-xl px-8 py-6">
          <p className="" >Current CPI</p>
          <p className="text-2xl  font-bold">{cpi}</p>
        </div>
         <div className="bg-surface flex-auto rounded-xl px-8 py-6">
          <p className="" >Attendence status</p>
          <p className="text-2xl font-bold">{attendence}</p>
        </div>
         <div className="bg-surface flex-auto rounded-xl px-8 py-6">
          <p className="" >Active Backlogs</p>
          <p className="text-2xl font-bold">{backlogs}</p>
        </div>
      </div>

      <div className="bg-surface mx-6 rounded-xl p-6">
        <p className="text-xl font-bold pb-6">Upcomming Deadlines</p>
        {tasks.map((task,index)=>(
          <div key={index} className=" flex p-2 border-b justify-between">
            <div className="flex flex-col">
            <p className="font-bold ">{task.title}</p>
            <p className="text-sm">{task.description}</p>
            </div>
            <span>{task.due}</span>
          </div>

        ))}
      </div>

      <div className="flex lg:flex-row flex-col m-6 gap-4">
        <div className="bg-surface lg:w-2/3 rounded-xl p-6">
          <p className="text-md font-bold ">CPI Trend</p>
        </div>
        <div className="text-heading bg-surface lg:w-1/3 rounded-xl p-6">
          <p className="text-md font-bold">Alerts</p>
          {announ.map((annou,index)=>(
            <div key={index} className="flex border-b-2 p-4 flex-col">
              <p>{annou.type}</p>
              <div>{annou.info}</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
export default Dashboard