import {
    Heading1,
    Heading2,
    Heading3,
    Pilcrow,
    Bold,
    Italic,
    Underline,
    Highlighter,
    AlignLeft,
    AlignCenter,
    AlignRight,
    AlignJustify,
    List,
    ListOrdered,
    Send
} from 'lucide-react';

const MenuBar = ({ editor, onSubmit }) => {
    if (!editor) return null;

    const baseBtn =
        "border border-gray-300 px-2 py-1 rounded hover:bg-gray-300 transition-colors duration-150 flex items-center gap-1";

    const isActive = (name, attrs = {}) => editor.isActive(name, attrs);

    return (
        <div className="sticky max-w-[960px] top-[5rem] left-0 right-0 bg-blue-50 rounded-lg shadow-lg z-40 px-4 py-3 flex flex-wrap gap-2 justify-center">
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={`${baseBtn} ${isActive('heading', { level: 1 }) ? 'bg-gray-300' : ''}`}
            >
                <Heading1 />
            </button>

            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={`${baseBtn} ${isActive('heading', { level: 2 }) ? 'bg-gray-300' : ''}`}
            >
                <Heading2 />
            </button>

            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                className={`${baseBtn} ${isActive('heading', { level: 3 }) ? 'bg-gray-300' : ''}`}
            >
                <Heading3 />
            </button>

            <button
                onClick={() => editor.chain().focus().setParagraph().run()}
                className={`${baseBtn} ${isActive('paragraph') ? 'bg-gray-300' : ''}`}
            >
                <Pilcrow />
            </button>

            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={`${baseBtn} ${isActive('bold') ? 'bg-gray-300' : ''}`}
            >
                <Bold />
            </button>

            <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={`${baseBtn} ${isActive('italic') ? 'bg-gray-300' : ''}`}
            >
                <Italic />
            </button>

            <button
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                className={`${baseBtn} ${isActive('underline') ? 'bg-gray-300' : ''}`}
            >
                <Underline />
            </button>

            <button
                onClick={() => editor.chain().focus().toggleHighlight().run()}
                className={`${baseBtn} ${isActive('highlight') ? 'bg-violet-200' : ''}`}
            >
                <Highlighter />
            </button>

            <button
                onClick={() => editor.chain().focus().setTextAlign('left').run()}
                className={`${baseBtn} ${isActive({ textAlign: 'left' }) ? 'bg-gray-300' : ''}`}
            >
                <AlignLeft />
            </button>

            <button
                onClick={() => editor.chain().focus().setTextAlign('center').run()}
                className={`${baseBtn} ${isActive({ textAlign: 'center' }) ? 'bg-gray-300' : ''}`}
            >
                <AlignCenter />
            </button>

            <button
                onClick={() => editor.chain().focus().setTextAlign('right').run()}
                className={`${baseBtn} ${isActive({ textAlign: 'right' }) ? 'bg-gray-300' : ''}`}
            >
                <AlignRight />
            </button>

            <button
                onClick={() => editor.chain().focus().setTextAlign('justify').run()}
                className={`${baseBtn} ${isActive({ textAlign: 'justify' }) ? 'bg-gray-300' : ''}`}
            >
                <AlignJustify />
            </button>

            <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`${baseBtn} ${isActive('bulletList') ? 'bg-gray-300' : ''}`}
            >
                <List />
            </button>

            <button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={`${baseBtn} ${isActive('orderedList') ? 'bg-gray-300' : ''}`}
            >
                <ListOrdered />
            </button>

            <button
                onClick={onSubmit}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 active:bg-green-800 transition ml-auto flex items-center gap-2"
            >
                <Send /> Submit
            </button>
        </div>
    );
};

export default MenuBar;

