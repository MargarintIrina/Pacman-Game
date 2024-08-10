"use strict"

function randomNumber(){
        const random =  Math.floor(Math.random() * (10 - 1 + 1) + 1);
        return random; 
}

let pac_x = 7;
let pac_y = 5;
const bombs = [];
const coins = [
        {x: randomNumber(), y: randomNumber() },
        {x: randomNumber(), y: randomNumber() },
        {x: randomNumber(), y: randomNumber() },
   ];
let b = 0;


while(bombs.length < 5){
    const newBomb = {x: randomNumber(), y: randomNumber()}
        const isOverlapping = coins.some(coin => coin.x === newBomb.x && coin.y === newBomb.y )|| bombs.some(bomb => bomb.x === newBomb.x && bomb.y === newBomb.y) || (newBomb.x === pac_x && newBomb.y === pac_y);
        if(!isOverlapping){
                bombs.push(newBomb);
        }
}

console.log(bombs);
console.log(coins);
console.log(pac_x, pac_y);
let coin_state = true;

// const bombs = [
//         {x: randomNumber(), y: randomNumber() },
//         {x: randomNumber(), y: randomNumber() },
//         {x: randomNumber(), y: randomNumber() },
//         {x: randomNumber(), y: randomNumber() },
//         {x: randomNumber(), y: randomNumber() }
//    ];




let bomb_state = true;

let score = 0 ;
let pac_hp = 100;

function renderMap(){
        gameMap.innerHTML = ``;
        for(let y = 1; y <= 10; y++){
                for(let x = 1; x <= 10; x++ ){
const foundCoin = coins.find((coin) => coin.x == x && coin.y == y && coin_state == true);
const foundBomb = bombs.find((bomb) => bomb.x == x && bomb.y == y && bomb_state == true);
if(x == pac_x && y == pac_y){
        gameMap.innerHTML += `<div class="pac"></div>`;}

else if(foundCoin){    
        gameMap.innerHTML += `<div class="coin"></div>`;
   
}else if(foundBomb){
        gameMap.innerHTML += `<div class="bomb"></div>`

}else{
        gameMap.innerHTML += `<div></div>`;
}            
        }
}
        gameScore.innerHTML = `<div>Score : ${score}</div>`;
        hp.innerHTML = `<div>HP : ${pac_hp}</div>`;

        if(pac_hp <= 0){
                gameMap.innerHTML = `<div class="game-over"><span>GAME OVER!</span></div>`
        }

}

         
renderMap();

function move(){
        console.log(event.key)
        switch(event.key){
                case "ArrowUp": if(pac_y > 1){
                        pac_y--;
                };
                break;
                case "ArrowDown": if(pac_y < 10){ 
                        pac_y++;
                };
                break;
                case "ArrowRight": if(pac_x < 10){
                        pac_x++;
                };
                break;
                case "ArrowLeft": if(pac_x > 1){ 
                        pac_x--;
                };
                break;
        }

const neamNeam = coins.find((coin) => pac_x == coin.x && pac_y == coin.y );

        if(neamNeam){
                score += 10;
                coin_state = false;
                neamNeam.x = randomNumber();
                neamNeam.y = randomNumber();
                coin_state = true;
        }

const baBah = bombs.find((bomb) => pac_x == bomb.x && pac_y == bomb.y);

        if(baBah){
                pac_hp -= 10;
                bomb_state = false;
                baBah.x = randomNumber();
                baBah.y = randomNumber();
                bomb_state = true;

        }

        renderMap();
}



// coins.forEach(coin => {
//         bombs.forEach(bomb => {
//             if (coin.x === bomb.x && coin.y === bomb.y) {
//                 bomb.x = randomNumber();
//                 bomb.y = randomNumber();
//             }
//         });
//     }); 