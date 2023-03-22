/*Get our elements*/
const player=document.querySelector('.player')
const video = player.querySelector('.viewer')
const progress= player.querySelector('.progress')
const progressBar=player.querySelector('.progress__filled')
const toggle= player.querySelector('.toggle')
const skipButtons= player.querySelectorAll('[data-skip]')
const ranges=player.querySelectorAll('.player__slider')
/*Build our functon*/
//  
progressBar.style.flexBasis=`${0}%`

function togglePlay(){
    if(video.paused)
    {
        video['play']();
        // toggle.innerHTML="| |"
    }
    else{
    video['pause']();
    // toggle.innerHTML="►"
    }
}

function updateButton(){
const icon=this.paused? '►':'❚❚'
toggle.textContent=icon;
}

function sk(){
    console.log(this.dataset.skip);
    video.currentTime += parseFloat(this.dataset.skip)
}

function handleRangeUpdate()
{
// console.log(this.name)
video[this.name]=this.value;
}
function scrub(e){
    const scrubTime=(e.offsetX/progress.offsetWidth)*video.duration; 
    video.currentTime=scrubTime
 console.log(e);
}

function hanldeProgress(){
    const percent=(video.currentTime/video.duration)*100 
    progressBar.style.flexBasis=`${percent}%`
}
/*Hook up the event listener*/
toggle.addEventListener('click',togglePlay)
video.addEventListener('play',updateButton)
video.addEventListener('pause',updateButton)
video.addEventListener('click',togglePlay)
video.addEventListener('timeupdate',hanldeProgress)

skipButtons.forEach(button=>button.addEventListener('click',sk))
ranges.forEach(range=>range.addEventListener('change',handleRangeUpdate))
ranges.forEach(range=>range.addEventListener('mousemove',handleRangeUpdate))
let mousedown=false;
progress.addEventListener('click',scrub)
progress.addEventListener('mousemove',(e)=>
{mousedown&&scrub(e)})

progress.addEventListener('mousedown',()=>mousedown=true)
progress.addEventListener('mouseup',()=>mousedown=false)