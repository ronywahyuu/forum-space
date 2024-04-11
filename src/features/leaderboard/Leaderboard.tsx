import { useGetLeaderboardQuery } from "./leaderboardApiSlice"

type Props = {}

const Leaderboard = (props: Props) => {
  const { data, isFetching, isSuccess } = useGetLeaderboardQuery()


  if (isFetching) return <div>Loading...</div>

  const leaderboards = data?.data.leaderboards

  if (isSuccess) {
    return (
      <div className="  mt-8 mb-28 mx-4">
        <h2 className="text-2xl font-bold mb-4">Leaderboards</h2>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-6 py-3 text-left font-semibold text-gray-800">
                  User
                </th>
                <th className="px-6 py-3 text-left font-semibold text-gray-800">
                  Score
                </th>
              </tr>
            </thead>
            <tbody>
              {leaderboards?.map((entry) => (
                <tr key={entry.user.id} className="border-t border-gray-200">
                  <td className="flex items-center px-6 py-4 text-left">
                    <img
                      className="w-8 h-8 rounded-full object-cover mr-2"
                      src={entry.user.avatar}
                      alt={`${entry.user.name}'s Avatar`}
                    />
                    <span className="text-gray-800">{entry.user.name}</span>
                  </td>
                  <td className="px-6 py-4 text-left text-gray-800">
                    {entry.score}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

}

export default Leaderboard