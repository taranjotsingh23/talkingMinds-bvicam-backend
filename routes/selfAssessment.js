const router = require("express").Router();
const User = require("../model/User");
const SelfAssessment = require("../model/SelfAssessment");

router.post("/selfassessment", async (req, res) => {
    var userId= req.body.userId;
    var symptom= req.body.symptom;
    var live= req.body.live;
    var exercise= req.body.exercise;
    var smoke= req.body.smoke;
    var scale= req.body.scale;

    //Create a new user
    const user = new SelfAssessment({
      userId: userId,
      symptom: symptom,
      live: live,
      exercise: exercise,
      smoke: smoke,
      scale: scale
    });

    var savedUser = await user.save();

    var score=0;
    if(symptom == "Depressed Mood" || symptom == "Excessive Worry" || symptom == "Sleep Pattern Disturbance" || symptom == "Increased Irritability" || symptom == "Attention Deficiency")
    {
        score=score+20;
    }
    if(live=="Yes")
    {
        score=score+20;
    }
    if(exercise=="No")
    {
        score=score+20;
    }
    if(smoke=="Yes")
    {
        score=score+20;
    }

    if(scale>=5)
    {
        score=score+20;
    }
    else
    {
        score=score+10;
    }

    var msg;
    var link;

    if(score==80 || score==90 || score==100)
    {
        msg="We're here for you. Please Contact Us for a Free Consultation session with our Expert";
        link="helpline"
    }
    else if(score==50 || score==60 || score==70)
    {
        msg="Join Our Discord Community. We'll meet you there. We're waiting!!";
        link="discord"
    }
    else
    {
        msg="Join Our Music Therapy with Spotify and Vent it out!!";
        link="spotify"
    }

    res.status(200).send({ resCode: 200, message: msg, link: link, score: score });
});


module.exports = router;