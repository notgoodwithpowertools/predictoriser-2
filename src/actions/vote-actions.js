import { firestoreDB /*fieldValue */} from '../api/firebase/index.js';

// export var updateVotes = (votes) => {
//   console.log("updateVotes...", votes);
//   return {
//     type: 'UPDATE_VOTES',
//     votes: votes
//   }
// };

export var getVotes = (votes, pred_id) => {
  // console.log("Getting votes for pred_id", pred_id + ' - Votes:', votes);
  // var obj = votes.find(function (obj) { return votes.id === pred_id; });
  // console.log("Extracted obj:", obj);
  if (votes === null) {
    return {
      upvotes: [],
      downvotes: []
    }
  }
  else {

    var obj = votes.find( (element) => { return element.id === pred_id; });
    // console.log("Extracted obj:", obj);

    if (obj !== undefined) {
      return {
        upvotes: obj.upvotes,
        downvotes: obj.downvotes
      }
    }
    else {
      return {
        upvotes: [],
        downvotes: []
      }
    }

  } // end - else {
}

// allow create: if resource.data.owner_uid != request.auth.uid;
//       allow read: if true;
//       allow update: if request.resource.data.owner_uid != request.auth.uid;
//     }

export var upVote = (uid, predId, predOwnerUid, upvotes, downvotes) => {
  // console.log("In upVote ...upvotes:", upvotes);
  // console.log("In upVote ...downvotes:", downvotes);

  if (!upvotes.includes(uid)) {
    // console.log("NOT yet upvoted");
    upvotes.push(uid);
    if (downvotes.includes(uid)) {
      // console.log("Downvote is also registered ... best to remove");
      var index = downvotes.indexOf(uid);
      if (index > -1) {
        downvotes.splice(index, 1);
      }
      // console.log("Spliced out downvotes...", downvotes);
    }

    // console.log("predOwnerId:", predOwnerUid + ' UID:', uid);

    firestoreDB.collection("votes").doc(predId).set({
        ownerid: predOwnerUid,
        upvotes: upvotes,
        downvotes: downvotes
    })
    .then(function() {
        // console.log("Document successfully written!");
        // if (downvotes.includes(uid)) {
        //   console.log("Downvote is also registered ... best to remove");
        //   var index = downvotes.indexOf(uid);
        //   if (index > -1) {
        //     downvotes.splice(index, 1);
        //     console.log("downvotes after splice.... need to remove from db", downvotes);
        //     firestoreDB.collection("votes").doc(predId).update({
        //         downvotes: downvotes
        //     })
        //   }
        // }
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
  } // end -- if (!upvotes.includes(uid)) {
  else {
    // console.log("already up voted");
  }
  // console.log("upvotes updated:", upvotes);

};


export var downVote = (uid, predId, predOwnerUid, upvotes, downvotes) => {
  // console.log("In downVote ...upvotes:", upvotes);
  // console.log("In downVote ...downvotes:", downvotes);

  if (!downvotes.includes(uid)) {
    // console.log("NOT yet downvoted");
    downvotes.push(uid);
    if (upvotes.includes(uid)) {
      // console.log("Upvote is also registered ... best to remove");
      var index = upvotes.indexOf(uid);
      if (index > -1) {
        upvotes.splice(index, 1);
      }
      // console.log("Spliced out upvotes...", upvotes);
    }

    firestoreDB.collection("votes").doc(predId).set({
        ownerid: predOwnerUid,
        upvotes: upvotes,
        downvotes: downvotes
    })
    .then(function() {
        console.log("Document successfully written!");
        // if (downvotes.includes(uid)) {
        //   console.log("Downvote is also registered ... best to remove");
        //   var index = downvotes.indexOf(uid);
        //   if (index > -1) {
        //     downvotes.splice(index, 1);
        //     console.log("downvotes after splice.... need to remove from db", downvotes);
        //     firestoreDB.collection("votes").doc(predId).update({
        //         downvotes: downvotes
        //     })
        //   }
        // }
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
  } // end -- if (!upvotes.includes(uid)) {
  else {
    // console.log("already down voted");
  }
  // console.log("downvotes updated:", downvotes);

};
