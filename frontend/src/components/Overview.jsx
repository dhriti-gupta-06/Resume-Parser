import {
    User,
    Briefcase,
    GraduationCap,
    FolderGit2,
    Award,
    Wrench
} from "lucide-react";

function Overview({ data }) {

    const totalSkills =
        Object.values(data.technical_skills)
            .flat()
            .length;

    return (

        <div className="grid lg:grid-cols-6 md:grid-cols-3 grid-cols-2 gap-5">

            <Card
                icon={<User size={30} />}
                title="Name"
                value={data.personal_information.full_name}
            />

            <Card
                icon={<Briefcase size={30} />}
                title="Experience"
                value={data.professional_experience.length}
            />

            <Card
                icon={<FolderGit2 size={30} />}
                title="Projects"
                value={data.projects.length}
            />

            <Card
                icon={<GraduationCap size={30} />}
                title="Education"
                value={data.education.length}
            />

            <Card
                icon={<Award size={30} />}
                title="Certificates"
                value={data.certifications.length}
            />

            <Card
                icon={<Wrench size={30} />}
                title="Skills"
                value={totalSkills}
            />

        </div>

    );

}

function Card({ icon, title, value }) {

    return (

        <div className="bg-white rounded-xl shadow p-6 text-center">

            <div className="flex justify-center text-blue-600">

                {icon}

            </div>

            <h3 className="mt-3 text-gray-500">

                {title}

            </h3>

            <p className="mt-2 text-xl font-bold">

                {value}

            </p>

        </div>

    );

}

export default Overview;