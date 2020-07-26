import { ReduxService } from '..';

export function blockUser(uid) {
  fetch(`https://us-central1-tesising2020.cloudfunctions.net/blockUser?uid=${uid}`).then(() =>
    ReduxService.dispatch(ReduxService.users.actions.modify({ uid, bloqueado: true })),
  );
}

export function unblockUser(uid) {
  fetch(`https://us-central1-tesising2020.cloudfunctions.net/unblockUser?uid=${uid}`).then(() =>
    ReduxService.dispatch(ReduxService.users.actions.modify({ uid, bloqueado: false })),
  );
}

export function createUser(data) {
  const esc = encodeURIComponent;
  const formattedData = Object.keys(data)
    .map((k) => `${esc(k)}=${esc(data[k])}`)
    .join('&');

  return fetch(`https://us-central1-tesising2020.cloudfunctions.net/createUser?${formattedData}`);
}
