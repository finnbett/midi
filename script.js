if (navigator.requestMIDIAccess) {
    console.log('This browser supports WebMIDI!');
} else {
    console.log('WebMIDI is not supported in this browser.');
}

navigator.requestMIDIAccess()
    .then(onMIDISuccess, onMIDIFailure);

function onMIDISuccess(midiAccess) {
    console.log(midiAccess);

    var inputs = midiAccess.inputs;
    var outputs = midiAccess.outputs;
}

function onMIDIFailure() {
    console.log('Could not access your MIDI devices.');
}


function onMIDISuccess(midiAccess) {
    for (var input of midiAccess.inputs.values())
        input.onmidimessage = getMIDIMessage;
    }

function getMIDIMessage(message) {

    //command is either going to be 144 which is a noteon event or 128 which is a noteoff event
    //note lowest value is 21 on 88 key piano, highest value is 108
    //velocity is a value between 1 and 99, 1 being quiet and 99 being ffffffff :)
    let command = message.data[0]
    let note = message.data[1]
    let velocity = (message.data.length > 2) ? message.data[2] : 0
    let data = [message.data]

    switch (command) {
    case 144: //noteon
        if (velocity > 0) {
            noteOn(note, velocity, command, data) 
        }
        else {
            noteoff(note) 

        }
        break
    case 128: //noteoff
        noteoff(note, command)
        break
    }
}

function noteOn(note, velocity, command, data) {
    console.log(note, velocity, command)
    console.log(data)
}

function noteoff(note, command){
    console.log('release', note, command)
}
