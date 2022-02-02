// This is a PCIbex implementation of the English phoneme categorization task from Lab 1 in Colin Phillips' Psycholinguistics I class at the University of Maryland. The The original lab is available at http://www.colinphillips.net/teaching/4237-2/3154-2/
// We ask that if you use this code, you please credit Colin Phillips' 
// Psycholinguistics class, at the University of Maryland. See: www.colinphillips.net

// The Russian stimuli were created for
// Kazanina, Phillips & Idsardi. (2006). The influence of meaning on the perception of speech sounds. PNAS. 103(30), 11381-11386.
// If you use the Russian stimuli, please cite Kazanina et al (2006).

PennController.ResetPrefix(null) // Shorten command names (keep this)
PennController.DebugOff()

// Resources are hosted as ZIP files on a distant server

Sequence("instructions","modelD","modelT",
            randomize("main.trial") ,
            randomize("main.trial") ,
            randomize("main.trial") ,
            randomize("main.trial") ,
            randomize("main.trial") ,
            randomize("main.trial") ,
            randomize("main.trial") ,
            randomize("main.trial") ,
            randomize("main.trial") ,
            randomize("main.trial") ,
             "send" , "end" )

// Welcome page: we do a first calibration here---meanwhile, the resources are preloading
newTrial("instructions",

    fullscreen(),
    
    newText(`<p>Welcome! In this experiment, you will hear Russian consonant sounds. </p><p> You will hear a sound, and you will press a button to indicate what sound you heard.</p><p>
            PRESS the 'f' button if you hear a "D" sound.</p><p>
            PRESS the 'j' button if you hear a "T" sound.</p><p>
            Try to respond as accurately and quickly as possible. If you wait more than 6 seconds, you will not be able to respond, and the next sound will be played.</p><p>
            Before you begin, you will have a chance to hear a model of these sounds.</p>`)
            .css("font-family", "Helvetica, sans-serif")
            .css("font-size", "16px")
            .print("center at 50%", "middle at 50%")
    ,
    newButton("Click when you are ready to begin")
        .css("font-family", "Helvetica, sans-serif")
        .css("font-size", "16px")
        .center()
        .print("center at 50%", "bottom at 80%")
        .wait()
        .remove()
);

newTrial("modelD",

    newAudio("d","da44.wav"),
    newKey("play-d", "F")
    .settings.callback(
        getAudio("d")
        .play("once")
        .remove()
        ),
    newText(`<p>This is the "D" model.</p><p>
            You may listen to it by pressing the 'f' key.</p><p>`)
            .css("font-family", "Helvetica, sans-serif")
            .css("font-size", "16px")
            .print("center at 50%", "middle at 50%")

    ,
    newButton("I'm ready to move on")
        .css("font-family", "Helvetica, sans-serif")
        .css("font-size", "16px")
        .center()
        .print("center at 50%", "bottom at 80%")
        .wait()
        .remove()
);

newTrial("modelT",

    newAudio("t","dax10.wav"),
    newKey("play-t", "J")
    .settings.callback(
        getAudio("t")
        .play("once")
        .remove()
        ),
    newText(`<p>This is the "T" model.</p><p>
            You may listen to it by pressing the 'j' key.</p><p>`)
            .css("font-family", "Helvetica, sans-serif")
            .css("font-size", "16px")
            .print("center at 50%", "middle at 50%")

    ,
    newButton("I'm ready to move on")
        .css("font-family", "Helvetica, sans-serif")
        .css("font-size", "16px")
        .center()
        .print("center at 50%", "bottom at 80%")
        .wait()
        .remove()
);


Template( "Russian_ID.csv",
    currentrow => 
    newTrial("main.trial",

    newText(`<p>Remember:</p><p>
            Press 'f' if you hear a 'D' sound.</p><p>
            Press 'j' if you hear a 'T' sound.</p><p>`)
            .css("font-family", "Helvetica, sans-serif")
            .css("font-size", "24px")
            .print("center at 50%", "middle at 50%"),
            
    newTimer("wait", 1000)
        .start()
        .wait(),
        
    newTimer("deadline", 6000)
        .start(),

    newVar("RT").global().set( v => Date.now() ),

    newAudio("cur.trial",currentrow.FILE).play("once"),

    newKey("cur.response", "F","J")
        .log("first")
        .callback( getTimer("deadline").stop()  )
        .callback( getVar("RT").set( v => Date.now() - v )),

    getTimer("deadline")
        .wait()  
    
    )
  .log( "VOT"   , currentrow.VOT)
  .log( "RT"   ,getVar("RT") )
);

SendResults("send");

newTrial("end",
    exitFullscreen()
    ,
    newText("The is the end of the experiment, you can now close this window. Thank you!")
        .css("font-family", "Helvetica, sans-serif")
        .css("font-size", "16px")
        .center()
        .print("center at 50%", "bottom at 80%")
    ,
    newButton("waitforever").wait() // Not printed: wait on this page forever
)
.setOption("countsForProgressBar",false);