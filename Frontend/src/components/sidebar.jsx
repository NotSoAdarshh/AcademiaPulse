function Sidebar()
{
  return (
      <div className="bg-bg lg:w-2/11 lg:h-dvh text-heading font-rajdhani flex flex-col gap-12 ">
        <div className="pl-10 pt-10 flex gap-2">
          <div className="bg-blue-400 h-10 w-10 rounded-md"></div>
          <div className="flex flex-col">
            <p className="text-xl">Acedemia Pulse</p>
            <p className="text-[12px]">IIITDMJ</p>
          </div>
        </div>
        <div className="flex flex-col gap-2 px-4">
          <a href="/"className="py-3 pl-6 hover:bg-surface rounded-lg">Dashboard</a>
          <a href="" className="py-3 pl-6 hover:bg-surface rounded-lg">Semester Details</a>
          <a href="" className="py-3 pl-6 hover:bg-surface rounded-lg">AI study planner</a>
          <a href="" className="py-3 pl-6 hover:bg-surface rounded-lg">Tasks and Planner</a>
          <a href="" className="py-3 pl-6 hover:bg-surface rounded-lg">Attendence</a>
          <a href="" className="py-3 pl-6 hover:bg-surface rounded-lg">Profile and Settings</a>
        </div>
      </div>
  )
}
export default Sidebar