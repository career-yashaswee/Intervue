import { LibraryBig } from "lucide-react";
import React from "react";

function ChapterCard({ chapter, index }) {
  return (
    <button
      key={index}
      className="flex items-start gap-4 px-3 py-2 text-muted-foreground hover:text-foreground bg-primary"
    >
      <LibraryBig></LibraryBig>
      {chapter.chapterName}
    </button>
  );
}

export default ChapterCard;
