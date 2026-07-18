function Attendence () {
  const records = [
  {
    "id": 1,
    "subject": "Data Structures",
    "percentage": 71,
    "attended_classes": 32,
    "total_classes": 45,
    "status_message": "Attend the next 7 classes to reach 75%",
    "status_type": "danger"
  },
  {
    "id": 2,
    "subject": "DBMS",
    "percentage": 89,
    "attended_classes": 40,
    "total_classes": 45,
    "status_message": "You can skip up to 8 more classes and stay above 75%",
    "status_type": "safe"
  },
  {
    "id": 3,
    "subject": "Operating Systems",
    "percentage": 79,
    "attended_classes": 34,
    "total_classes": 43,
    "status_message": "You can skip up to 2 more classes and stay above 75%",
    "status_type": "safe"
  },
  {
    "id": 4,
    "subject": "Computer Networks",
    "percentage": 93,
    "attended_classes": 37,
    "total_classes": 40,
    "status_message": "You can skip up to 9 more classes and stay above 75%",
    "status_type": "safe"
  },
  {
    "id": 5,
    "subject": "Software Engineering",
    "percentage": 83,
    "attended_classes": 30,
    "total_classes": 36,
    "status_message": "You can skip up to 4 more classes and stay above 75%",
    "status_type": "safe"
  },
  {
    "id": 6,
    "subject": "Discrete Mathematics",
    "percentage": 66,
    "attended_classes": 23,
    "total_classes": 35,
    "status_message": "Attend the next 13 classes to reach 75%",
    "status_type": "danger"
  }
]

  return(
    <div className="bg-bg relative min-h-screen text-heading">

      <div className="bg-surface text-2xl font-bold py-4 pl-8">Attendence Tracking</div>

      <div className="m-6 md:grid md:grid-cols-2 lg:grid-cols-4 flex flex-col gap-4">
        {records.map((record,index)=>(
          <div key={index} className="bg-surface p-4 rounded-xl flex-col">
            <div className="justify-between flex">
              <p className="font-semibold">{record.subject}</p>
              <p>{record.percentage}%</p>
            </div>
            <div className="pt-4">
              <p>you attended {record.attended_classes} of {record.total_classes}</p>
              <p>{record.status_message}</p>
            </div>

          </div>
        ))}
      </div>
    </div>
  )
}
export default Attendence