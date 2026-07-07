import { Briefcase, Calendar, MapPin } from "lucide-react";

function Experience({ data }) {

    const experiences = data.professional_experience;

    if (!experiences || experiences.length === 0)
        return null;

    return (

        <div className="bg-white rounded-2xl shadow-lg p-8">

            <div className="flex items-center gap-3 mb-8">

                <Briefcase
                    className="text-blue-600"
                    size={32}
                />

                <h2 className="text-3xl font-bold">

                    Professional Experience

                </h2>

            </div>

            <div className="relative border-l-4 border-blue-500 ml-4">

                {experiences.map((exp, index) => (

                    <div
                        key={index}
                        className="relative mb-12 pl-10"
                    >

                        {/* Timeline Circle */}

                        <div
                            className="absolute w-5 h-5 bg-blue-600 rounded-full -left-[12px] top-2 border-4 border-white"
                        ></div>

                        {/* Job Card */}

                        <div className="border rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-6">

                            <h3 className="text-2xl font-bold">

                                {exp.designation}

                            </h3>

                            <p className="text-lg text-blue-600 font-semibold mt-1">

                                {exp.company}

                            </p>

                            <div className="flex flex-wrap gap-6 mt-4 text-gray-600">

                                <div className="flex items-center gap-2">

                                    <Calendar size={18}/>

                                    <span>

                                        {exp.start_date} - {exp.end_date}

                                    </span>

                                </div>

                                <div className="flex items-center gap-2">

                                    <MapPin size={18}/>

                                    <span>

                                        {exp.location || "Not Mentioned"}

                                    </span>

                                </div>

                            </div>

                            <div className="mt-6">

                                <h4 className="font-semibold text-lg mb-3">

                                    Responsibilities

                                </h4>

                                <ul className="space-y-3">

                                    {exp.responsibilities.map((item, i) => (

                                        <li
                                            key={i}
                                            className="flex items-start gap-3"
                                        >

                                            <span className="mt-2 w-2 h-2 rounded-full bg-blue-600"></span>

                                            <span className="leading-7">

                                                {item}

                                            </span>

                                        </li>

                                    ))}

                                </ul>

                            </div>

                        </div>

                    </div>

                ))}

            </div>

        </div>

    );

}

export default Experience;