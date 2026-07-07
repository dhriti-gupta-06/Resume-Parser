function Achievements({ data }) {

    const achievements = data.achievements;

    if (!achievements || achievements.length === 0)
        return null;

    return (

        <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-2xl font-bold text-blue-600 mb-6">

                ⭐ Achievements

            </h2>

            <div className="space-y-4">

                {achievements.map((achievement, index) => (

                    <div
                        key={index}
                        className="border rounded-lg p-4 bg-yellow-50"
                    >

                        {achievement}

                    </div>

                ))}

            </div>

        </div>

    );

}

export default Achievements;