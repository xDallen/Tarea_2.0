import { Link } from "react-router-dom";

export default function PostCard({ post }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out overflow-hidden flex flex-col">
      <div className="p-6 flex-grow">
        <h2 className="text-xl font-bold text-gray-800 truncate capitalize">
          {post.title}
        </h2>
        <p className="text-gray-600 mt-2 mb-4 h-24 text-ellipsis overflow-hidden">
          {post.body}
        </p>
      </div>
      <div className="bg-gray-50 px-6 py-4">
        <Link to={`/post/${post.id}`} className="text-indigo-600 hover:text-indigo-800 font-semibold">
          Leer más &rarr;
        </Link>
      </div>
    </div>
  );
}
