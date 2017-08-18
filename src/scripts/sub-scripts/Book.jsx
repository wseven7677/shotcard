import React from 'react';

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
    		tmp;
    	theContents = this.props.theContents;

    	if(this.props.theClsName === 'historyBook'){
			while(theContents.length){
	    		tmp = theContents.shift();
	    		contents.push(<li>{tmp.theCard}，{tmp.theTime}，{tmp.theNote}</li>); 
	    	}
	    	// theClsName = 'historyBook';
		}else{
			while(theContents.length){
	    		tmp = theContents.shift();
	    		contents.push(<li>{tmp.theNote}，{tmp.theTime}</li>); 
	    	}
	    	// theClsName = 'recordBook';
		}

        return <div className={this.props.theClsName}>
        	<span className='sp-dtl' onClick={this.handleClick.bind(this)}>点击查看详情</span>
        	<span className='sp-del' onClick={this.handleClick.bind(this)}>点击清空</span>
	        <ul>{contents}</ul>
        </div>;
    }
}

export default Book;