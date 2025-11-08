import { useEffect, useState } from "react";
import { getPosts } from "../api/blogApi";
import PostCard from "../components/PostCard";
import Loader from "../components/Loader";
import ErrorMsg from "../components/ErrorMsg";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        if (Math.random() < 0.2) {
          throw new Error("Falla simulada del servicio");
        }
        const res = await getPosts();
        setPosts(res.data.slice(0, 10));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <Loader />;
  if (error) return <ErrorMsg message={error} />;

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-4">Nuestro Blog</h1>
        <p className="text-lg text-gray-600 text-center mb-12">
          Aquí encontrarás las últimas noticias y artículos de interés.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map(post => <PostCard key={post.id} post={post} />)}
        </div>
      </div>
    </div>
  );
}
