const Errors = document.getElementById('error');
const List = document.getElementById("highscores");
const myform = document.getElementById('myform');
var score = 0;


function reset_Form() {
    while(List.hasChildNodes()){
        List.removeChild(List.firstChild)
    }
    get_scores(list_scores);
    document.getElementById('score').value = 0;
    score = 0
}

myform.addEventListener('submit', (event) =>{
    event.preventDefault();
    var tenth_score = document.getElementById('lowscore').value;
    var this_score = document.getElementById('score').value

    if (this_score> tenth_score){
        //document.getElementById('message').src='/img/highscore.gif'
        //document.getElementById('message').alt='highscore'
        console.log('highscore');
    }

    else{
        //document.getElementById('message').src='/img/goodluck.gif'
        //document.getElementById('message').alt='highscore'
        console.log('entrou');
    }

    var formData = new FormData(myform);
    formData.append("score", score)

    fetch("js/src/scores.php",{
        method:"post",
        body: formData
    })
    .then (function (response){
        return response.text();
    })
    .then (function(text){
        reset_Form();
        console.log(text);
    })
    .catch(function(err){
        Errors.innerHTML= err;
    })
})

let scores;

function get_scores(callback){
    let file = 'js/src/scores.json';
    fetch(file,{cache:'no-cache'})
    .then(function(response){
        if (response.status !==200){
            Errors.innerHTML= response.status;
        }

        response.json().then(function(data){
            scores = JSON.stringify(data);
            console.log(scores);
            callback(scores);
        });
    })
    .catch(function(err){
        Errors.innerHTML=err;
    });

}


var list_scores = function(scores){
    let object = JSON.parse(scores);
    //console.log(scores)
    //console.log(object)
    let lowest_score = object[8].score;
    document.getElementById('lowscore').value = lowest_score;

    for (let i=0; i<object.length;i++){
        let li = document.createElement('LI');
        let text = document.createTextNode(object[i].name+"-----> " + object[i].score)
        li.appendChild(text);
        List.appendChild(li);

        if (i===0){
            li.setAttribute("class", "top1");
        }

        if (i===1){
            li.setAttribute("class", "top2");
        }

        if (i===2){
            li.setAttribute("class", "top3");
        }
    }
    myform.style.visibility='hidden';
}

