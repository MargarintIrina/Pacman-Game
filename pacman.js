function randomNumber(){
        const random =  Math.floor(Math.random() * (10 - 1 + 1) + 1);
        return random; 
}

const coins = [
     {x: randomNumber(), y: randomNumber() },
     {x: randomNumber(), y: randomNumber() },
     {x: randomNumber(), y: randomNumber() },
];
let pac_x = 7;
let pac_y = 5;


let coin_state = true;

let bomb_x = randomNumber();
let bomb_y = randomNumber(); 
let bomb_state = true;

let score = 0 ;
let pac_hp = 100;

function renderMap(){
        gameMap.innerHTML = ``;
        for(let y = 1; y <= 10; y++){
                for(let x = 1; x <= 10; x++ ){
                        if(x == pac_x && y == pac_y){
                        gameMap.innerHTML += `<div class="pac"></div>`;}
                  
                else{
                        gameMap.innerHTML += `<div></div>`;
                } 

////////////////////////////////////////////////////////////////////////////////////////////

                coins.forEach(coin => {
                        if(x == [coin.x] && y == [coin.y] && coin_state == true){
                        gameMap.innerHTML += `<div class="coin"></div>`;
                        
                } 
                
                });
////////////////////////////////////////////////////////////////////////////////////////////////                
                              
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
        
 
      
        renderMap();
}

        // if(pac_x == coin_x && pac_y == coin_y){
        //         score += 10;
        //         coin_state = false;
        //        coin_x = randomNumber();
        //         coin_y = randomNumber();
        //         coin_state = true;
        // }
        // if(pac_x == bomb_x && pac_y == bomb_y){
        //         pac_hp -= 10;
        //         bomb_state = false;
        //         bomb_x = randomNumber();
        //         bomb_y = randomNumber();
        //         bomb_state = true;

        // }