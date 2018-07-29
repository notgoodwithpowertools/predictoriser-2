import React from 'react';
import {connect} from 'react-redux';

import Image from './Image.jsx';

import '../css/card.css';
import '../css/votePanel.css';

import { getDateMDY } from '../api/datefuncs.js';
import { deletePred } from '../actions/pred-actions.js';
import { upVote, downVote } from '../actions/vote-actions.js';

import trash from '../images/trash.png';
import xCross from '../images/x-cross.png';
import upvote from '../images/upvote.png';
// import upvoteB from '../images/upvote-b.png';
import downvote from '../images/downvote.png';
// import downvoteB from '../images/downvote-b.png';
import flagY from '../images/flag-yellow.png';
import flagG from '../images/flag-green.png';
import flagR from '../images/flag-red.png';

// export const PredictionCard2 = (info) => {
export class PredictionCard extends React.Component {

  constructor (props) {

    super(props);
    this.state = {
        showDetails: false,
        deleteConfirm: false
    };

  }

  clickCard = (evt) => {
    // console.log("Card Clicked...");
    // console.log("Event:", evt);
    this.setState({showDetails: !this.state.showDetails});

  }

  clickDelete = (evt) => {
    // console.log("Delete card clicked...");
    this.setState({deleteConfirm: !this.state.deleteConfirm});

  }

  onUpVote = (evt) => {
    var { user, id, uid, upvotes, downvotes } = this.props
    // console.log("Upvote clicked...", id);
    upVote(user.uid, id, uid, upvotes, downvotes);
    // this.setState({deleteConfirm: !this.state.deleteConfirm});

  }

  onDownVote = (evt) => {
    var { user, id, uid, upvotes, downvotes} = this.props
    // console.log("Down vote clicked...", id);
    downVote(user.uid, id, uid, upvotes, downvotes);
    // this.setState({deleteConfirm: !this.state.deleteConfirm});

  }

  confirmDelete = (evt) => {
    var { id } = this.props;
    deletePred(id);
  }

  render () {

    var info = this.props;
    let { upvotes, downvotes } = this.props;
    // console.log("upvotes:", upvotes);
    // console.log("downvotes:", downvotes);
    // console.log("Info:", info);
    // console.log("Uid:", info.user.uid);
    // console.log("Expiry:", getDateMDY(info.expiry.toDate()));
    var initial = String(info.uname).charAt(0).toUpperCase();
    // var aDate = info.datestamp;
    // console.log("Date", getDay(aDate.toDate()));

    var getUpVoteAction = () => {
      var onClickAction = (info.uid === info.user.uid) ? null : this.onUpVote;
      // var onClickAction = this.onUpVote;
      return onClickAction;
    }

    var getDownVoteAction = () => {
      var onClickAction = (info.uid === info.user.uid) ? null : this.onDownVote;
      // var onClickAction = this.onDownVote;
      return onClickAction;
    }

    var getDeleteButton = () => {
      // var { user } = this.props;
      // console.log("User:", info.uid + ' uid:', info.user.uid );
      // var redStyle = {
      //   backgroundColor: 'red'
      // };

      if (info.uid === info.user.uid) {
        if (this.state.deleteConfirm) {
          return (
            <div className='delete deleteCancel'>
              <span onClick={ this.confirmDelete } ><Image src={trash} height={25} width={'auto !important'}/>Confirm</span>
              <span onClick={ this.clickDelete } ><Image src={xCross} height={25} width={'auto !important'}/>Cancel</span>
            </div>
          )
        }
        else {
          return (
            <div onClick={ this.clickDelete } className='delete'>
              <span className=''><Image src={trash} height={25} width={'auto !important'}/>Delete</span>
            </div>
          )
        }

      }
      else return null;
    }

    var getFlag = () => {
      var flag = flagY;
      switch (info.complete) {
        case 1:
          flag = flagG;
          break;
        case -1:
          flag = flagR;
          break;
        default:
          flag = flagY;

      }
      return (
        <span className=''><Image src={flag} height={25} width={'auto !important'}/></span>
      )
    }

    var status = {
      backgroundColor: 'yellow',
      width: '20px'
    }

    var getDetail = () => {
      if (this.state.showDetails) {
        return (
          <div className="content">

            <div>
              <p>Made by {info.uname}</p>
            </div>

            <div className="contentDate">
              <p>...on { getDateMDY(info.datestamp.toDate()) }</p><br/>
              <p className='expiryInfo'>...expires { getDateMDY(info.expiry.toDate()) }</p>
            </div>
            { getFlag() }
            <div className='votePanel'>

              <span className='' onClick={ getUpVoteAction() } ><Image src={upvote} height={25} width={25}/>{upvotes.length}</span>
              <span className='' onClick={ getDownVoteAction() } ><Image src={downvote} height={25} width={25}/>{downvotes.length}</span>

            </div>
            { getDeleteButton() }
          </div>
        )
      }
    } // end -- getDetail

    return (

      <div className='card'>


        {/* listInfo() */}
        <div className="header" onClick={ this.clickCard }><span className='initials'>{initial}</span><div className='infoPanel'><span className='info'>{ info.short }</span></div></div>
        { getDetail() }

      </div>

    )
  }
}

// export default PredictionCard2;
export default connect(
  (state) => {
    return {
      user: state.user
    };
    //return state;
  }

)(PredictionCard);
