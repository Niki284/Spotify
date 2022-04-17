/**
 * The Webaudio API
 * More Information: https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API
 */

// TODO: Write your JS code here

const btnStartAudio = document.getElementById('btnStartAudio');
const btnStopAudio = document.getElementById('btnStopAudio');
const sliderVolume = document.getElementById('sliderVolume');
const sliderPanner = document.getElementById('sliderPanner');





let audioContext = null ;
let audio = null ;
let gainNode = null ; 
let pannerNode = null ;
let audioSource 

const initAudioContect = () => {
    if(!audioContext) audioContext = new AudioContext();
    //if(!audio) audio = new Audio('./audio/file-example.wav');
    if(!audio) audio = new Audio('./audio/01._Chikyuu_wa_Kyou_mo_Ai_wo_Hagukumu.wav');

    if(!gainNode) gainNode = audioContext.createGain();
    if(!pannerNode) pannerNode = new StereoPannerNode(audioContext , { pan:0 });
    if(!audioSource) {
        audioSource = audioContext.createMediaElementSource(audio)
        .connect(gainNode)
        .connect(pannerNode)
        .connect(audioContext.destination)
    }

}
const startAudio = () =>{
    initAudioContect();
    audio.play();
}
const stopAudio = () =>{
    audio.pause();
    audio.currentTime = 0;
}

const changeVolume = (e) => {
   gainNode.gain.value = e.target.value;    
}

const pan = (e) =>{
    pannerNode.pan.value = e.target.value;
}
btnStartAudio.addEventListener( 'click' , startAudio);
btnStopAudio.addEventListener( 'click' , stopAudio);
sliderVolume.addEventListener( 'input' , changeVolume);
sliderPanner.addEventListener( 'input' , pan);