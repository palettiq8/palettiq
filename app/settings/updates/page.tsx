"use client";

import { Button } from "@/components/Button";
import ButtonLoader from "@/components/server/ButtonLoader";
import { useAddProductUpdateEmailMutation } from "@/libs/features/api/apiSlice";
import { FlashMessage, isValidEmail } from "@/utils/utils";
import { useState } from "react";

export default function page() {
  const [email, setEmail] = useState("");
  const [addProductUpdateEmail, { isLoading }] =
    useAddProductUpdateEmailMutation();
  return (
    <div className="w-full">
      <h1 className="text-2xl font-semibold text-gray-900">Updates</h1>
      <p className="text-sm font-semibold text-gray-500 mt-2">
        Manage how you receive product updates, new features, and important
        announcements.
      </p>
      <div className="w-full mt-8 border border-gray-200 rounded-xl p-4">
        <h3 className="text-lg font-semibold text-gray-900">Product updates</h3>
        <input
          type="email"
          className="w-full h-13 px-4 rounded-lg border-2 border-gray-200 focus:border-indigo-500 outline-none mt-3 text-sm font-semibold text-gray-900 caret-gray-500"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p className="text-sm font-semibold text-gray-500 mt-3">
          Stay in the loop with everything new on our platform. By subscribing
          with your email, you’ll receive timely updates whenever we launch new
          features, improvements, or enhancements. No need to keep checking
          manually—we’ll notify you directly so you never miss out on what’s
          new.
        </p>
        <div className="w-full flex items-center justify-end mt-5">
          <Button
            variant={"primary"}
            size={"md"}
            disabled={!(email && isValidEmail(email))}
            className="bg-indigo-500 hover:bg-indigo-600"
            onClick={async () => {
              try {
                await addProductUpdateEmail({
                  email,
                }).unwrap();
                setEmail("");
                FlashMessage(
                  "success",
                  "You’ve successfully subscribed to product updates!",
                );
              } catch (err: any) {
                FlashMessage("error", err?.message);
              }
            }}
          >
            {isLoading && <ButtonLoader />}
            <span>Keep Me Updated</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
