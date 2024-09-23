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
    
    newText(`<div style="display: block; justify-content: space-between; padding: 0 50px;">
            <p>Welcome!</p>
            <p>In this experiment, you will listen to Russian consonant sounds.</p>
            <p>Your task is to identify each sound you hear by pressing the appropriate button.</p>
            <p>Press the 'J' key if you hear the "D" sound.</p>
            <p>Press the 'F' key if you hear the "T" sound.</p>
            <p>Please try to respond as quickly and accurately as possible. 
            If you take longer than 6 seconds to respond, the next sound will play automatically.</p>
            <p>Before starting, you will have a chance to listen to examples of these sounds.</p>
            <p>Click the button below when you are ready to begin the practice session.</p></div>`)
            .css("font-family", "Helvetica, sans-serif")
            .css("font-size", "16px")
            .print("center at 50%", "middle at 50%")
    ,
    newButton("Start")
        .css("font-family", "Helvetica, sans-serif")
        .css("font-size", "16px")
        .center()
        .print("center at 50%", "bottom at 80%")
        .wait()
        .remove()
);

newTrial("modelD",

    newAudio("d","da44.wav"),
    newKey("play-d", "J")
    .settings.callback(
        getAudio("d")
        .play("once")
        .remove()
        ),
    newText(`<p>This is an example of the "D" sound.</p><p>
            You may listen to it by pressing the 'J' key.</p><p>`)
            .css("font-family", "Helvetica, sans-serif")
            .css("font-size", "16px")
            .print("center at 50%", "middle at 50%")

    ,
    newButton("Next")
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
    newText(`<p>This is an example of the "T" sound.</p><p>
            You may listen to it by pressing the 'F' key.</p><p>`)
            .css("font-family", "Helvetica, sans-serif")
            .css("font-size", "16px")
            .print("center at 50%", "middle at 50%")

    ,
    newButton("Start the experiment")
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

    newText(`
            <div style="display: flex; justify-content: space-between;">
            <div style="text-align: center; width: 50%; padding-right: 100px;">
            <p>Press 'F' if you hear a 'T' sound.</p></div>
            <div style="text-align: center; width: 50%; padding-right: 100px;">
            <p>Press 'J' if you hear a 'D' sound.</p></div></div>`)
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
    newText(`<div style="display: block; justify-content: space-between; padding: 0 50px;">
             <p>The is the end of the experiment, you can now close this window. Thank you!</p></div>`)
        .css("font-family", "Helvetica, sans-serif")
        .css("font-size", "16px")
        .center()
        .print("center at 50%", "bottom at 80%")
    ,
    newButton("waitforever").wait() // Not printed: wait on this page forever
)
.setOption("countsForProgressBar",false);
