function Certifications({ data }) {

    const certifications = data.certifications;

    if (!certifications || certifications.length === 0)
        return null;

    return (

        <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-2xl font-bold text-blue-600 mb-6">
                🏆 Certifications
            </h2>

            <div className="flex flex-wrap gap-3">

                {certifications.map((cert, index) => (

                    <span
                        key={index}
                        className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-medium"
                    >
                        {cert}
                    </span>

                ))}

            </div>

        </div>

    );

}

export default Certifications;