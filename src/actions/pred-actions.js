import { firestoreDB, fieldValue } from '../api/firebase/index.js';

export var updatePreds = (preds) => {
  console.log("updatePreds...", preds);
  return {
    type: 'UPDATE_PREDICTIONS',
    preds: preds
  }
};

export var filterPredsUid = (preds, uid) => {

  console.log("Filtering preds for UID:", uid);
  var filteredPreds = preds;

  // Filter by showCompleted
  filteredPreds = filteredPreds.filter((pred) => {
    // console.log("game.round:", game.round_num);
    return pred.uid === uid;

  });

  // Sort on datstamp
  filteredPreds.sort( (a, b) => {
    return a.datestamp > b.datestamp
  });

  console.log("filteredPreds:", filteredPreds);
  return filteredPreds;

};

export var deletePred = (id) => {

  console.log("Deleting pred with id:", id);
  firestoreDB.collection("predicts").doc(id).delete().then(() => {
    console.log("Document successfully deleted!");
  }).catch(function(error) {
    console.error("Error removing document: ", error);
  });

}

export var setPred = (uid, short, long) => {

  console.log("setPred...Setting prediction record to Firestore:", uid);
  // firestoreDB.child(`season-2018-games`).push(pred);

  // console.log("UID:", uid);

  firestoreDB.collection("cities").doc("LA").set({
      uid: uid,
      short: short,
      long: long
  })
  .then(function() {
      console.log("Document successfully written!");
  })
  .catch(function(error) {
      console.error("Error writing document: ", error);
  });

}

export var addPred = (user, short, aDate) => {



  let datestamp = new Date(aDate);
  console.log("Parsed datestamp:", datestamp);

  return firestoreDB.collection('predicts').add({
    uid: user.uid,
    uname: user.firstname,
    complete: 0,
    short: short,
    datestamp: fieldValue.serverTimestamp(),
    expiry: datestamp
    // long: long
  }).then(ref => {
    console.log('Added new document with ID: ', ref.id);
    // ref.update({datestamp: fieldValue.serverTimestamp()})
    return ref.id;
  }).catch(function(error) {
    console.error("Error adding new document: ", error);
  });

}

export var startLoadPreds = () => {
  console.log('startLoadPreds...');
  return (dispatch, getState) => {

    var predictsCollection = firestoreDB.collection('predicts');

    predictsCollection.onSnapshot( {includeMetadataChanges: true}, (docSnapshot) => {
      // console.log('Received predictsCollection snapshot:', docSnapshot);
      predictsCollection.get().then( (querySnapshot) => {
        // translate returned objects to an array
        var parsedPreds = [];

        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          // console.log(doc.id, " => ", doc.data());
          // console.log("Object.keys(doc.data):", Object.keys(doc.data()));
          parsedPreds.push({
            id: doc.id,
            ...doc.data()
          })
        });
        // console.log('parsedPredicts:', parsedPreds);
        dispatch(updatePreds(parsedPreds));

      });

    // ...
    }, err => {
      console.log(`Encountered error observing predictsCollection: ${err}`);
    });
  /*
    //Updated Firebase schema bu uid
    //var todosRef = firebaseRef.child('todos');
    // var uid = getState().auth.uid;
    var teamsRef = firebaseRef.child(`/teams`);

    return teamsRef.once('value').then((snapshot) => {
      var teams = snapshot.val() || {};
      // console.log('snapshot.val() teams', teams);
      var parsedTeams = [];

      //translate to an array
      Object.keys(teams).forEach( (teamId) => {
        parsedTeams.push({
          id: teamId,
          ...teams[teamId]
        });

      });
      // console.log('parsedTeams:', parsedTeams);
      dispatch(loadTeams(parsedTeams));
    });
  */
  console.log('parsed Preds:'/*, parsedPlayers*/);
  }
}
/*
export var startAddPlayers2 = () => {
  console.log('startAddPlayers2...');
  return (dispatch, getState) => {

    //Updated Firebase schema bu uid
    //var uid = getState().auth.uid;
    var usersRef = firebaseRef.child(`/leaderboard`);
    // console.log("startAddPlayers2 usersRef:", usersRef);

    // return leaderboardRef.once('value').then((snapshot) => {
    usersRef.on('value', snap => {
      console.log("Players...");
      var players = snap.val() || {};
      console.log('snap.val() players2', players);
      var parsedPlayers = [];

      //translate to an array
      Object.keys(players).forEach( (playerId) => {
        parsedPlayers.push({
          id: playerId,
          ...players[playerId]
        });

      });
      console.log('parsedPlayers2:', parsedPlayers);
      dispatch(updatePlayers(parsedPlayers));
    });

  };
};
*/
