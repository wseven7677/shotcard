import React from 'react';

import cardCollection from '../../datas/cardCollection.js';
import rareColor from '../../datas/rareColor.js';

class CardBook extends React.Component {
	render() {

		var localCard = localStorage.getItem('shotcard-card').split(','),
			contents=[],
			liStyle;

		cardCollection.forEach(function(value,index){

			if(value.rare > 4 || value.rare < 0){
				console.log('错误的value.rare');
				return;
			}

			liStyle = {color: rareColor.p8[value.rare]};

			if(localCard[index] !== '-1'){
				liStyle = {backgroundColor: rareColor.p2[value.rare], color: rareColor.p8[value.rare]};
			}

			contents.push(<li style={liStyle}>{value.card}（{localCard[index]}）</li>);

		});

		return <div className='cardBook'>
		-----以下是卡页-----
			<ul>{contents}</ul>
		</div>;
	}
}


export default CardBook;