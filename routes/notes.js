import  express from 'express';
import fetchUser from '../middleware/fetchUser.js';
import Notes from '../models/Notes.js';
const router = express.Router();


router.get("/fetchallnotes",  fetchUser, async (req, res) => {
        try {
            const notes = await Notes.find({user : req.userId})
            res.json(notes)
        } catch (error) {
            console.log(error)
            res.status(500).send("Internal server error")
        }
})

router.get("/fetchallblogs", async (req, res) => {
    try {
        const notes = await Notes.find()
        res.json(notes)
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal server error")
    }
})

router.post("/addnote", fetchUser, async (req, res) => {
    try {
        const {image , name, relatedtopic , blogcontent} = req.body
        if(!image || !name || !relatedtopic || !blogcontent){
            return res.status(400).json({error : "All fields are required"})
        }

        const notes = new Notes({image , name, relatedtopic , blogcontent , user : req.userId })
        const savedNotes = await notes.save();
        res.json(savedNotes)
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal server error")
    }
})

router.put("/updatenote/:id", fetchUser, async (req, res) => {
    const { image , name, relatedtopic , blogcontent } = req.body;
    const {id} = req.params;

    try {
        const note = await Notes.findById({_id : id})

        if(!note){
            return res.status(404).send("Not Allowed")
        }

        if(note.user.toString() !== req.userId){
            return res.status(401).send("Not allowed");
        }

        const notes = await Notes.findByIdAndUpdate({_id : id}, {
            $set : {
                image , name, relatedtopic , blogcontent
            }
        }, {new : true})
        res.json({notes, success : "Notes Updated successfully"})
    } catch (error) {
        console.log(error)
    }
} )

router.delete("/deletenote/:id", fetchUser, async (req, res) => {
    try {
        let note = await Notes.findById(req.params.id);
        if(!note) {return res.status(404).send("Not found")};

        if(note.user.toString() !== req.userId){
            return res.status(401).send("Not allowed")
        }

        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({success : "Note has been deleted"})

    } catch (error) {
        console.log(error)
        res.status(500).send("Internaml Server Error")
    }
})

router.get("/notes/:id", fetchUser , async (req, res) => {
    try {
        const {id} = req.params;

        const notes = await Notes.findById({_id : id});

        if(notes){
            return res.status(200).json(notes);
        }else{
            return res.status(404).json({success : "notes not found"})
        }
    } catch (error) {
        
    }
})

export default router