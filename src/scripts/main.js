import '../styles/base.less';

import React from 'react';
import ReactDOM from 'react-dom';

import Book from './sub-scripts/Book.jsx';

class ShotCard extends React.Component {

	constructor(props) {

		super(props);
		this.state = {
			btn: 0
		};

		if(!localStorage.getItem('shotcard-his')){
			localStorage.setItem('shotcard-his','[]');
		}
		if(!localStorage.getItem('shotcard-rcd')){
			localStorage.setItem('shotcard-rcd','[]');
		}
		
	}

	handleClick(event) {
		var inputMsg={
				theNote: '',
				theTime: '',
				theCard: ''
			},
			inputTime,
			localHistory,
			localRecords = JSON.parse(localStorage.getItem('shotcard-rcd'));

		switch(event.target.id) {
			case 'btnSubmit':
				if($('.recordOutter>input').val() !== ''){
					inputTime = new Date();
					inputMsg.theNote = $('.recordOutter>input').val();
					inputMsg.theTime = inputTime.toString().substring(0,24);

					localRecords.push(inputMsg);
					localStorage.setItem('shotcard-rcd',JSON.stringify(localRecords));
					$('.recordOutter>input').val('');
					this.setState({
						btn: Math.random()
					});
				}
				break;
			case 'btnShot':
				if(localRecords.length > 0){
					inputMsg = localRecords.shift();
					inputTime = new Date();
					inputMsg.theTime = inputTime.toString().substring(0,24);

					inputMsg.theCard = Math.floor(Math.random()*10);

					localHistory = JSON.parse(localStorage.getItem('shotcard-his'));
					localHistory.push(inputMsg);
					localStorage.setItem('shotcard-his',JSON.stringify(localHistory));
					localStorage.setItem('shotcard-rcd',JSON.stringify(localRecords));
					this.setState({
						btn: Math.random()
					});
				}
				break;
			default:
				console.log('点击了未知的按钮。');
		}
		
	}

    render() {

    	var localHis = JSON.parse(localStorage.getItem('shotcard-his')),
    		localRcd = JSON.parse(localStorage.getItem('shotcard-rcd'));

        return <div className='shotCard'>
	        <div className="recordOutter">
	        	<input type='text' placeholder='在此处输入缘由'></input>
	        	<button id='btnSubmit' onClick={this.handleClick.bind(this)}>提交</button>
	        	<Book theClsName='recordBook' theContents={localRcd} />
        	</div>
        	<button id='btnShot' onClick={this.handleClick.bind(this)}>来一发！{localRcd.length}</button>
	        <Book theClsName='historyBook' theContents={localHis}/>
        </div>;
    }
}

ReactDOM.render(
    (
        <ShotCard />
    ),
    document.getElementById("outter")
);