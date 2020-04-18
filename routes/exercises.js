const express = require("express");
const router = express.Router()

//Importing User Model
const Exercise = require("../models/exercise.model")

/**
 *  GET ROUTES
 */

//get all exercises
router.get("/", (req, res)=>{
    Exercise.find()
        .then(exercises => res.status(200).json(exercises))
        .catch(err => res.status(400).json("Error: " +err))
})

//get a single exercise
router.get("/:id", (req, res)=>{
    Exercise.findById(req.params.id)
        .then(exercise => res.status(200).json(exercise))
        .catch(err => res.status(400).json("Error: "+err));
})

//update an exercise
router.post("/update/:id", (req, res)=>{
    Exercise.findById(req.params.id)
        .then(exercise => {
                exercise.username = req.body.username;
                exercise.description= req.body.description;
                exercise.duration= Number(req.body.duration);
                exercise.date = Date.parse(req.body.date);
                    exercise.save()
                        .then(exercise => res.json("Exercise updated successfully"))
                        .catch(err => res.json("Error: "+err))
        })
        .catch(err => res.json("Error: "+err));
});


/**
 *  POST ROUTES
 */

//add an exercise
router.post("/add", (req, res)=>{
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date)

    const newExercise = new Exercise({
        username,
        description,
        duration,
        date,
    });

    newExercise.save()
        .then(()=> res.status(200).json("Exercise added!"))
        .catch(err => res.status(400).json("Error: "+ err));
})


/**
 *  DELETE REQUEST
 */

//delete an exercise
router.delete("/:id", (req, res)=>{
    Exercise.findByIdAndDelete(req.params.id)
        .then(()=> res.status(200).json("Exercise deleted successfully"))
        .catch((err)=> res.status(400).json("Error: "+err))
})


module.exports = router;

