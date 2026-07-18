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
  const Alerts = [
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
  ],

  return (
    <div className="bg-bg h-dvh relative text-heading">
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
        <p className="font-xl font-bold">Upcomming Deadlines</p>
      </div>

      <div className="flex m-6 gap-4">
        <div className="bg-surface w-2/3 rounded-xl p-6">
          <p className="text-md font-bold ">CPI Trend</p>
        </div>
        <div className="text-heading bg-surface w-1/3 rounded-xl p-6">
          <p className="text-md font-bold">Alerts</p>
        </div>

      </div>

    </div>
  )
}
export default Dashboard