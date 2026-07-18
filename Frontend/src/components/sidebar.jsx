import { Link } from "react-router-dom"
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
          <link to='/' className="py-3 pl-6 hover:bg-surface rounded-lg">Dashboard</link>
          <link to='/semester'  className="py-3 pl-6 hover:bg-surface rounded-lg">Semester Details</link>
          <link to='/planner'  className="py-3 pl-6 hover:bg-surface rounded-lg">AI study planner</link>
          <link to='/tasks'  className="py-3 pl-6 hover:bg-surface rounded-lg">Tasks and Planner</link>
          <link to='/attendence'  className="py-3 pl-6 hover:bg-surface rounded-lg">Attendence</link>
          <link to='/settinglink'  className="py-3 pl-6 hover:bg-surface rounded-lg">Profile and Settings</link>
        </div>
      </div>
  )
}
export default Sidebar