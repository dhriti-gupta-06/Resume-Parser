function Summary({ data }) {

    if (!data.professional_summary) return null;

    return (

        <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-2xl font-bold text-blue-600 mb-5">

                📝 Professional Summary

            </h2>

            <p className="leading-8 text-gray-700">

                {data.professional_summary}

            </p>

        </div>

    );

}

export default Summary;