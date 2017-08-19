import React from 'react';

import cardCollection from '../../datas/cardCollection.js';

class CardBook extends React.Component {
	render() {

		var localCard = localStorage.getItem('shotcard-card').split(','),
			contents=[];

		cardCollection.forEach(function(value,index){
			contents.push(<li>{value.card}，{localCard[index]}</li>);
		});

		return <div className='cardBook'>
		-----以下是卡页-----
			<ul>{contents}</ul>
		</div>;
	}
}


export default CardBook;