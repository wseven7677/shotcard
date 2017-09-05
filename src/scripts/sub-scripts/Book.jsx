import React from 'react';
import cardCollection from '../../datas/cardCollection.js';
import rareColor from '../../datas/rareColor.js';

class Book extends React.Component {

    constructor(props) {

		super(props);

	}

	handleClick(event) {
		var localName;
		if(this.props.theClsName === 'historyBook'){
			localName = 'shotcard-his';
		}else{
			localName = 'shotcard-rcd';
		}

		switch(event.target.className){
			case 'sp-dtl':
				$('.'+this.props.theClsName+'>ul').toggle();
				break;
			case 'sp-del':
			    if(confirm('你确定要清空吗？')){
			        localStorage.setItem(localName,'[]');
			        location.reload();
			    }
				break;
			default:
				console.log('点击了奇怪的地方。');
		}
	}

    render() {
    	var contents=[],
    		theContents,
    		theClsName,
    		tmp,
    		liStyle;
    	theContents = this.props.theContents;

    	if(this.props.theClsName === 'historyBook'){
			while(theContents.length){
	    		tmp = theContents.pop();
	    		liStyle = {};
	    		cardCollection.forEach(function(value,index){
	    			if(value.card === tmp.theCard){
	    				liStyle = {color: rareColor.p8[value.rare]};
	    			}
	    		});
	    		contents.push(<li style={liStyle}>{tmp.theCard}<div className='contents-detail'>{tmp.theTime}<br />{tmp.theNote}</div></li>); 
	    	}
		}else{
			while(theContents.length){
	    		tmp = theContents.shift();
	    		contents.push(<li>{tmp.theNote}<div className='contents-detail'>{tmp.theTime}</div></li>); 
	    	}
		}

        return <div className='book'>
	        <div className={this.props.theClsName}>
	        	<span className='sp-dtl' onClick={this.handleClick.bind(this)}>点击查看详情</span>
	        	<span className='sp-del' onClick={this.handleClick.bind(this)}>点击清空</span>
		        <ul>{contents}</ul>
	        </div>
        </div>;
    }
}

export default Book;