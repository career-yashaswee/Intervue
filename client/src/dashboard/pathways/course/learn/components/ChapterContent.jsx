import React from "react";
import YouTube from "react-youtube";
import { FaPlay, FaCode, FaInfoCircle } from "react-icons/fa"; // Import icons
import Markdown from "react-markdown";

const opts = {
  height: "390",
  width: "640",
  playerVars: {
    autoplay: 0,
  },
};

function ChapterContent({ chapter, content }) {
  return (
    <div className="p-4">
      {/* Chapter Header */}
      <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-gray-200 pb-2 flex items-center">
        <FaInfoCircle className="text-blue-500 mr-2" /> {chapter?.chapterName}
      </h2>
      <p className="text-gray-600 leading-relaxed text-lg">{chapter?.about}</p>

      {/* YouTube Video */}
      <div className="flex justify-center my-6">
        <YouTube videoId={content?.videoId} opts={opts} />
      </div>

      {/* Content Cards */}
      <div className="space-y-6">
        {content?.content?.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-sm rounded-lg p-4 border border-gray-100 transition transform hover:-translate-y-1 hover:shadow-md"
          >
            {/* Title */}
            <div className="flex items-center mb-3">
              <FaPlay className="text-green-500 mr-2" />
              <h2 className="text-xl font-semibold text-slate-950">
                {item?.title}
              </h2>
            </div>

            {/* Description */}
            <p className="text-gray-700 mb-4 whitespace-pre-wrap">
              {item?.description}
            </p>

            {/* Code Snippet */}
            {item?.code && (
              <div className="bg-gray-900 text-white rounded-lg p-4 overflow-x-auto">
                <div className="flex items-center mb-2">
                  <FaCode className="text-yellow-500 mr-2" />
                  <span className="text-sm font-medium">Code Example</span>
                </div>{" "}
                <code>{item?.code}</code>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChapterContent;
