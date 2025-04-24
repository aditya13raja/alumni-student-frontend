import { useState } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import Highlight from '@tiptap/extension-highlight'
import Underline from '@tiptap/extension-underline'
import BulletList from '@tiptap/extension-bullet-list'
import OrderedList from '@tiptap/extension-ordered-list'
import Heading from '@tiptap/extension-heading'
import Paragraph from '@tiptap/extension-paragraph'
import { useSelector } from 'react-redux'
import MenuBar from '../components/MenuBar'
import { useNavigate } from 'react-router-dom'



const BlogEditor = () => {
    const [heading, setHeading] = useState('')
    const [coverImage, setCoverImage] = useState('')
    const currentUser = useSelector((state) => state.user.currentUser)
    const username = currentUser?.username;

    const navigate = useNavigate();

    const boxStyle = "tiptap w-full border border-blue-100 p-4 shadow-lg rounded-md mt-6 bg-white";

    const editor = useEditor({
        extensions: [
            StarterKit.configure({ heading: true, paragraph: false }),
            Heading.configure({ levels: [1, 2, 3] }),
            Paragraph,
            Highlight,
            Underline,
            BulletList,
            OrderedList,
            TextAlign.configure({ types: ['heading', 'paragraph'] })
        ],
        content: '<p>Start writing your blog...</p>',
    })

    const handleSubmit = async () => {
        console.log("button clicked")
        const content = editor?.getJSON()
        const resposne = await fetch('/api/blog/save-blog', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ heading, username, cover_image: coverImage, content })
        })
        const data = await resposne.json()
        navigate(`/blogs/${data.id}`)
        console.log(data)
    }


    return (
        <div className="pt-[8rem] max-w-4xl mx-auto px-4">
            <div className="mb-4 space-y-2">
                <input
                    type="text"
                    placeholder="Blog Heading"
                    value={heading}
                    onChange={(e) => setHeading(e.target.value)}
                    className={boxStyle}
                />
                <input
                    type="text"
                    placeholder="Cover Image URL"
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                    className={boxStyle}
                />
            </div>

            <MenuBar editor={editor} onSubmit={handleSubmit} />

            <div className={boxStyle}>
                <EditorContent editor={editor} />
            </div>
        </div>
    )
}

export default BlogEditor

