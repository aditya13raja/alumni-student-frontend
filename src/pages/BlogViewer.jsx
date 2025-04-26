import { useEffect, useState } from 'react'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useParams } from 'react-router-dom'

const BlogViewer = () => {
  const [blog, setBlog] = useState(null)
  const { blogId } = useParams()

  const editor = useEditor({
    editable: false,
    extensions: [StarterKit],
    content: '', // empty initially
  })

  useEffect(() => {
    const fetchBlog = async () => {
      const response = await fetch(`/api/blog/${blogId}`)
      const data = await response.json()
      setBlog(data.blog)

      // Update the editor content after blog is fetched
      if (editor && data.blog?.content) {
        editor.commands.setContent(data.blog.content)
      }
    }

    fetchBlog()
  }, [blogId, editor])

  if (!blog) return <div>Loading...</div>

  return (
    <div className="w-full mx-auto p-6 space-y-4">
      <img src={blog.cover_image} alt="cover image" className="w-full rounded object-cover" />
      <h1 className="text-4xl text-blue-900 font-bold">{blog.heading}</h1>
      <p className="text-gray-600">By {blog.username}</p>
      <EditorContent editor={editor} />
    </div>
  )
}

export default BlogViewer

