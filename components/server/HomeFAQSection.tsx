import { homeFAQQuestions } from "@/utils/Items";
import Accordion from "../client/Accordion";
import { Button } from "../Button";
import Link from "next/link";

export default function HomeFAQSection() {
  return (
    <section className="mt-12">
      <h2 className="text-3xl font-bold text-center text-gray-900">
        Frequently Asked Questions
      </h2>
      <div className="max-w-350 mx-auto">
        <Accordion accordionData={homeFAQQuestions} />
        <div className="w-full flex items-center justify-center mt-12">
          <Link href={"/help-center"}>
            <Button variant={"outline"} size={"md"}>
              See All FAQs →
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
