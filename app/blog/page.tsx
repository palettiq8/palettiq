import CommonHeaderFooterSection from "@/components/server/CommonHeaderFooterSection";
import { blogs } from "@/utils/Items";
import Link from "next/link";
import { LuFileText } from "react-icons/lu";

export default function page() {
  const categories = Array.from(new Set(blogs.map((b) => b.category)));
  return (
    <CommonHeaderFooterSection>
      <div className="w-full h-max max-w-350 mx-auto py-20 max-xl:px-4 max-sm:py-10">
        <span className="text-sm max-sm:text-xs font-bold text-indigo-500 bg-indigo-50 border border-indigo-200 rounded-full px-3.5 py-1.5 w-max mx-auto block">
          PalettIQ Journal
        </span>
        <h1 className="text-5xl font-bold text-gray-900 mt-8 text-center">
          Blog Articles
        </h1>
        <p className="mt-4 text-gray-600 font-semibold text-md text-center max-w-3xl mx-auto">
          Guides, tutorials, and case studies on color theory, accessibility,
          and design — written for people who actually build things. From WCAG
          contrast math to real palettes behind SaaS landing pages, this is
          where we break down the decisions behind good color, one post at a
          time.
        </p>
        <div className="w-full mt-20">
          {categories.map((category) => {
            const posts = blogs.filter((b) => b.category === category);

            return (
              <section key={category} className="mt-12">
                <div className="flex items-center gap-3 mb-6">
                  <h2 className="text-base font-semibold text-gray-900 whitespace-nowrap">
                    {category}
                  </h2>
                  <span className="h-px flex-1 bg-gray-200" />
                  <span className="text-sm font-medium text-gray-900">
                    {posts.length} {posts.length === 1 ? "post" : "posts"}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-1">
                  {posts.map((post) => (
                    <Link
                      key={post.id}
                      href={post.url ?? "#"}
                      className="bg-white border border-gray-200 rounded-xl transition-colors p-4"
                    >
                      <div className="w-full grid place-content-center h-50 rounded-lg bg-radial-[at_25%_25%] from-indigo-200 to-indigo-600 to-75%">
                        <LuFileText size={70} className="text-indigo-300" />
                      </div>
                      <div className="w-full flex items-center justify-between mt-3">
                        <span className="text-xs font-medium text-gray-500">
                          {post?.author}
                        </span>
                        <span className="text-xs font-medium text-gray-500">
                          {post.date}
                        </span>
                      </div>
                      <h3 className="font-semibold text-base mt-2">
                        {post.title}
                      </h3>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </CommonHeaderFooterSection>
  );
}
