var buttonColours = ["green","red","yellow","blue"]

var gamePattern = []
var userPattern = []
var level = 0;
var started = false
highscore = 0;

$(".btn").click(function()
    {
        userChosenColour = this.id
        playSound(userChosenColour)
        animatePress(userChosenColour)   
        userPattern.push(userChosenColour)

        checkAnswer(userPattern.length - 1)
    })

function nextSequence()
{
    level += 1
    $("h1").text("Level " +level)
    var next = Math.floor(Math.random() * 4);
    return next;
}

function playSound(colour)
{
    var aud = new Audio("sounds/" + colour +".mp3")
    aud.play()
}

function nextLevel()
{
    started = true;

    var randomChosenColour = buttonColours[nextSequence()];
    gamePattern.push(randomChosenColour);
    userPattern = []

    var selected = $("#" + randomChosenColour)
    console.log(randomChosenColour)
    playSound(randomChosenColour)
    selected.fadeOut(100).fadeIn(100)
}

function animatePress(colour)
{
    $("#" +colour).addClass("pressed")

    setTimeout(function()
    {
        $("#" +colour).removeClass("pressed")    
    }, 100)
}

function checkAnswer(index)
{
    if(userPattern[index] === gamePattern[index])
    {
        if(userPattern.length === gamePattern.length)
        {
            console.log(gamePattern)
            console.log(userPattern)

            setTimeout(function()
            {
                nextLevel()
            }, 1000)
        }
    }
    else
    {
        playSound("wrong")
        $("body").addClass("game-over")
        $("h1").text("Game Over, Press Any Key to Restart")

        setTimeout(function()
        {
            $("body").removeClass("game-over")
        }, 200)

        startOver()
    }
}

function startOver()
{
    if(highscore < level)
    {
        highscore = level
        $("#score").text("HighScore " + highscore)
    }
    started = false;
    level = 0;
    gamePattern = []
}

$(document).on("keydown", function()
{
    if(!started)
        nextLevel()
})

