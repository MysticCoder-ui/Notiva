import React,{useContext} from 'react';
import Notecontent from '../context/notes/Notecontent';

export default function NoteItems({ noteId, note, updateNote }) {

    const info = useContext(Notecontent);
    const { deleteNote } = info;

    const handleDelete = () => {
        deleteNote(noteId);
    }

    return (
        <>
            <div className="card border-success mb-3" style={{ maxWidth: "30rem", margin: "20px", padding: "15px" }}>
                <div className="card-header bg-transparent border-success">{note.title}</div>
                <div className="card-body text-success">
                    <p className="card-text">{note.description}</p>
                    <div style={{ "display": "flex", "alignItems": "center", "gap": "50px" }}>
                        <button className="btn btn-primary" onClick={() => updateNote(note)}>Edit</button>
                        <button className="btn btn-primary" onClick={handleDelete}>Delete</button>
                    </div>
                </div>
            </div>

        </>
    );
}
