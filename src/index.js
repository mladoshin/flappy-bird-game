var canv = document.getElementById("canvas");
var ctx = canv.getContext("2d");
canv.width = 288;
canv.height = 512;
var bg = new Image();
var fg = new Image();
var bird = new Image();
var pipeUp = new Image();
var pipeDown = new Image();

bg.src = "../img/bg.png";
fg.src = "../img/fg.png";
bird.src = "../img/bird.png";
pipeUp.src = "../img/pipeUp.png";
pipeDown.src = "../img/pipeDown.png";


var score = 0;
var posX = 35;
var posY = 300;

var pipes = [];
pipes[0] = {
	x: 200,
	y: 0
}

var gap = 90+Math.random()*50;
var gravity = 1;
var gameSpeed = 0.5;

function fly(event){
	if (event.keyCode==32){
		posY-=35;
	}
}

document.addEventListener("keydown", fly);
function gameRender(){
	const width = document.clientWidth;
	const height = document.clientHeight;
	//drawing
	ctx.drawImage(bg, 0, 0);

	//drawing pipes
	for (let i=0; i < pipes.length;i++){
		//drawing a pipe
		ctx.drawImage(pipeUp, pipes[i].x, pipes[i].y);
		ctx.drawImage(pipeDown, pipes[i].x, pipes[i].y+pipeUp.height+gap);

		if(posX + bird.width >= pipes[i].x && posX <= pipes[i].x + pipeUp.width && (posY <= pipes[i].y + pipeUp.height || posY + bird.height >= pipes[i].y + pipeUp.height + gap) || posY + bird.height >= canv.height - fg.height) {
 			//clearInterval(timerID);
			loseWindow()
			if(score > best_score){
				localStorage.setItem("BestScore", score);
			}
			ctx.drawImage(bird, posX, posY);
			pipeRender()
			ctx.drawImage(fg, 0, 400);
			ctx.fillStyle="white";
			ctx.font = "24px Verdana";
			ctx.fillText("Score: "+score, 20, 450);
			ctx.fillStyle="red";
			ctx.font = "24px Verdana";
			ctx.fillText("Best Score: "+best_score, 65, 490);
			cancelAnimationFrame();

 		}

		//adding new pipes
		if (pipes[i].x == 80){
			let r = Math.random();
			let pipeY = r * pipeUp.height - pipeUp.height;
			if (pipeY < -1*pipeUp.height+30){
				pipeY+=30;
			}
			pipes.push({
				x: canv.width,
				y: pipeY
			})
		}

		if (pipes[i].x == 0){ //increment score if you pass the pipe
			score++;
		}

			pipes[i].x-=gameSpeed; //change the x=position of pipe
	}
	ctx.drawImage(bird, posX, posY);
	ctx.drawImage(fg, 0, 400);
	ctx.fillStyle="white";
	ctx.font = "24px Verdana";
	ctx.fillText("Score: "+score, 20, 450)
	ctx.fillStyle="red";
	ctx.font = "24px Verdana";
	ctx.fillText("Best Score: "+best_score, 65, 490);

		posY+=gravity; //gravity force

		requestAnimationFrame(gameRender);
}

function loseWindow(){
	const win = document.getElementById("looser");
	win.classList.add("opened");

}





function pipeRender(){
	for (let i =0; i<pipes.length;i++){
		ctx.drawImage(pipeUp, pipes[i].x, pipes[i].y);
		ctx.drawImage(pipeDown, pipes[i].x, pipes[i].y+pipeUp.height+gap);

		//adding new pipes
		if (pipes[i].x == 120){
			let r = Math.random();
			let pipeY = r * pipeUp.height - pipeUp.height;
			if (pipeY < -1*pipeUp.height+30){
				pipeY+=30;
			}
			pipes.push({
				x: canv.width,
				y: pipeY
			})
		}

		if (pipes[i].x == 0){ //increment score if you pass the pipe
			score++;
		}

			pipes[i].x-=gameSpeed; //change the x=position of pipe
	}

}

document.addEventListener("keydown", (event) => {if (event.keyCode==13){location.reload()}});
var best_score=localStorage.getItem("BestScore");
if (best_score==null){
	localStorage.setItem("BestScore", 0);
}


console.log(best_score);
//var timerID = setInterval(gameRender, 10);
pipeDown.onload = gameRender;
