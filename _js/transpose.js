//var toggablePanel = document.querySelectorAll('.whi--panel--collapsible');

var matches = document.querySelectorAll('span');
console.log(matches.length)
var transposeValue = '1';
var ammount;
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function transposeChord(chord, amount) {
    var scale = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]
    var normalizeMap = {"Cb":"B", "Db":"C#", "Eb":"D#", "Fb":"E", "Gb":"F#", "Ab":"G#", "Bb":"A#",  "E#":"F", "B#":"C"}
    return chord.replace(/[CDEFGAB](b|#)?/g, function(match) {
        var i = (scale.indexOf((normalizeMap[match] ? normalizeMap[match] : match)) + amount) % scale.length;
        return scale[ i < 0 ? i + scale.length : i ];
    })
}

//originalChord = "Bmaj7/G#";
// originalChord = "Am add9";
// originalChord = "F#dim7";
// originalChord = "F#";
// originalChord = "F#";

//var j=transposeChord(originalChord, -1)

var myButton = document.getElementById('my-button');
myButton.onclick = function() {

    for (var i = 0; i < matches.length; i++) {
        var mySpan = matches[i];
        myChord = capitalizeFirstLetter(matches[i].innerHTML);
        console.log (myChord);
        mySpan.innerHTML = transposeChord(myChord, 1);

    }

}

var myMenu = document.getElementById('menu');
myMenu.onclick = function() {
    console.log('menu');
}








// //console.log('matches is ' + matches.length);


// console.log('originalChord is ' + originalChord);
// tokenizing = Tonal.Chord.tokenize(originalChord);

// originalNote = tokenizing[0];
// chordAddOn = tokenizing[1];
// console.log ('originalNote '+originalNote);
// console.log ('chordAddOn '+chordAddOn);
// newNote = Tonal.transpose(originalNote, transposeValue)
// console.log ('newNote '+newNote);
// if (chordAddOn.indexOf('/') > -1) {


//     splitAddOn = chordAddOn.split('/');
//     chordType = splitAddOn[0];
//     chordBass = splitAddOn[1];
//     if(isNaN(chordBass)){
//         console.log('is not a number');
//         newChordBass = Tonal.transpose(chordBass, transposeValue);
//         console.log ('newChordBass '+newChordBass);
//     } else{
//         console.log('is is a numbeer '+chordBass);
//     }
//     console.log('chordType is ' + chordType);
//     console.log('chordBass is ' + chordBass);
// //     console.log('var4[1] is ' + var4[1]);
// //     var5 = var4[0] + '/' + Tonal.transpose(var4[1], transposeValue)
// //     console.log('var5 is ' + var5);
// //     var2[1] = var5;
// }
//console.log('length is ' + var2.length); // => [ "C", "maj7" ]);
//console.log('array 0 = ' + var2[0])
//console.log('array 1 = ' + var2[1])
//var7 = Tonal.transpose(var2[0], "3M");
//console.log('transposing ' + var7); // => "F#"
//console.log('final  ' + var7 + var2[1]);


var myButton = document.getElementById('my-button');
//console.log('tomal is ' + Tonal.transpose('C4', '8P'));










function panelHeader(index) {
    var bar = toggablePanel[index];
    //on return key pressed
    bar.onkeypress = function(e) {
        if (e.which == 13) {
            this.click();
            //console.log('enter key down' + e);
        }
    }

    //clicking on tab
    bar.onclick = function() {
        var contentWrapper = this.nextElementSibling;
        //console.log (contentWrapper.clientHeight);

        //using firstchild would return #text if there's a white space, so...
        var content = contentWrapper.getElementsByTagName('div')[0];

        var contentWrapperHeight = contentWrapper.clientHeight;


        if (this.classList.contains('whi--panel--collapsed')) {
            //console.log('showing-----------------');
            contentWrapper.classList.remove('whi--panel--collapsed');
            this.classList.remove('whi--panel--collapsed');
            this.setAttribute("aria-hidden", "false");

        } else {
            //console.log('hiding-----------------');
            contentWrapper.classList.add('whi--panel--collapsed');
            this.classList.add('whi--panel--collapsed');
            this.setAttribute("aria-hidden", "true");
        }

    }

};
