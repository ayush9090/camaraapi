let recording=document.querySelector(".recording");
let videoplayer=document.querySelector('video');
let body=document.querySelector("body");
let bfilter="";
window.addEventListener('resize',function(){
    videoplayer.height=window.height;
    videoplayer.width=window.width;
})
videoplayer.controls=false;
let constrains={video:true,audio:true};
let activestate=false;
recording.addEventListener("click",function(){
    let innerdiv=document.querySelector(".recording .record-div");
    
    if(activestate==false){
        activestate=true;
        mediaRecord.start();
        innerdiv.classList.add('record-animation');
      
    }
    else{
        activestate=false;
        mediaRecord.stop();
        innerdiv.classList.remove('record-animation');
       
    }
})


let mediaRecord;
let chunks=[];
navigator.mediaDevices.getUserMedia(constrains).then(function(mediastrem){
videoplayer.srcObject=mediastrem;
  mediaRecord=new MediaRecorder(mediastrem);
  mediaRecord.ondataavailable=function(e){
  chunks.push(e.data);
}
mediaRecord.onstop=function(){
  let blob=new Blob(chunks,{type:"video/mp4"});
  chunks=[];
  let bloburl=URL.createObjectURL(blob);
  var link=document.createElement("a");
  link.href=bloburl;
  link.download="video.mp4";
  link.click();
  link.remove();

}
}).catch(function(err){
console.log(err);
})
let capture=document.querySelector(".capture");
capture.addEventListener('click',function(){
console.log("hii");
let capdiv=document.querySelector(".capture .capture-div");
capdiv.classList.add('record-animation');
setTimeout(function(){
  capdiv.classList.remove('record-animation');
},500);
captureimg();
})
function captureimg(){
let c=document.createElement('canvas');
c.width=videoplayer.videoWidth;
c.height=videoplayer.videoHeight;
let tool=c.getContext('2d');
tool.drawImage(videoplayer,0,0);
let link=document.createElement('a');
link.download='image.png';
link.href=c.toDataURL();
link.download='image.png';
link.click();
link.remove();
c.remove();
}
let filters=document.querySelectorAll(".filter");
console.log(filters);
for(let i=0;i<filters.length;i++){
    filters[i].addEventListener('click',function(e){
       bfilter=e.currentTarget.style.backgroundColor;
       console.log(bfilter+"")
       
       removefilt();
       addfilter(bfilter)
    })
}
function addfilter(bfilter){
  console.log("hii")
    let newdiv=document.createElement('div');
    newdiv.classList.add('backfilter');
    newdiv.style.backgroundColor=`${bfilter}`;
    newdiv.style.position='fixed';
    newdiv.style.height="100vh";
    newdiv.style.width='100vw';
    newdiv.style.top='0px';
    body.appendChild(newdiv);
}
function removefilt(){
  let backfilter=document.querySelector(".backfilter");
  if(backfilter){
    backfilter.remove();
  }
}
let zoomin=document.querySelector(".zoomin");
let zoomout=document.querySelector(".zoomout");
let sc=Number(videoplayer.style.transform.split("(")[1].split(")")[0]);
zoomin.addEventListener("click",function(){
  if(sc<1.5){
  sc=sc+0.1
  videoplayer.style.transform="scale("+`${sc}`+")";
  }
})
zoomout.addEventListener("click",function(){
  if(sc>1){
  sc=sc-0.1
  videoplayer.style.transform="scale("+`${sc}`+")";
  }
})