"use strict"

function randomNumber(){
        const random =  Math.floor(Math.random() * (10 - 1 + 1) + 1);
        return random; 
}

let pac_x = 7;
let pac_y = 5;


// while(bombs.length < 5){
//     const newBomb = {x: randomNumber(), y: randomNumber()}
//         const isOverlapping = coins.some(coin => coin.x === newBomb.x && coin.y === newBomb.y )
//         || bombs.some(bomb => bomb.x === newBomb.x && bomb.y === newBomb.y)
//         || (newBomb.x === pac_x && newBomb.y === pac_y);

//         if(!isOverlapping){
//                 bombs.push(newBomb);
//         }
// }
// while(coins.length < 3){
//         const newCoin = {x: randomNumber(), y: randomNumber()};
//                 const isCoinOverlapping = coins.some(coin => coin.x === newCoin.x && coin.y === newCoin.y) ||
//                 bombs.some(bomb => bomb.x === newCoin.x && bomb.y === newCoin.y) ||
//                 (newCoin.x === pac_x && newCoin.y === pac_y);
//                 if(!isCoinOverlapping){
//                         coins.push(newCoin);
//                 }
// }



// sol 1 ---------------------------------------------------------------------------------------------------------

function generateItems(existingItems, desiredLeght, overlappingCheck){
        const newItems = [];

        while(newItems.length < desiredLeght){
                const newItem = {x: randomNumber(), y: randomNumber()};

                if(!overlappingCheck(newItem, existingItems)){
                        newItems.push(newItem);
                }
        }
        return newItems;

};
const initialItems = [{ x: pac_x, y: pac_y }];

const coins = generateItems(initialItems.concat([{ x: pac_x, y: pac_y }]), 3, (newItem, items) => {
        return items.some(item => item.x === newItem.x && item.y === newItem.y);
      });
const bombs = generateItems(coins.concat([{ x: pac_x, y: pac_y }]), 5, (newItem, items) => {
        return items.some(item => item.x === newItem.x && item.y === newItem.y);
      });






// sol 2 ----------------------------------------------------------------------------------------------------------

// function generateItems(count, overlapCheck, createItem, items) {
//         while (items.length < count) {
//           const newItem = createItem();
//           if (!overlapCheck(newItem, items)) {
//             items.push(newItem);
//           }
//         }
//       }

// let pac_x = 7;
// let pac_y = 5;
// let bombs = [];
// let coins = [];

// function checkOverlap(item, itemsToCheck) {
//   return itemsToCheck.some(existingItem => item.x === existingItem.x && item.y === existingItem.y) ||
//          (item.x === pac_x && item.y === pac_y);
// }

// generateItems(5, (newBomb, items) => checkOverlap(newBomb, [...items, ...coins]), () => ({ x: randomNumber(), y: randomNumber() }), bombs);
// generateItems(3, (newCoin, items) => checkOverlap(newCoin, [...items, ...bombs]), () => ({ x: randomNumber(), y: randomNumber() }), coins);


      



console.log(bombs);
console.log(coins);
console.log(pac_x, pac_y);
let coin_state = true;


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

        if(score >= 100){
                gameMap.innerHTML = `<div class="win"><span>You win!</span></div>`
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

