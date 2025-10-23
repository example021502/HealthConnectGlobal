import React, { useState, useMemo, memo } from "react";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

const SUMMARY_TEXTS = {
  reviews:
    "Review submissions were characterized by pronounced peaks and valleys. The metric achieved two instances of Excellent performance (Green: > 700), hitting a high of 800 on Tuesday and climbing to a peak of 850 on Friday. This success was bracketed by a sharp drop to the week's lowest point of 200 on Thursday, which fell into the Low category (Red: < 300). The remainder of the week showed steady Medium to Good performance.",
  appointments:
    "The week's appointment volume demonstrated an overall upward trajectory, culminating in Excellent performance (Green: >700) over the long weekend. The count spiked on Friday, reaching a peak of 950. Conversely, the week began with a significant lag, as Monday recorded the lowest volume at 450, placing it squarely in the Low performance bracket (Red: <500). This suggests appointment activity is heavily concentrated toward the latter part of the week.",
  patients:
    "Patient volume showed a pattern of strong opening followed by high volatility. Monday led the entire week with 850 patients, achieving the highest Excellent rating (Green: >700). Activity quickly stabilized into the Medium range (Yellow: 300-500) mid-week, before plunging to a week-low of 150 on Friday, categorized as Low (Red: <300). The week concluded with a solid, Good performance (Purple: 500-700) over the weekend.",
};

const SUMMARY_KEYS = Object.keys(SUMMARY_TEXTS);

function GraphSummery() {
  const [currentKeyIndex, setCurrentKeyIndex] = useState(0);
  const [readmore, setReadmore] = useState(false);

  const currentSummaryKey = SUMMARY_KEYS[currentKeyIndex];
  const currentSummaryText = SUMMARY_TEXTS[currentSummaryKey];

  const shortSummary = currentSummaryText.substring(0, 150) + "...";

  const handleNextSummery = () => {
    setCurrentKeyIndex((prevIndex) => (prevIndex + 1) % SUMMARY_KEYS.length);
    setReadmore(false);
  };

  return (
    <div className="p-4 border border-gray-200 rounded-lg w-full bg-white shadow-sm">
      <h3 className="text-md font-semibold text-gray-700 mb-2 capitalize">
        Summary: {currentSummaryKey}
      </h3>

      <p className="text-sm text-gray-600 mb-3 leading-relaxed transition-all duration-200 ease-in-out">
        {readmore ? currentSummaryText : shortSummary}

        <span
          className="ml-2 font-lighter text-sm text-blue-400 hover:text-blue-800 cursor-pointer transition-colors flex items-center gap-1"
          onClick={() => setReadmore(!readmore)}
          role="button"
        >
          {readmore ? (
            <>
              View Less{" "}
              <ChevronDownIcon className="w-3 h-3 transform rotate-180 transition-all duration-200 ease-in-out" />
            </>
          ) : (
            <>
              Read More{" "}
              <ChevronDownIcon className="w-3 h-3 transition-all duration-200 ease-in-out" />
            </>
          )}
        </span>
      </p>

      <button
        onClick={handleNextSummery}
        className="flex itemes-center justify-center items-center gap-1 px-3 py-1 bg-[rgba(37,73,43,0.8)] text-white text-xs font-lighter rounded hover:bg-[rgba(37,73,43,1)] transition-all duration-200 ease-in-out"
      >
        <span>Next</span>
        <ChevronRightIcon className="h-4 w-4" />
      </button>
    </div>
  );
}

export default GraphSummery;
