import React, { useState } from 'react';
import Notecontent from "./Notecontent";

const Notestate = (props) => {

    // Hardcoded initial notes
    const initialNotes = [];

    const [notes, setNotes] = useState(initialNotes);

    // Show all notes
    const showNote = async () => {
        try {
            const response = await fetch("http://localhost:5000/note/fetchallNotes", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjhhZDcwNjU0N2RiMTJiZDJkMTJhN2M0In0sImlhdCI6MTc1NjE5Njk2NX0.-dquiy9oNuq9uOBevke59ydgyl_5g7QN8dGkNJg6gu8",
                },
            });


            if (!response.ok) {
                throw new Error("Failed to show note");
            }

            const data = await response.json();

            setNotes(data);
        } catch (error) {
            console.log(error);
            alert("Problem in show note");
        }

    };

    // Add a note (frontend only)
    const addNote = async (title, description) => {
        try {
            const response = await fetch("http://localhost:5000/note/addNote", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjhhZDcwNjU0N2RiMTJiZDJkMTJhN2M0In0sImlhdCI6MTc1NjE5Njk2NX0.-dquiy9oNuq9uOBevke59ydgyl_5g7QN8dGkNJg6gu8",
                },
                body: JSON.stringify({ title, description }),
            });

            if (!response.ok) {
                throw new Error("Failed to add note");
            }

            const newNote = await response.json();

            setNotes([...notes, newNote]);
        } catch (error) {
            console.log(error);
            alert("Problem in adding note");
        }
    };

    // Delete a note (frontend only)
    const deleteNote = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/note/deleteNote/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjhhZDcwNjU0N2RiMTJiZDJkMTJhN2M0In0sImlhdCI6MTc1NjE5Njk2NX0.-dquiy9oNuq9uOBevke59ydgyl_5g7QN8dGkNJg6gu8",
                },
            });


            if (!response.ok) {
                throw new Error("Failed to delete note");
            }

            await response.json();

            setNotes(notes.filter(note => note._id !== id));
        } catch (error) {
            console.log(error);
            alert("Problem in deleting note");
        }
    };

    // Edit a note (frontend only)
    const editNote = async (id, newtitle, newdescription) => {
        try {
            const response = await fetch(`http://localhost:5000/note/updateNote/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjhhZDcwNjU0N2RiMTJiZDJkMTJhN2M0In0sImlhdCI6MTc1NjE5Njk2NX0.-dquiy9oNuq9uOBevke59ydgyl_5g7QN8dGkNJg6gu8",
                },
                body: JSON.stringify({ title:newtitle, description:newdescription }),
            });

             if (!response.ok) {
                throw new Error("Failed to edit note");
            }

            const updateNote = await response.json();

            setNotes(notes.map(note =>
                note._id === id ? updateNote : note
            ));

        } catch (error) {
            console.log(error);
            alert("Cannot edit note");
        }
    };

    return (
        <Notecontent.Provider value={{
            notes,
            addNote,
            deleteNote,
            editNote,
            showNote
        }}>
            {props.children}
        </Notecontent.Provider>
    );
};

export default Notestate;
