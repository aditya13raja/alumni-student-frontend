import { useEffect, useState } from "react";
import { BlogsCarousel } from "../components/BlogsCarousel";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [blogsList, setBlogsList] = useState([]);

  useEffect(() => {
    const fetchBlogsList = async () => {
      setLoading(true);
      const response = await fetch("/api/blog/latest/blogs");
      const data = await response.json();

      setBlogsList(data);
      setLoading(false);
    };

    fetchBlogsList();
  }, []);

  return (
    <div className="my-5">
      {!loading && blogsList.length > 0 && (
        <BlogsCarousel blogs={blogsList} />
      )}
    </div>
  );
};

export default Home;

