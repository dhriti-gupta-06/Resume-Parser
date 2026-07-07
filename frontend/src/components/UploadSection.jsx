function UploadSection({
  file,
  setFile,
  uploadResume,
  loading
}) {
  return (
    <div className="bg-white shadow-xl rounded-2xl p-8">

      <h1 className="text-4xl font-bold text-center text-blue-600">
        AI Resume Parser
      </h1>

      <p className="text-center text-gray-500 mt-3">
        Upload your resume to extract structured information.
      </p>

      <div className="mt-8">

        <input
          type="file"
          accept=".pdf"
          className="w-full border rounded-lg p-2"
          onChange={(e) => setFile(e.target.files[0])}
        />

      </div>

      {file && (

        <div className="mt-4">

          <p className="text-green-600 font-semibold">
            Selected File
          </p>

          <p>{file.name}</p>

        </div>

      )}

      <button
        onClick={uploadResume}
        disabled={loading}
        className="w-full mt-6 bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
      >
        {loading ? "Uploading..." : "Upload Resume"}
      </button>

    </div>
  );
}

export default UploadSection;