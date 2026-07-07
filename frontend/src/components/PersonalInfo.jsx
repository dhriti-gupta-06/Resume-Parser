function PersonalInfo({ data }) {

    const info = data.personal_information;

    return (

        <div className="bg-white shadow rounded-xl p-6">

            <h2 className="text-2xl font-bold text-blue-600 mb-5">

                👤 Personal Information

            </h2>

            <div className="space-y-3">

                <p><strong>Name:</strong> {info.full_name}</p>

                <p><strong>Email:</strong> {info.email}</p>

                <p><strong>Phone:</strong> {info.phone}</p>

                <p><strong>Location:</strong> {info.location || "N/A"}</p>

                <p><strong>LinkedIn:</strong> {info.linkedin || "N/A"}</p>

                <p><strong>GitHub:</strong> {info.github || "N/A"}</p>

            </div>

        </div>

    );

}

export default PersonalInfo;