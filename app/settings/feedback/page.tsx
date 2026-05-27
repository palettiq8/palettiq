"use client";

import { Button } from "@/components/Button";
import { useAddFeedbackMutation } from "@/libs/features/api/apiSlice";
import { FlashMessage } from "@/utils/utils";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { LuStar } from "react-icons/lu";

export default function page() {
  const [feedback, setFeedback] = useState("");
  const [bug, setBug] = useState("");
  const [feature, setFeature] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const [addFeedback, { isLoading: isFeedbackLoading }] =
    useAddFeedbackMutation();
  const [addBug, { isLoading: isBugLoading }] = useAddFeedbackMutation();
  const [addFeature, { isLoading: isFeatureLoading }] =
    useAddFeedbackMutation();

  const handleFeedbackSubmit = async () => {
    try {
      await addFeedback({
        type: "feedback",
        message: feedback,
        rating,
      }).unwrap();

      setFeedback("");
      setRating(0);
      FlashMessage("success", "Thanks for your feedback! ⭐");
    } catch (err: any) {
      FlashMessage("error", err?.message);
    }
  };

  const handleBugSubmit = async () => {
    try {
      await addBug({
        type: "bug",
        message: bug,
        rating: 0,
      }).unwrap();

      setBug("");
      FlashMessage(
        "success",
        "Bug reported successfully! 🐞 We'll fix it ASAP.",
      );
    } catch (err: any) {
      FlashMessage("error", err?.message);
    }
  };

  const handleFeatureSubmit = async () => {
    try {
      await addFeature({
        type: "feature",
        message: feature,
        rating: 0,
      }).unwrap();

      setFeature("");
      FlashMessage("success", "Feature request sent! 💡 Thanks for your idea.");
    } catch (err: any) {
      FlashMessage("error", err?.message);
    }
  };

  return (
    <div className="w-full">
      <h1 className="text-2xl font-semibold text-gray-900">Feedback</h1>
      <p className="text-sm font-medium text-gray-500 mt-2">
        Share your thoughts, report issues, or suggest improvements to help make
        Palettiq better.
      </p>
      <div className="w-full mt-8 rounded-xl">
        <div className="flex items-center justify-between w-full">
          <h3 className="text-lg max-sm:text-base font-semibold text-gray-900">
            Feedback
          </h3>
          <div className="flex items-center gap-3 max-sm:flex-col-reverse max-sm:items-end">
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => {
                const isFilled = star <= (hover || rating);

                return (
                  <span
                    key={star}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                    className="cursor-pointer transition"
                  >
                    {isFilled ? (
                      <FaStar className="text-orange-500 size-5 max-sm:size-4" />
                    ) : (
                      <LuStar className="text-orange-500 size-5 max-sm:size-4" />
                    )}
                  </span>
                );
              })}
            </div>
            <Button
              onClick={handleFeedbackSubmit}
              disabled={!feedback}
              variant={"primary"}
              size={"md"}
            >
              {isFeedbackLoading ? (
                "Sending..."
              ) : (
                <>
                  {rating !== 0
                    ? `Send Feedback with ${rating} ${rating === 1 ? "star" : "stars"}`
                    : "Send feedback"}
                </>
              )}
            </Button>
          </div>
        </div>
        <textarea
          name="bug"
          className="w-full h-50 p-4 rounded-lg border-2 border-gray-200 focus:border-indigo-500 outline-none mt-3 text-sm font-semibold text-gray-900 caret-gray-500 resize-none"
          placeholder="Tell us what you love about Palettiq or how we can make it even better..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />
        <div className="flex items-center justify-between w-full mt-3">
          <h3 className="text-lg max-sm:text-base font-semibold text-gray-900">
            Report a bug/issue
          </h3>
          <Button
            onClick={handleBugSubmit}
            disabled={!bug}
            variant={"primary"}
            size={"md"}
          >
            {isBugLoading ? "Sending..." : "Send Report"}
          </Button>
        </div>
        <textarea
          name="bug"
          className="w-full h-50 p-4 rounded-lg border-2 border-gray-200 focus:border-indigo-500 outline-none mt-3 text-sm font-semibold text-gray-900 caret-gray-500 resize-none"
          placeholder="Describe the bug, what you expected, and what actually happened..."
          value={bug}
          onChange={(e) => setBug(e.target.value)}
        />
        <div className="flex items-center justify-between w-full mt-3">
          <h3 className="text-lg max-sm:text-base font-semibold text-gray-900">
            Request a feature
          </h3>
          <Button
            onClick={handleFeatureSubmit}
            disabled={!feature}
            variant={"primary"}
            size={"md"}
          >
            {isFeatureLoading ? "Sending..." : "Send Request"}
          </Button>
        </div>
        <textarea
          name="bug"
          className="w-full h-50 p-4 rounded-lg border-2 border-gray-200 focus:border-indigo-500 outline-none mt-3 text-sm font-semibold text-gray-900 caret-gray-500 resize-none"
          placeholder="Describe the feature you'd like to see, how it should work, and why it would be useful..."
          value={feature}
          onChange={(e) => setFeature(e.target.value)}
        />
      </div>
    </div>
  );
}
