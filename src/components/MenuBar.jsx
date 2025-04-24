import { FaHeading, FaParagraph, FaBold, FaItalic, FaUnderline, FaHighlighter, FaAlignLeft, FaAlignCenter, FaAlignRight, FaAlignJustify, FaListUl, FaListOl, FaPaperPlane } from 'react-icons/fa'

const MenuBar = ({ editor, onSubmit }) => {
    if (!editor) return null

    const baseBtn = "border border-gray-300 px-2 py-1 rounded hover:bg-gray-100 active:bg-gray-200 transition flex items-center gap-1"

    return (
        <div className="sticky max-w-[960px] top-[5rem] left-0 right-0 bg-white shadow z-40 px-4 py-3 border-b flex flex-wrap gap-2 justify-center">
            <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={baseBtn}><FaHeading /> H1</button>
            <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={baseBtn}><FaHeading /> H2</button>
            <button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={baseBtn}><FaHeading /> H3</button>
            <button onClick={() => editor.chain().focus().setParagraph().run()} className={baseBtn}><FaParagraph /> P</button>
            <button onClick={() => editor.chain().focus().toggleBold().run()} className={baseBtn}><FaBold /></button>
            <button onClick={() => editor.chain().focus().toggleItalic().run()} className={baseBtn}><FaItalic /></button>
            <button onClick={() => editor.chain().focus().toggleUnderline().run()} className={baseBtn}><FaUnderline /></button>
            <button onClick={() => editor.chain().focus().toggleHighlight().run()} className={baseBtn}><FaHighlighter /></button>
            <button onClick={() => editor.chain().focus().setTextAlign('left').run()} className={baseBtn}><FaAlignLeft /></button>
            <button onClick={() => editor.chain().focus().setTextAlign('center').run()} className={baseBtn}><FaAlignCenter /></button>
            <button onClick={() => editor.chain().focus().setTextAlign('right').run()} className={baseBtn}><FaAlignRight /></button>
            <button onClick={() => editor.chain().focus().setTextAlign('justify').run()} className={baseBtn}><FaAlignJustify /></button>
            <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={baseBtn}><FaListUl /></button>
            <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className={baseBtn}><FaListOl /></button>
            <button
                onClick={onSubmit}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 active:bg-green-800 transition ml-auto flex items-center gap-2"
            >
                <FaPaperPlane /> Submit
            </button>
        </div>
    )
}

export default MenuBar;
