export function blockUser(uid) {
  fetch(`https://us-central1-tesising2020.cloudfunctions.net/blockUser?uid=${uid}`);
}

export function unblockUser(uid) {
  fetch(`https://us-central1-tesising2020.cloudfunctions.net/unblockUser?uid=${uid}`);
}
