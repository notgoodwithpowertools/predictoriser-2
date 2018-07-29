import React from 'react';
import {connect} from 'react-redux';
import '../css/predList.css';
import { filterPredsUid } from '../actions/pred-actions.js';
import { getVotes } from '../actions/vote-actions.js';
// import { firestoreDB } from '../api/firebase/index.js';


import PredictionCard from './PredictionCard.jsx';
// import Button from '@material-ui/core/Button';

export class Predboard extends React.Component {

  // constructor(props){
  //   super(props);
  // }


  render () {
    var { preds, sort, userid, votes } = this.props;

    console.log("Preds sort:", sort);
    console.log("Votes:", votes);

    var getPredList = () => {
      if (preds.length > 0) {
        var filteredPreds = preds;
        if (sort === 'user') {
          filteredPreds = filterPredsUid(preds, userid);
        }
        // console.log("filteredPreds:", filteredPreds);
        if (filteredPreds.length > 0) {

          return filteredPreds.map( (pred, index) => {
            console.log("Pred ID:", pred.id + ' Index:', index);
            // Get Votes for this card
            let filteredVotes = getVotes(votes, pred.id);


            return (
              <PredictionCard key={index} {...pred} upvotes={filteredVotes.upvotes} downvotes={filteredVotes.downvotes} />
            )

          });
        }
        else {
          return (<p>No items to display</p>)
        }
      };


      return (
        <p>No Prediction Cards to display...</p>
      )
    }

    return (
      <div className="predList">
        { getPredList() }
      </div>

    )
  }

};

/*
function List() {

  firestoreDB.collection('users').get()
  .then((snapshot) => {
    snapshot.forEach((doc) => {
      console.log(doc.id, '=>', doc.data());
    });
  })
  .catch((err) => {
    console.log('Error getting documents', err);
  });

  return (
    <Button variant="raised" color="primary">
      Hello World
    </Button>
  );
}


// import Player from './Player.jsx';
// import '../css/leaderboard.css';

// import Spinner from './Spinner.jsx';
// import { updatePlayers } from '../actions/player-actions.js';
// import { firebaseRef } from '../api/firebase/index.js';
// import { rankPlayers } from '../api/rank.js';
// import { getTipTotals } from '../actions/tip-actions.js';

// export class List extends React.Component {

  // constructor (props) {
  //   super(props);
  // }

  // componentDidMount () {
  //
  //   console.log("LeaderBoard component did mount...");
/*
    var { dispatch } = this.props;
    var leaderboardRef = firebaseRef.child(`/leaderboard`);

    leaderboardRef.on('value', snap => {

      // return snap.val();
      var players = snap.val() || {};
      console.log("snap.val() players", snap.val());
      var parsedPlayers = [];

      Object.keys(players).forEach( (playerId) => {
        parsedPlayers.push({
          id: playerId,
          // parsedRoundScores,
          ...players[playerId]
        });
      });

      console.log("parsedPlayers (returned from Firebase - unranked):", parsedPlayers);

      dispatch(updatePlayers(parsedPlayers));
    });
*/
  //} // end -- componentDidMount
/*
  render () {

    // var sortOnTotalTips = ( a, b ) => {
    //   a = Number(a.totalTips);
    //   b = Number(b.totalTips);
    //   // console.log("a:", a);
    //   // console.log("b:", b);
    //   if (a < b) {
    //     return 1;
    //   }
    //   if (a > b) {
    //     return -1;
    //   }
    //   return 0;
    // }
    //
    // var { players, games, tips } = this.props;

    // console.log("Players loading...", players);
    //
    // if (players === '') {
    //   return (
    //     <Spinner />
    //   )
    // }

    // console.log("leaderboard:", leaderboard);
    // var filteredPlayers = [];
    // if ((players.length > 0) && (tips.length > 0)){
    //
    //   filteredPlayers = getTipTotals(games, tips, players);
    //   console.log("filteredPlayers:", filteredPlayers);
    //
    //   // filteredPlayers = rankPlayers(leaderboard);
    //   // filteredPlayers.sort(sortPlayers)
    // };
    //
    // var renderPlayers = () => {
    //
    //   //var filterPlayers = FTipsAPI.filterGames(games, round);
    //
    //   if (filteredPlayers.length === 0) {
    //     return (
    //         <div>
    //           <p className="container__message">No Players</p>
    //         </div>
    //     )
    //   }
    //
    //   filteredPlayers.sort(sortOnTotalTips);
    //
    //   return filteredPlayers.map( (player, index) => {
    //     var rank = index + 1;
    //     // <Player key={player.id} {...player} rank={rank}/>
    //     return (
    //       // <p key={player.uid}>{player.firstname} - TotalTips:{player.totalTips}</p>
    //       <Player key={player.uid} rank={rank} {...player} />
    //     )
    //   });
    // }
    //
    // var { season }  = this.props;

    return (
      <div>
        <h2 className='lbh2'>List</h2>
      </div>
    )
  }

};
*/
export default connect(
  (state) => {
    return {
      preds: state.preds,
      userid: state.user.uid,
      votes: state.votes
    };
    //return state;
  }

)(Predboard);
