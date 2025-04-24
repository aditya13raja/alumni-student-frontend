import { useEffect, useState } from 'react'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

const BlogViewer = ({ blogId }) => {
    const [blog, setBlog] = useState(null)

    useEffect(()  => {
        const fetchBlog = async () => {
            const response = await fetch(`/api/blog/${blogId}`)
            const data = await response.json();
            setBlog(data);
        };
        fetchBlog();
    }, [blogId])

    const editor = useEditor(
        blog 
            ? {
                editable: false,
                extensions: [StarterKit],
                content: blog?.content,
            } 
            : null
    )

    if (!blog) return <div>Loading...</div>

    return (
        <div className="max-w-3xl mx-auto p-6 space-y-4">
            <img src={blog.cover_image} alt="cover" className="w-full rounded" />
            <h1 className="text-3xl font-bold">{blog.heading}</h1>
            <p className="text-gray-600">By {blog.username}</p>
            <EditorContent editor={editor} />
        </div>
    )
};

export default BlogViewer;
