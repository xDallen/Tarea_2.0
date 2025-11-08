import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPostById } from "../api/blogApi";
import Loader from "../components/Loader";
import ErrorMsg from "../components/ErrorMsg";

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await getPostById(id);
        setPost(res.data);
      } catch (err) {
        setError("No se pudo cargar el post. Inténtalo de nuevo más tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <ErrorMsg message={error} />;
  if (!post) return null;

  return (
    <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <Link to="/posts" className="text-indigo-600 hover:text-indigo-800 font-semibold text-sm">
              &larr; Volver a los posts
            </Link>
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 capitalize mb-4">
            {post.title}
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            {post.body}
          </p>
        </div>
        <div className="bg-gray-50 px-8 py-4">
          <p className="text-sm text-gray-500">
            Publicado en la categoría de <span className="font-medium text-gray-700">General</span>
          </p>
        </div>
      </div>
    </div>
  );
}
