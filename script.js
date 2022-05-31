
var ul = document.getElementById('ul')
var nextButton = document.getElementById('btnNext');
let quizbox = document.getElementById('questionBox')
var opt1 = document.getElementById('opt1')
var opt2 = document.getElementById('opt2')
var opt3 = document.getElementById('opt3')
var opt4 = document.getElementById('opt4')

var countDown = 11; 
var appStatus = 0; // means completed
var score = 0;
var startGame = false;

var app={
        questions:[
            {
                q:'What is the name of the river',
                options: ['Danube', 'Niger', 'Congo', 'Limpopo'],
                answer:1
            },
            {
                q:'What is the name of the Deadly virus',
                options: ['Antrax', 'Killvi', 'Corona', 'Wuhanvi'],
                answer:2
            }            
        ],
        start:function(){
            
        },
        index:0,
        load:function(){
           if(this.index<=this.questions.length-1){
                quizbox.innerHTML=this.index+1 + ". " +this.questions[this.index].q;
                opt1.innerHTML=this.questions[this.index].options[0];
                opt2.innerHTML=this.questions[this.index].options[1];
                opt3.innerHTML=this.questions[this.index].options[2];
                opt4.innerHTML=this.questions[this.index].options[3];
                this.timer();
                console.log("time check value:" + this.timeCheck)
            }
            else {
                appStatus = 2;
                currentTime = countDown;
                countDown = currentTime;
                quizbox.innerHTML="Quiz Completed!";
                ul.style.display="none";
                nextButton.style.display="none";
                if(this.score > 1){
                    document.getElementById("complement").innerHTML= "Your final score is " + this.score + " Better luck next time";
                }else{
                    document.getElementById("complement").innerHTML= "Your final score is " + this.score + " Good Job";
                }
                
            }
        },
        next: function(){
            var temp = 0;
            this.index++;
            temp = countDown;
            this.load();
            countDown = temp;
        },
        check: function(ele){
            var id=ele.id.split('');
            if(id[id.length-1]==this.questions[this.index].answer){
                score++;
                ele.className="correct";
                this.scoreCard();
            }
            else{
                ele.className="wrong";
                if(countDown - 5 <= 0){
                    appStatus = 2;
                }else{
                    countDown = countDown - 5; // Wrong answer penalty
                }
                
            }
        },
        timeCheck: 0,
        timer: function(){
            var downloadTimer = setInterval(function(){
            countDown = countDown -= 1;
            if(countDown <= 0 || appStatus == 2){
                quizbox.innerHTML="Game Over!";
                ul.style.display="none";
                nextButton.style.display="none";
                if(this.score < 1){
                    document.getElementById("complement").innerHTML= "Your final score is " + this.score + " Better luck next time";
                }
                // if(this.score)
                console.log(this.score)
                clearInterval(downloadTimer);
            }
            document.getElementById("timer").innerHTML= countDown;
            }, 2000);
            
        },
        preventClick:function(){
            for(let i=0; i<ul.children.length; i++){
                ul.children[i].style.pointerEvents="none";
            }
        },
        allowClick:function(){
            for(let i=0; i<ul.children.length; i++){
                ul.children[i].style.pointerEvents="auto";
                ul.children[i].className=''
            }
        },
        //score:0,
        scoreCard:function(){
            scoreCard.innerHTML=this.questions.length + "/" + score;
        }
}

window.load=app.load();

function button(ele){
    app.check(ele);
    app.preventClick();
}

function next(){
    app.next();
    app.allowClick();
}

