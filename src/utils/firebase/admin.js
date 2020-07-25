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
