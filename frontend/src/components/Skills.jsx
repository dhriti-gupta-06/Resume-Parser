function Skills({ data }) {

    const skills = data.technical_skills;

    return (

        <div className="bg-white shadow rounded-xl p-6">

            <h2 className="text-2xl font-bold text-blue-600 mb-6">
                🛠 Technical Skills
            </h2>

            {Object.entries(skills).map(([category, values]) => (

                values.length > 0 && (

                    <div key={category} className="mb-6">

                        <h3 className="font-semibold text-gray-700 capitalize mb-3">
                            {category.replace("_", " ")}
                        </h3>

                        <div className="flex flex-wrap gap-3">

                            {values.map((skill, index) => (

                                <span
                                    key={index}
                                    className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium"
                                >
                                    {skill}
                                </span>

                            ))}

                        </div>

                    </div>

                )

            ))}

        </div>

    );

}

export default Skills;