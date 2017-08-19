import cardCollection from '../../datas/cardCollection.js';

var shot = function(){
	var rnd = Math.floor(Math.random()*1000),
		card = '(nothing)',
		theId;

	cardCollection.forEach(function(value,index){
		if(rnd > value.from && rnd < value.to){
			card = value.card;
			theId = index;
		}
	});
	return {card: card,id: theId};

};

export default shot;