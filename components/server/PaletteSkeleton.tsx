export default function PaletteSkeleton({ count }: { count: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="w-full flex flex-col items-start gap-3">
          <div className="w-full h-full bg-gray-100 rounded-xl skeleton"></div>
          <div className="w-4/5 h-4 rounded-full bg-gray-100 skeleton"></div>
          <div className="w-3/5 h-4 rounded-full bg-gray-100 skeleton"></div>
        </div>
      ))}
    </>
  );
}
