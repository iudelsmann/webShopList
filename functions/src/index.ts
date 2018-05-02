import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin'

admin.initializeApp();

/**
 * When a share request is created, save
 */
export const shareList = functions.firestore.document('/share/{id}')
  .onCreate(event => {
    const data = event.data();

    return admin.auth().getUserByEmail(data.email)
      .then(userRecord => {
        console.log('Successfully found user');

        const list = data.list;
        list.createdAt = new Date().getTime();
        return admin.firestore().doc(`/users/${userRecord.uid}/lists/${data.listId}`).set(data.list);
      })
      .catch(() => {
        console.log('User not found');
      })
      .then(() => {
        console.log('Deleting share request data');
        return event.ref.delete();
      });
  });
