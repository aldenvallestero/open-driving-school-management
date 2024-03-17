export default function AttendancePage() {

  return (
    <div className="container-fluid">
      <h1 className="font-bold text-2xl m-4">Attendance - January 28, 2024</h1>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Name</th>
              <th scope="col" className="px-6 py-3">Time In</th>
              <th scope="col" className="px-6 py-3">Time Out</th>
              <th scope="col" className="px-6 py-3">Email</th>
              <th scope="col" className="px-6 py-3">Phone</th>
            </tr>
          </thead>
          <tbody>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">Alden Vallestero</th>
                <td className="px-6 py-4">9:00</td>
                <td className="px-6 py-4">18:00</td>
                <td className="px-6 py-4">email@example.com</td>
                <td className="px-6 py-4">09xxxxxxxxx</td>
              </tr>
          </tbody>
        </table>
      </div>
    </div>
    
  )
}
