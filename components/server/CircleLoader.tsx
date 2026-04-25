export default function CircleLoader({ content }: { content: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-4 h-4 rounded-full border-y-2 border-gray-900 animate-spin"></div>
      <p className="text-sm font-semibold text-gray-900">{content}</p>
    </div>
  );
}
