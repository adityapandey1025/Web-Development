const heart=document.querySelector("#heart");
const repeat=document.querySelector("#repeat");
const audio=document.querySelector("#audio");
const backward=document.querySelector("#backward");
const play_pause=document.querySelector(".play_pause");
const forward=document.querySelector("#forward");
const play=document.querySelector("#play");
const pause=document.querySelector("#pause");
const animation=document.querySelector(".animation");
const slider = document.querySelector("#slider");

const songs=[
    "song/bahara.mp3","song/hum_pyar_krte_hai.mp3","song/mai_hoon_na.mp3", "song/pee_loon.mp3" ,"song/tere_naina.mp3", "song/zalima.mp3", "song/shree_ram_aaye_hai.mp3"
];


heart.addEventListener('click',()=>{
    heart.classList.toggle("liked");
})

let songNo = 0;
audio.src=songs[0];
let isPlaying=false;
pause.style.display = 'none';
let isRepeating=false;


play_pause.addEventListener('click',()=>{
    isPlaying=!isPlaying;
    if(! isPlaying){
        audio.pause();
        play.style.display='block';
        pause.style.display='none';
        animation.classList.remove("playing");
        
    }
    else{
        audio.play();
        pause.style.display='block';
        play.style.display='none';
        animation.classList.add("playing");
        
    }
})

audio.addEventListener('ended',()=>{
    if(isRepeating){
        audio.play();
        return;
    }
    else if(songNo<songs.length-1){
        songNo++;
    }
    else{
        songNo=0;
    }
    audio.src=songs[songNo];
    audio.play();
})

audio.addEventListener('loadedmetadata', () => {
    slider.max = audio.duration;
    slider.value = 0;
});
audio.addEventListener('timeupdate',()=>{
    slider.value=audio.currentTime;
})

slider.addEventListener('input',()=>{
    audio.currentTime=slider.value;
})



backward.addEventListener('click',()=>{
    if(songNo>0 && songNo <songs.length){
        songNo --;
        audio.src=songs[songNo];
        audio.play();
    }

    else{
        songNo=songs.length - 1;
        audio.src=songs[songNo];
        audio.play();
    }
})

forward.addEventListener('click',()=>{
    if(songNo>=0 && songNo <songs.length-1){
        songNo ++;
        audio.src=songs[songNo];
        audio.play();
    }
    else{
        songNo=0;
        audio.src=songs[songNo];
        audio.play();
    }
})

repeat.addEventListener('click',()=>{
    repeat.classList.toggle("active");
    isRepeating=!isRepeating;
})


