import React, { useState, useMemo } from "react";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

// Mock data for the performance summaries
const SUMMARY_TEXTS = {
  reviews:
    "Review submissions were characterized by pronounced peaks and valleys. The metric achieved two instances of Excellent performance (Green: > 700), hitting a high of 800 on Tuesday and climbing to a peak of 850 on Friday. This success was bracketed by a sharp drop to the week's lowest point of 200 on Thursday, which fell into the Low category (Red: < 300). The remainder of the week showed steady Medium to Good performance.",
  appointments:
    "The week's appointment volume demonstrated an overall upward trajectory, culminating in Excellent performance (Green: >700) over the long weekend. The count spiked on Friday, reaching a peak of 950. Conversely, the week began with a significant lag, as Monday recorded the lowest volume at 450, placing it squarely in the Low performance bracket (Red: <500). This suggests appointment activity is heavily concentrated toward the latter part of the week.",
  patients:
    "Patient volume showed a pattern of strong opening followed by high volatility. Monday led the entire week with 850 patients, achieving the highest Excellent rating (Green: >700). Activity quickly stabilized into the Medium range (Yellow: 300-500) mid-week, before plunging to a week-low of 150 on Friday, categorized as Low (Red: <300). The week concluded with a solid, Good performance (Purple: 500-700) over the weekend.",
};

const SUMMARY_KEYS = Object.keys(SUMMARY_TEXTS);
const PRIMARY_COLOR = "bg-emerald-600";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Renders a data summary component that cycles through different performance metrics.
 */
export default function GraphSummery() {
  const [currentKeyIndex, setCurrentKeyIndex] = useState(0);
  const [readmore, setReadmore] = useState(false);

  // Get the current key and text based on the index
  const currentSummaryKey = SUMMARY_KEYS[currentKeyIndex];
  const currentSummaryText = SUMMARY_TEXTS[currentSummaryKey];

  // Memoize the truncated summary for the 'read more' functionality
  const shortSummary = useMemo(() => {
    const maxLen = 150;
    if (currentSummaryText.length <= maxLen) return currentSummaryText;
    let short = currentSummaryText.substring(0, maxLen);
    const lastSpace = short.lastIndexOf(" ");
    return lastSpace > 0
      ? short.substring(0, lastSpace) + "..."
      : short + "...";
  }, [currentSummaryText]);

  // Handler to move to the next summary in the cycle
  const handleNextSummery = () => {
    setCurrentKeyIndex((prevIndex) => (prevIndex + 1) % SUMMARY_KEYS.length);
    setReadmore(false); // Reset readmore state when changing summary
  };

  return (
    <div className="p-4 border border-gray-100 rounded-xl w-full bg-white shadow-lg">
      <h3 className="text-xl font-bold text-gray-800 mb-2 capitalize border-b pb-2">
        Data Snapshot: {currentSummaryKey}
      </h3>

      <p className="text-sm text-gray-600 mb-3 leading-relaxed transition-all duration-200 ease-in-out">
        {/* Display full text if readmore is true, otherwise display short summary */}
        {readmore ? currentSummaryText : shortSummary}

        {/* Read More/View Less Toggle */}
        <span
          className="ml-2 font-medium text-sm text-emerald-500 hover:text-emerald-700 cursor-pointer transition-colors flex items-center gap-1 mt-1"
          onClick={() => setReadmore(!readmore)}
          role="button"
        >
          {readmore ? (
            <>
              View Less{" "}
              <ChevronDownIcon className="w-4 h-4 transform rotate-180 transition-all duration-200 ease-in-out" />
            </>
          ) : (
            <>
              Read More{" "}
              <ChevronDownIcon className="w-4 h-4 transition-all duration-200 ease-in-out" />
            </>
          )}
        </span>
      </p>

      {/* Button to cycle to the next summary metric */}
      <button
        onClick={handleNextSummery}
        className={classNames(
          PRIMARY_COLOR,
          "flex items-center justify-center gap-1 px-4 py-2 text-white text-sm font-medium rounded-lg hover:opacity-90 transition-all duration-200 ease-in-out shadow-md hover:shadow-lg active:scale-95"
        )}
      >
        <span>Next Summary</span>
        <ChevronRightIcon className="h-4 w-4" />
      </button>
    </div>
  );
}
