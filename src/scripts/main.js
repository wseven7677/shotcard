import '../styles/base.less';

import React from 'react';
import ReactDOM from 'react-dom';

import Book from './sub-scripts/Book.jsx';
import CardBook from './sub-scripts/CardBook.jsx';
import shot from './sub-scripts/shot.js';
import cardBookHistory from '../datas/cardBookHistory.js';

var versionCode = '1.2.0',
	versionLog = 'fix shot.';

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
		if(!localStorage.getItem('shotcard-card')){
			if(confirm('是否导入已有进度？')){
				localStorage.setItem('shotcard-card',cardBookHistory);
			}else{
				localStorage.setItem('shotcard-card',[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]);
			}
		}
		if(!localStorage.getItem('shotcard-special-count')){
			localStorage.setItem('shotcard-special-count',0);
		}
		if(!localStorage.getItem('shotcard-version-control')){
			localStorage.setItem('shotcard-version-control',versionCode);
		}else if(localStorage.getItem('shotcard-version-control') !== versionCode){
			alert('检测到新版本，已自动更新。(from '+localStorage.getItem('shotcard-version-control')+' to '+versionCode+'),LOG:'+versionLog);
			localStorage.setItem('shotcard-version-control',versionCode);
		}
	}

	handleClick(event) {
		var inputMsg={
				theNote: '',
				theTime: '',
				theCard: ''
			},
			inputTime,
			localCard,
			localHistory,
			localRecords = JSON.parse(localStorage.getItem('shotcard-rcd'));

		switch(event.target.className) {
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

					var shotResult = shot();
					inputMsg.theCard = shotResult.card;

					localHistory = JSON.parse(localStorage.getItem('shotcard-his'));
					localCard = localStorage.getItem('shotcard-card').split(',');
					localHistory.push(inputMsg);
					if(shotResult.id !== null){
						localCard[shotResult.id]++;
					}

					localStorage.setItem('shotcard-rcd',JSON.stringify(localRecords));
					localStorage.setItem('shotcard-his',JSON.stringify(localHistory));
					localStorage.setItem('shotcard-card',localCard);
					
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
        	<div className='version-control'>
        		version:{versionCode}
        	</div>
	        <div className="recordOutter">
	        	<input type='text' placeholder='在此处输入注册理由'></input>
	        	<button className='btnSubmit' onClick={this.handleClick.bind(this)}>提交</button>
	        	<Book theClsName='recordBook' theContents={localRcd} />
        	</div>
        	<button className='btnShot' onClick={this.handleClick.bind(this)}>
        		抽
        		<span>（还有{localRcd.length}次）</span>
        	</button>
	        <Book theClsName='historyBook' theContents={localHis}/>
	        <CardBook />
        </div>;
    }
}

ReactDOM.render(
    (
        <ShotCard />
    ),
    document.getElementById("outter")
);