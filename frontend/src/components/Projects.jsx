import {
    FolderGit2,
    Calendar,
    ExternalLink
} from "lucide-react";

function Projects({ data }) {

    const projects = data.projects;

    if (!projects || projects.length === 0)
        return null;

    return (

        <div className="bg-white rounded-2xl shadow-lg p-8">

            <div className="flex items-center gap-3 mb-8">

                <FolderGit2
                    size={32}
                    className="text-blue-600"
                />

                <h2 className="text-3xl font-bold">

                    Projects

                </h2>

            </div>

            <div className="space-y-8">

                {projects.map((project, index) => (

                    <div
                        key={index}
                        className="border rounded-2xl p-7 hover:shadow-xl transition duration-300"
                    >

                        {/* Header */}

                        <div className="flex justify-between items-start flex-wrap gap-4">

                            <div>

                                <h3 className="text-2xl font-bold">

                                    {project.project_name}

                                </h3>

                                <div className="flex items-center gap-2 mt-2 text-gray-500">

                                    <Calendar size={18} />

                                    {project.duration}

                                </div>

                            </div>

                            <div className="flex gap-4">

                                {project.github_link && (

                                    <a
                                        href={project.github_link}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-black"
                                    >

                                        <span>🐙</span>

                                        GitHub

                                    </a>

                                )}

                                {project.live_link && (

                                    <a
                                        href={project.live_link}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                                    >

                                        <ExternalLink size={18} />

                                        Live Demo

                                    </a>

                                )}

                            </div>

                        </div>

                        {/* Technologies */}

                        <div className="mt-6">

                            <h4 className="font-semibold mb-3 text-lg">

                                Technologies Used

                            </h4>

                            <div className="flex flex-wrap gap-3">

                                {project.technologies.map((tech, i) => (

                                    <span
                                        key={i}
                                        className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-medium"
                                    >

                                        {tech}

                                    </span>

                                ))}

                            </div>

                        </div>

                        {/* Description */}

                        <div className="mt-7">

                            <h4 className="font-semibold mb-3 text-lg">

                                Description

                            </h4>

                            <ul className="space-y-4">

                                {project.description.map((point, i) => (

                                    <li
                                        key={i}
                                        className="flex items-start gap-3"
                                    >

                                        <span className="mt-2 w-2 h-2 rounded-full bg-blue-600"></span>

                                        <span className="leading-8">

                                            {point}

                                        </span>

                                    </li>

                                ))}

                            </ul>

                        </div>

                    </div>

                ))}

            </div>

        </div>

    );

}

export default Projects;