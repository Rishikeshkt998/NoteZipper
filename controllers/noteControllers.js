const Note=require('../models/noteSchema')


const getNotes = async (req, res) => {
  const id=req.params.id
  const notes = await Note.find({ user: id });
  res.json(notes);
}

const getNoteById = async (req, res) => {
 const id=req.params.noteid

  const note = await Note.findById({_id:id});

  if (note) {
    return res.json({success:true,note});
  } else {
    return res.status(404).json({ message: "Note not found" });
  }
}


const CreateNote = async (req, res) => {
  const {id, title, content, category } = req.body;

  if (!title || !content || !category) {
    res.status(400);
    throw new Error("Please Fill all the feilds");
    return;
  } else {
    const note = new Note({ user: id, title, content, category });

    const createdNote = await note.save();

    res.status(201).json(createdNote);
  }
}


const DeleteNote = async (req, res) => {
  const note = await Note.findById(req.params.noteid);
  const userid=req.params.userid
  console.log("id",userid)
  if (note.user.toString() !== userid.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (note) {
    await note.deleteOne();
    res.json({ message: "Note Removed" });
  } else {
    res.status(404);
    throw new Error("Note not Found");
  }
}


const UpdateNote = async (req, res) => {
  const { userid,title, content, category } = req.body;

  const note = await Note.findById(req.params.noteid);

  if (note.user.toString() !== userid.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (note) {
    note.title = title;
    note.content = content;
    note.category = category;

    const updatedNote = await note.save();
    res.json(updatedNote);
  } else {
    res.status(404);
    throw new Error("Note not found");
  }
}

module.exports={ getNoteById, getNotes, CreateNote, DeleteNote, UpdateNote };