import React from 'react';

import cardCollection from '../../datas/cardCollection.js';

class CardBook extends React.Component {
	render() {

		var localCard = localStorage.getItem('shotcard-card').split(','),
			contents=[],
			liStyle;

		cardCollection.forEach(function(value,index){
			if(localCard[index] !== '-1'){
				switch(value.to - value.from + 1){
					case 80:
						liStyle = {backgroundColor: 'rgba(0,0,0,.2)',color: 'rgba(0,0,0,.8)'};
						break;
					case 60:
						liStyle = {backgroundColor: 'rgba(53,224,73,.2)',color: 'rgba(53,224,73,.8)'};
						break;
					case 40:
						liStyle = {backgroundColor: 'rgba(41,155,241,.2)',color: 'rgba(41,155,241,.8)'};
						break;
					case 20:
						liStyle = {backgroundColor: 'rgba(183,41,214,.2)',color: 'rgba(183,41,214,.8)'};
						break;
					case 10:
						liStyle = {backgroundColor: 'rgba(240,154,19,.2)',color: 'rgba(240,154,19,.8)'};
						break;
					default:
						console.log('抽到的句子范围有问题。');
				}
			}else{
				liStyle = {};
			}
			if(index == 3 && localCard[index] !== '-1'){
				liStyle = {backgroundColor: 'rgba(41,155,241,.2)',color: 'rgba(41,155,241,.8)'};
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