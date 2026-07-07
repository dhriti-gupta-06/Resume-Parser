function Education({ data }) {

    const education = data.education;

    return (

        <div className="bg-white shadow rounded-xl p-6">

            <h2 className="text-2xl font-bold text-blue-600 mb-6">
                🎓 Education
            </h2>

            <div className="space-y-5">

                {education.map((edu, index) => (

                    <div
                        key={index}
                        className="border rounded-lg p-5 hover:shadow-md transition"
                    >

                        <h3 className="text-xl font-semibold">
                            {edu.degree}
                        </h3>

                        <p className="text-gray-700">
                            {edu.specialization}
                        </p>

                        <p className="mt-2">
                            <strong>Institution:</strong> {edu.institution}
                        </p>

                        <p>
                            <strong>Location:</strong> {edu.location || "N/A"}
                        </p>

                        <p>
                            <strong>CGPA:</strong> {edu.cgpa || "N/A"}
                        </p>

                        <p>
                            <strong>Percentage:</strong> {edu.percentage || "N/A"}
                        </p>

                        <p>
                            <strong>Duration:</strong> {edu.start_date} - {edu.end_date}
                        </p>

                    </div>

                ))}

            </div>

        </div>

    );

}

export default Education;