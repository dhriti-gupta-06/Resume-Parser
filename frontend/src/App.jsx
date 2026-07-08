// import { useState } from "react";
// import axios from "axios";

// import UploadSection from "./components/UploadSection";
// import Loader from "./components/Loader";
// import Overview from "./components/Overview";
// import Summary from "./components/Summary";
// import PersonalInfo from "./components/PersonalInfo";
// import Skills from "./components/Skills";
// import Education from "./components/Education";
// import Experience from "./components/Experience";
// import Projects from "./components/Projects";
// import Certifications from "./components/Certifications";
// import Achievements from "./components/Achievements";

// function App() {
//   const [file, setFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [result, setResult] = useState(null);
//   const [showJson, setShowJson] = useState(false);

//   const uploadResume = async () => {
//     if (!file) {
//       alert("Please select a PDF file first.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       setLoading(true);
//       setResult(null);

//       const response = await axios.post(
//         "http://127.0.0.1:8000/upload",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       setResult(response.data);
//     } catch (error) {
//       console.error(error);

//       if (error.response) {
//         alert(error.response.data.detail);
//       } else {
//         alert("Unable to connect to FastAPI backend.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

// return (
//   <div className="min-h-screen bg-slate-100">

//     {/* Header */}

//     <div className="bg-gradient-to-r from-blue-700 to-indigo-700 shadow-lg">
//       <div className="max-w-7xl mx-auto px-8 py-10 text-center">

//         <h1 className="text-5xl font-bold text-white">
//           AI Resume Parser
//         </h1>

//         <p className="text-blue-100 mt-3 text-lg">
//           Upload • Parse • Analyze Resume using IBM Watsonx
//         </p>

//       </div>
//     </div>

//     <div className="max-w-7xl mx-auto px-6 py-10">

//       <UploadSection
//         file={file}
//         setFile={setFile}
//         uploadResume={uploadResume}
//         loading={loading}
//       />

//       {loading && (
//         <div className="mt-10">
//           <Loader />
//         </div>
//       )}

//       {result && (

//         <div className="mt-12 space-y-8">

//           <div className="text-center">

//             <h2 className="text-4xl font-bold text-gray-800">
//               Resume Dashboard
//             </h2>

//             <p className="text-gray-500 mt-2">
//               AI Generated Resume Analysis
//             </p>

//           </div>

//           {/* JSON Buttons */}

//           <div className="flex justify-end gap-4">

//             <button
//               onClick={() => setShowJson(true)}
//               className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-lg font-semibold shadow"
//             >
//               📄 View JSON
//             </button>

//             <button
//               onClick={() => {

//                 const blob = new Blob(
//                   [JSON.stringify(result, null, 4)],
//                   { type: "application/json" }
//                 );

//                 const url = window.URL.createObjectURL(blob);

//                 const a = document.createElement("a");

//                 a.href = url;

//                 a.download =
//                   `${result.personal_information.full_name || "Resume"}.json`;

//                 a.click();

//                 window.URL.revokeObjectURL(url);

//               }}
//               className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg font-semibold shadow"
//             >
//               ⬇ Download JSON
//             </button>

//           </div>

//           <Overview data={result} />

//           <Summary data={result} />

//           <PersonalInfo data={result} />

//           <Skills data={result} />

//           <div className="grid lg:grid-cols-2 gap-8 items-start">

//             <Education data={result} />

//             <Certifications data={result} />

//           </div>

//           <Experience data={result} />

//           <Projects data={result} />

//           <Achievements data={result} />

//         </div>

//       )}

//     </div>

//     {/* JSON Modal */}

//     {showJson && result && (

//       <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">

//         <div className="bg-white rounded-2xl shadow-2xl w-[95%] max-w-6xl h-[90vh] flex flex-col">

//           <div className="flex justify-between items-center p-6 border-b">

//             <h2 className="text-3xl font-bold">

//               Parsed Resume JSON

//             </h2>

//             <button
//               onClick={() => setShowJson(false)}
//               className="text-red-600 text-3xl font-bold hover:scale-110"
//             >
//               ✕
//             </button>

//           </div>

//           <div className="flex-1 overflow-auto p-6 bg-gray-100">

//             <pre className="text-sm whitespace-pre-wrap font-mono">

//               {JSON.stringify(result, null, 4)}

//             </pre>

//           </div>

//           <div className="border-t p-5 flex justify-end gap-4">

//             <button
//               onClick={() => navigator.clipboard.writeText(JSON.stringify(result, null, 4))}
//               className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
//             >
//               📋 Copy JSON
//             </button>

//             <button
//               onClick={() => {

//                 const blob = new Blob(
//                   [JSON.stringify(result, null, 4)],
//                   { type: "application/json" }
//                 );

//                 const url = window.URL.createObjectURL(blob);

//                 const a = document.createElement("a");

//                 a.href = url;

//                 a.download =
//                   `${result.personal_information.full_name || "Resume"}.json`;

//                 a.click();

//                 window.URL.revokeObjectURL(url);

//               }}
//               className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
//             >
//               ⬇ Download JSON
//             </button>

//           </div>

//         </div>

//       </div>

//     )}

//   </div>
// );
// }

// export default App;















import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import ResumeDetails from "./pages/ResumeDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/resume/:id" element={<ResumeDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;