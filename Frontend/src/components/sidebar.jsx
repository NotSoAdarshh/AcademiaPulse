import { Link } from "react-router-dom"
function Sidebar()
{
  return (
      <div className="bg-surface lg:w-2/11 h-screen sticky top-0 text-heading font-rajdhani flex flex-col gap-12 shrink-0 ">
        <div className="pl-10 pt-10 flex gap-2">
          <div className="bg-blue-400 h-10 w-10 rounded-md"></div>
          <div className="flex flex-col">
            <p className="text-xl">Acedemia Pulse</p>
            <p className="text-[12px]">IIITDMJ</p>
          </div>
        </div>
        <div className="flex flex-col gap-2 px-4">
          <Link to='/' className="py-3 pl-6 hover:bg-lighter rounded-lg">Dashboard</Link>
          <Link to='/semester'  className="py-3 pl-6 hover:bg-lighter rounded-lg">Semester Details</Link>
          <Link to='/planner'  className="py-3 pl-6 hover:bg-lighter rounded-lg">AI study planner</Link>
          <Link to='/tasks'  className="py-3 pl-6 hover:bg-lighter rounded-lg">Tasks and Planner</Link>
          <Link to='/attendence'  className="py-3 pl-6 hover:bg-lighter rounded-lg">Attendence</Link>
          <Link to='/setting'  className="py-3 pl-6 hover:bg-lighter rounded-lg">Profile and Settings</Link>
        </div>
      </div>
  )
}
export default Sidebar