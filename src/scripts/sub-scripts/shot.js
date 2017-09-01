import cardCollection from '../../datas/cardCollection.js';

var shot = function(){

	var rnd,
		card = '(nothing)',
		theId = null,
		spCount = localStorage.getItem('shotcard-special-count');

	if(spCount === '9'){
		rnd = Math.floor(Math.random()*300)+699;
		spCount = -1;
		alert('锵锵锵！('+rnd+')');
	}else{
		rnd = Math.floor(Math.random()*1000);
	}

	cardCollection.forEach(function(value,index){
		if(rnd >= value.from && rnd <= value.to){
			card = value.card;
			theId = index;
		}
	});

	localStorage.setItem('shotcard-special-count',++spCount);
	return {card: card,id: theId};

};

export default shot;