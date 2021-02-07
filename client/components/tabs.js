import Link from 'next/link';

export default function Tabs({ pages, activeIndex, ...props }) {
  return (
    <div className="flex flex-col sm:flex-row mt-2">
      <div className="w-5 border-b border-gray-300" />
      {pages.map((page, i) => (
        <div key={i} className={`font-bold text-xl uppercase text-center py-5 w-full border-gray-300 rounded-t-lg ${i == activeIndex ? "border-t border-l border-r" : "border-b"}`}>{page.title}</div>
      ))}
      <div className="w-5 border-b border-gray-300" />
    </div>
  )
}