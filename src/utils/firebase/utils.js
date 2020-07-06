// eslint-disable-next-line import/prefer-default-export
export function extractSnapshotDocsData(snapshot) {
  return snapshot.docs.map((doc) => doc.data());
}
