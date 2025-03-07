var splashTimer;
var sharkTimer;
var babyTimer;
var splashFrame = 0;
var sharkFrame = 0;
var sharkTalking = false;
var sharkDead = false;
var sharkTime = 0;
var babyTime = 5;
var babyPos = 115;

var  nextSplashFrame = function(){
    if(splashFrame == 0){
        clearInterval(splashTimer);
        splashTimer = setInterval(nextSplashFrame, 50);
    }
    if(splashFrame <= 10){
        var oldClass = "f" + splashFrame.toString();
        splashFrame++;
        var newClass = "f" + splashFrame.toString();
        $(".div-splash").removeClass(oldClass);
        $(".div-splash").addClass(newClass);
    } else {
        clearInterval(splashTimer);
    }
};

var nextSharkFrame = function(){
    if(sharkTalking){
        sharkTime++;
        if(sharkTime == 280){
            sharkTalking = false;
            babyTimer = setInterval(nextBabyFrame, 50);
        }
    }
    if(sharkDead ){
        if(sharkFrame < 4){
            sharkFrame = 4;
            clearInterval(sharkTimer);
            sharkTimer = setInterval(nextSharkFrame, 1000);
        } else if(sharkFrame == 5) {
            clearInterval(sharkTimer);
            sharkTimer = setInterval(nextSharkFrame, 100);
        }
    }
    if(sharkFrame == 0){
        clearInterval(sharkTimer);
        sharkTimer = setInterval(nextSharkFrame, 100);
    } 

    var oldClass = "f" + sharkFrame.toString();

    if(sharkFrame < 4){
        if(sharkFrame == 0 || sharkFrame == 2 || sharkFrame == 3) sharkFrame = 1;
        else sharkFrame = sharkTalking ? 3 : 2;
    } else {
        if(sharkFrame < 11)
            sharkFrame++;
    }

    var newClass = "f" + sharkFrame.toString();
    $(".div-shark").removeClass(oldClass);
    $(".div-shark").addClass(newClass);
}

var nextBabyFrame = function () {
    if(babyTime > 0) {
        babyTime--;
    } else {
        if(babyPos > 0){
            babyPos-=10;
            var position = "top "+ babyPos.toString() + "px left 0px";
            $(".div-baby").css("background-position", position);
        } else {
            clearInterval(babyTimer);
        }

    }
};

$(function() {
    splashTimer = setInterval(nextSplashFrame, 1000);
    sharkTimer = setInterval(nextSharkFrame, 1250);
    
    var soundShark = document.getElementById("audioShark");
    var soundBaby = document.getElementById("audioBaby");
    $(".div-splash").click(function () {
        if(!sharkTalking && !sharkDead && splashFrame > 10){
            sharkTalking = true;
            sharkTime = 0;
            soundShark.play();
            $(".div-text-area").removeClass("hidden");
            $("#txtPalavra").focus();
        }
    });

    $(".div-baby").click(function () {
        if(babyPos<=0){
            soundBaby.play();
            $(".div-text-baby").removeClass("hidden");
            $(".div-text-dica").removeClass("hidden");
            $("#txtPalavra").focus();
        }
    });

    $("#btnOk").click(function () {
        var palavra = $("#txtPalavra").val();
        palavra = palavra.toLowerCase();
        var newText = "BUAHAHAHAHA"
        if(palavra == "tsunami"){
            newText = "NÃÃÃÃÃÃÃOOOOOOO";
            sharkDead = true;
        }
        $(".div-text-area").html(newText);
        $("#txtPalavra").val("");
    });
});

