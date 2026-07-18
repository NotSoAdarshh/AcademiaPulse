function SemesterDetails () {

  const courseData = [
  {
    subject: "Data Structures",
    credits: 4,
    attendance: 71,
    score: 82,
    grade: "A-",
    syllabusCovered: 78
  },
  {
    subject: "DBMS",
    credits: 4,
    attendance: 88,
    score: 91,
    grade: "A+",
    syllabusCovered: 95
  },
  {
    subject: "Operating Systems",
    credits: 3,
    attendance: 79,
    score: 74,
    grade: "B",
    syllabusCovered: 60
  },
  {
    subject: "Computer Networks",
    credits: 3,
    attendance: 92,
    score: 88,
    grade: "A",
    syllabusCovered: 85
  },
  {
    subject: "Software Engineering",
    credits: 3,
    attendance: 84,
    score: 69,
    grade: "B",
    syllabusCovered: 70
  },
  {
    subject: "Discrete Mathematics",
    credits: 4,
    attendance: 65,
    score: 58,
    grade: "C+",
    syllabusCovered: 45
  }
];

  return (
    <div className="bg-bg min-h-screen text-heading">
      <div className="bg-surface text-2xl font-bold py-4 pl-8">Semester Details</div>

      <div className="flex gap-4 m-6">
        <button type="button" className="p-2 px-4 bg-surface rounded-lg hover:bg-buttonCl">Sem 1</button>
        <button type="button" className="p-2 px-4 bg-surface rounded-lg hover:bg-buttonCl">Sem 2</button>
        <button type="button" className="p-2 px-4 bg-surface rounded-lg hover:bg-buttonCl">Sem 3</button>
        <button type="button" className="p-2 px-4 bg-surface rounded-lg hover:bg-buttonCl">Sem 4</button>
        <button type="button" className="p-2 px-4 bg-surface rounded-lg hover:bg-buttonCl">Sem 5</button>
        <button type="button" className="p-2 px-4 bg-surface rounded-lg hover:bg-buttonCl">Sem 6</button>
        <button type="button" className="p-2 px-4 bg-surface rounded-lg hover:bg-buttonCl">Sem 7</button>
        <button type="button" className="p-2 px-4 bg-surface rounded-lg hover:bg-buttonCl">Sem 8</button>
      </div>

      <div className="bg-surface grid ">
        {/* Create a table here for all the subjects */}
      </div>
    </div>
  )
}
export default SemesterDetails