

// In here I just experimented the different ways of coding. 


const body = document.getElementsByTagName("body")[0];
const primary = document.getElementById("main");
const secondary = document.getElementById("secondary");

const trainDisplay = document.getElementById("train-display");

var trainingTextArea = {
    length:0,
    lengthElem: document.getElementById("characters-in-training-text"),
    elem: document.getElementById("training-text-textarea"),
    content: "",
    init:function initialize(){
        this.startEventListener();
        
    },
    startEventListener:function startListener(){
        this.elem.addEventListener("input", function listener1(){
            this.clearNewLines()
            this.updateLength();
        }.bind(this))
    },
    updateLength:function updateLen(){
        this.length = this.elem.value.length;
        this.content = this.elem.value;
        if(this.length > 1000){
            let newContent = this.content.slice(0,1000);
            this.elem.value = newContent;
            this.updateLength();
        }
        this.lengthElem.innerText = this.length;
    },
    clearNewLines:function clearnl(){
        this.content = this.elem.value;
        this.content = this.content.replace('\n', '');
        this.elem.value = this.content;

    }

}


const startButton = document.getElementById("start-button");


function main(){

    trainingTextArea.init();

    startButton.addEventListener("click", ()=>startButtonClicked());

}

main();

var trainingCharacters = [];
var trainingText = "";

function startButtonClicked(){


    if(trainingTextArea.length < 30){
        alert("The text is too short");
    }
    else{
        var button = document.getElementById("start-button");
        // button.style.animation = "start-button-out";
        // button.style.animationDuration = "300ms";
     
        button.style.animation = "start-button-out";
        button.style.animationDuration = "300ms";
        
        button.addEventListener("animationend", ()=>{
            button.style.display = "none";
            let loading = document.getElementById("loading");
            loading.style.animation = "loading-come-in";
            loading.style.animationDuration = "300ms";
            loading.style.display = "inline";
            loading.addEventListener("animationend", ()=>{
                loading.style.animation = "spin-360";
                loading.style.animationDuration = "1s";
                loading.style.animationIterationCount = "infinite";
                loading.removeEventListener("animationend",{});
            })
        
        })

        trainingText = trainingTextArea.content;
        for(char of trainingText){
            let temp = document.createElement("span");
            temp.innerText = char;
            temp.className = "training-char";
            trainDisplay.appendChild(temp);
            trainingCharacters.push(temp);
        }


        setTimeout(()=>{
            secondary.style.display = "flex";

            body.scrollTo({
                top: body.offsetHeight,
                behavior: 'smooth'
              });
            window.addEventListener("scrollend", ()=>{
                primary.style.display = "none";
                
            })
        },600)

        // button.onanimationend(function animEnd1(){
        //     this.button.style.display = "none";
        // }.bind(this))

    }
}




var timeStarted = false;

const trainInput = document.getElementById("train-input");
const timeElem = document.getElementById("time");
const timeBox = document.getElementById("time-box");
const resultDisplay = document.getElementById("result-display");

const result1 = document.getElementById("result1");
const result2 = document.getElementById("result2");
const result3 = document.getElementById("result3");
const result4 = document.getElementById("result4");



var time = 0;
var timerInterval = null;
trainInput.addEventListener("input",()=> trainInputChange())


var previousCount = 0;
function trainInputChange(){
    if(!timeStarted){
        startTimer();
    }
    
    let typed = trainInput.value;
    let typedCount = trainInput.value.length;
    if(previousCount > typedCount){
        trainingCharacters[previousCount].style.backgroundColor = "rgba(0,0,0,0.01)";

        while(previousCount != typedCount){

            if(trainingCharacters.length > previousCount && previousCount != 0)
                trainingCharacters[previousCount - 1].style.backgroundColor = "rgba(0,0,0,0.01)";
            previousCount = previousCount - 1;
            
        }

    }
    else if(typed[typedCount - 1] == trainingText[typedCount - 1]){
        if(trainingCharacters.length > typedCount  || trainingCharacters.length == typedCount)
            trainingCharacters[typedCount - 1].style.backgroundColor = "rgba(0,128,0,0.3)";
    }
    else{
        if(trainingCharacters.length > typedCount || trainingCharacters.length == typedCount)
            trainingCharacters[typedCount - 1].style.backgroundColor = "rgba(255,0,0,0.3)";
    }
    

    if(typedCount != 0 && typedCount != trainingCharacters.length){
        if(trainingCharacters[typedCount].getBoundingClientRect().top > trainingCharacters[typedCount - 1].getBoundingClientRect().top){
            let toScroll = (trainingCharacters[typedCount].getBoundingClientRect().top - trainingCharacters[typedCount - 1].getBoundingClientRect().top);
            if(previousCount > (typedCount - 1))
                toScroll = toScroll * (-1);
            
            console.log(toScroll);
            trainDisplay.scrollBy({
                top: toScroll,
                behavior:"smooth"
            });
            
        }
    }

    previousCount = typedCount;

    if(typedCount == trainingCharacters.length){
        let characters = document.getElementById("characters");
        let totalTime = document.getElementById("total-time");
        let charPerSec = document.getElementById("char-per-sec");
        let totalErrors = document.getElementById("total-errors");
        
        let tempInt = 0;
        for(elem of trainingCharacters){
            if(elem.style.backgroundColor == "rgba(255, 0, 0, 0.3)"){
                tempInt = tempInt + 1;
            }
            console.log(elem.style.backgroundColor);
        }
        if(tempInt == 0)
            totalErrors.style.color = "green";
        else
            totalErrors.style.color = "red";
        totalErrors.innerText = tempInt;

        let minutes = new Date(time * 1000).getMinutes();
        let seconds = new Date(time * 1000).getSeconds();
        let minutesZero = "";
        let secondsZero = "";
        if(minutes < 10)
            minutesZero = "0";
        if(seconds < 10)
            secondsZero = "0"

        let timeString = `${minutesZero}${minutes}:${secondsZero}${seconds}`;

        characters.innerText = trainingCharacters.length;
        totalTime.innerText = timeString;
        charPerSec.innerText = (trainingCharacters.length / time).toFixed(1);
    

        clearInterval(timerInterval);
        setTimeout(()=>{
            timeBox.style.animation = "1s timer-go-out cubic-bezier(0.165, 0.84, 0.44, 1)";
            timeBox.addEventListener("animationend", ()=>{
                timeBox.style.display = "none";
                resultDisplay.style.display = "flex";
                resultDisplay.style.animation = "fade-in 1s";
                
                resultDisplay.addEventListener("animationend",()=>{
                  
                    result1.style.animation = "fade-in 500ms";
                    result1.addEventListener("animationend",()=>{
                        result1.style.opacity = "100%";
                        result2.style.animation = "fade-in 500ms";
                        result2.addEventListener("animationend",()=>{
                            result2.style.opacity = "100%";
                            result3.style.animation = "fade-in 500ms";
                            result3.addEventListener("animationend",()=>{
                                result3.style.opacity = "100%";
                                result4.style.animation = "fade-in 500ms";
                                result4.addEventListener("animationend", ()=>{
                                    result4.style.opacity = "100%";
                                });

                            })
                        });
                    });
                });
            });
        },500)


    }


       
}

function startTimer(){
    timeStarted = true;
    timerInterval = setInterval(()=>{
        time++;
        let minutes = new Date(time * 1000).getMinutes();
        let seconds = new Date(time * 1000).getSeconds();
        let minutesZero = "";
        let secondsZero = "";
        if(minutes < 10)
            minutesZero = "0";
        if(seconds < 10)
            secondsZero = "0"

        let timeString = `${minutesZero}${minutes}:${secondsZero}${seconds}`;
        timeElem.innerText = timeString;
    }, 1000);
}







