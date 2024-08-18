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
function generateItems(initialItems, desiredLength, overlappingCheckCb) {
        const newItems = [];
        initialItems = initialItems.concat(newItems) // < ?
        while (newItems.length < desiredLength) {
                const newItem = { x: randomNumber(), y: randomNumber() };

                if (!overlappingCheckCb(newItem, initialItems)) {
                        newItems.push(newItem);
                        initialItems.push(newItem);  /// <<< didn't update after each element
                } 
        }
        return newItems;
}


const pacmanItem = [{ x: pac_x, y: pac_y }];

const coins = generateItems(pacmanItem, 3, (newItem, items) => {
        return items.some(item => item.x === newItem.x && item.y === newItem.y);
      });
      
const bombs = generateItems(coins.concat(pacmanItem), 5, (newItem, items) => {
        return items.some(item => item.x === newItem.x && item.y === newItem.y);
      });



const testArray = coins.concat(pacmanItem, bombs)  
testArray.forEach( ({x: x1, y: y1}, idx1) => {
        testArray.forEach(({x: x2,y : y2}, idx2) => {
                if(x1 === x2 && y1 === y2 && idx1 !== idx2)  {
                        console.error("OVERLAP!!!")
                }
        })
})    



// sol 2 ----------------------------------------------------------------------------------------------------------

// function generateItems(count, overlapCheckCb, createItemCb, items) {
//         while (items.length < count) {
//           const newItem = createItemCb();
//           if (!overlapCheckCb(newItem, items)) {
//             items.push(newItem);
//           }
//         }
//       }

// let pac_x = 7;
// let pac_y = 5;
// let bombs = [];
// let coins = [];

// function checkOverlap(item, itemsToCheck) {
//   return itemsToCheck.some(existingItem => item.x === existingItem.x && item.y === existingItem.y);
// }

// generateItems(5, (newBomb, items) => checkOverlap(newBomb, [...items, ...coins, {x: pac_x, y: pac_y}]), () => ({ x: randomNumber(), y: randomNumber() }), bombs);
// generateItems(3, (newCoin, items) => checkOverlap(newCoin, [...items, ...bombs, {x: pac_x, y: pac_y}]), () => ({ x: randomNumber(), y: randomNumber() }), coins);


      
// Deci
// 1. studiaza timerele in javascript
// 2. revezi event handling (in special: ce rol joaca event.target, event.preventDefault(), element.addEventListener)
// 3. in momentul in care pacmanul nimereste pe o bomba - gaseste un gif sau png sau svg animat cu explozie si seteaza-l pe acel patratel ca background, totodata seteaza un timer - care peste o secunda - va scoate aceast stil cu explozie


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
   
}else if (foundBomb) {
        gameMap.innerHTML += `<div class="${foundBomb.explosion ? 'booom' : 'bomb'}"></div>`;

        if(foundBomb.explosion){
                setTimeout(() => {
                        foundBomb.explosion = false;
                        foundBomb.x = randomNumber();
                        foundBomb.y = randomNumber();
                renderMap();

                },
                 2000,
              
                );
        }
      }
else{
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
                baBah.explosion = true;
                pac_hp -= 10;


        }

        renderMap();
}
