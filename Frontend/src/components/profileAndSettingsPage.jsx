function Settings() {

  const user = {
    userName : 'Adarsh Deshmukh',
    Roll : '25BEC004',
    TargetCPI : 8.5
  }

  return (
    <div className="bg-bg min-h-screen text-heading">

      <div className="bg-surface text-2xl font-bold py-4 pl-8">Profile and Setiings</div>

      <div className="bg-surface m-6 p-4 rounded-xl">
       <div className="flex gap-6">
         <div className="bg-lighter rounded-2xl h-10 w-10">
        </div>
        <div className="flex flex-col">
          <p className="font-bold">{user.userName}</p>
          <p className="text-sm">{user.Roll}</p>
        </div>
       </div>

        <div className="flex flex-col gap-4 pt-8">
        <p className="font-bold">Target CPI</p>
        <div className="flex gap-4">
          <input type="text" placeholder={user.TargetCPI} className="bg-lighter p-4 rounded-xl"/>
          <button type="button" className="p-4 hover:bg-bg bg-lighter rounded-xl">Save changes</button>
        </div>
      </div>
      </div>

      

    </div>
  )
}
export default Settings