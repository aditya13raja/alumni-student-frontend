import { useEffect, useState } from 'react'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextStyle from '@tiptap/extension-text-style'
import Heading from '@tiptap/extension-heading'
import ListItem from '@tiptap/extension-list-item'
import BulletList from '@tiptap/extension-bullet-list'
import OrderedList from '@tiptap/extension-ordered-list'
import Underline from '@tiptap/extension-underline'
import Alignment from '@tiptap/extension-text-align'
import Highlight from '@tiptap/extension-highlight';
import { useParams } from 'react-router-dom'

const BlogViewer = () => {
    const [blog, setBlog] = useState(null)
    const { blogId } = useParams()

    const editor = useEditor({
        editable: false,
        extensions: [
            StarterKit,
            TextStyle,
            Heading,
            BulletList,
            OrderedList,
            ListItem,
            Underline,
            Alignment,
            Highlight,
        ],
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
        <div className="w-full mx-auto mt-5 pb-16 space-y-4 px-4">
            <img src={blog.cover_image} alt="cover image" className="w-full rounded object-cover" />
            <h1 className="text-4xl text-blue-900 font-bold">{blog.heading}</h1>
            <p className="text-blue-900">By {blog.username}</p>
            <hr className="my-8 border-gray-300" />
            <EditorContent
                editor={editor}
                className="[&_.ProseMirror]:text-[1.2rem] [&_.ProseMirror]:leading-7"
            />

        </div>
    )
}

export default BlogViewer

