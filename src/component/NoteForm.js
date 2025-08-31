import React, { useContext, useState, useEffect, useRef } from 'react'
import Notecontent from '../context/notes/Notecontent';
import NoteItems from './NoteItems'

function NoteForm() {
    const ref = useRef();
    const info = useContext(Notecontent);
    const { notes, addNote, showNote, editNote } = info;

    const [Note, setNote] = useState({ title: "", description: "" });
    const [editnote, seteditnote] = useState({ _id:"",title: "", description: "" });


    useEffect(() => {
        showNote();
        // eslint-disable-next-line
    }, [])


    const handleEdit = ()=>{
       editNote(editnote._id,editnote.title,editnote.description);
    }

    const updateNote = (currentNote) => {
        ref.current.click();
        seteditnote({
            _id: currentNote._id,
            title: currentNote.title,
            description: currentNote.description
        });
    }

        const handleNote = () => {
            addNote(Note.title, Note.description);
            setNote({ title: "", description: "" });
        }

        const onChange = (e) => {
            e.preventDefault();
            setNote(Note => ({ ...Note, [e.target.name]: e.target.value }))
        }

        const onChangee = (e) => {
            e.preventDefault();
            seteditnote(Note => ({ ...Note, [e.target.name]: e.target.value }))
        }
        
        return (
            <>
                <div className='container my-3'>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name="title" value={Note.title} placeholder="Enter Title" onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name="description" value={Note.description} placeholder="Enter Description" onChange={onChange} />
                    </div>
                    <button type="button" className="btn btn-success" id="addbtn" onClick={handleNote}>Add Note</button>

                    <div className='main-box' style={{ "width": "100%", "display": "flex", "alignItems": "center", "justifyContent": "center", "flexWrap": "wrap" }}>
                        {Array.isArray(notes) && notes.map((note) => {
                            return <NoteItems key={note._id}  noteId={note._id} note={note} updateNote={updateNote}/>
                        })}
                    </div>
                </div>


                <button
                    ref={ref}
                    type="button"
                    className="btn btn-primary d-none"
                    data-bs-toggle="modal"
                    data-bs-target="#editModal"
                >
                    Launch modal
                </button>

                {/* Modal */}
                <div className="modal fade" id="editModal" tabIndex={-1} aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit Note</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <input
                                    type="text"
                                    name="title"
                                    className="form-control mb-3"
                                    value={editnote.title}
                                    onChange={onChangee}
                                    placeholder="Title"
                                />
                                <textarea
                                    name="description"
                                    className="form-control"
                                    value={editnote.description}
                                    onChange={onChangee}
                                    placeholder="Description"
                                ></textarea>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" onClick={handleEdit}>Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    export default NoteForm
