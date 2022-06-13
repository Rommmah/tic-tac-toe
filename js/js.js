let count = 1

let players = [];
let score = [0, 0];
let hasWinner = false;

for (let cell of document.querySelectorAll('td')){
	cell.addEventListener('click', ()=>{
		// console.log( !!(cell.textContent) + ' count = ' + count);
		if( !cell.innerHTML.trim() && !hasWinner ) {

			cell.textContent = count %2 == 0 ? 'o' : 'x';

			if ( winCheck() ) {
				return declareWinner();
			}

			if ( tieCheck() ) {
				declareTie();
			}
			cell.classList.add('marked');
			document.querySelector('.gamer-name').textContent = players[count %2] ;
			document.querySelector('.gamer-name').classList.toggle('right-side') ;
			count++;
		}
	});
}

document.querySelector('.replay').addEventListener('click', replay );

document.querySelector('.approve').addEventListener('click', approveNames);


let winVariants = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
]

function winCheck() {
	let tdList = document.querySelectorAll('td');
	let cells = Array.from( tdList );
	let values = cells.map( cell => cell.textContent.trim() );

	for (let n of winVariants) {
		if( values[n[0]] == values[n[1]] &&
			values[n[0]] == values[n[2]] &&
			values[n[0]] != '' ) {
			for( let i of n){
				tdList[i].classList.add('win');
			}
			return true
		}
	}

	return false
}

function tieCheck() {
	let cells = Array.from( document.querySelectorAll('td') );
	let values = cells.map( cell => cell.textContent.trim() );

	if( !values.filter( item => item == '').length ){
		return true;
	}

	return false
}

function replay() {
	for( let td of document.querySelectorAll('td') ){
		td.innerHTML = '';
		td.classList.remove('win');
		td.classList.remove('marked');
	}
	hasWinner = false;
	toggleResultVision();
}

function declareWinner(){
	hasWinner = true;
	document.querySelector('.winnerName').innerHTML = '<span>' + players[ (count + 1) %2 ] + '</span>' + ' побеждает!' ;
	score[ (count + 1) %2 ]++;
	showWinner();
	toggleResultVision();
}

function declareTie(){
	document.querySelector('.winnerName').textContent = 'Ничья' ;
	showWinner();
	toggleResultVision();
}

function showWinner(){
	document.querySelector('.players-list').textContent = players[0] + ' - ' + players[1];	
	document.querySelector('.players-score').textContent = score[0] + ' : ' + score[1];	
}

function toggleResultVision() {
	document.querySelector('.gamers').classList.toggle('visually-hidden');
	document.querySelector('.result').classList.toggle('visually-hidden');
}

function approveNames(){
	if ( !nameCheck() ) return
	players[0] = document.getElementById('player1').value;
	players[1] = document.getElementById('player2').value;
	document.querySelector('.name-container').classList.add('visually-hidden');
	document.querySelector('.gamer-name').textContent = players[0];
}

function nameCheck() {
	for(let player of document.querySelectorAll('.player-name') ){
		if (!player.value) {
			// console.dir(player);
			player.nextElementSibling.innerHTML = 'Имя не может быть пустым!';
			player.focus();
			return;
		}
		if (player.value.length > 20) {
			// console.dir(player);
			player.nextElementSibling.innerHTML = 'Максимум 20 символов';
			player.focus();
			return;
		}
		player.nextElementSibling.innerHTML = '';
	}
	return true
}




document.querySelector('.describe').addEventListener('click', (e)=>{
	e.target.classList.add('notice');
	e.target.textContent = 'Нет никаких правил, детка...'
});