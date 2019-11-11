import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp(functions.config().firebase);

exports.add = functions.https.onRequest((req,res) => {
    admin.firestore().collection('items').add({
        text: req.query.text
    }).then(r=>{
        res.send('Complete');
    }).catch(e=>{
        res.send('Error');
    });
});

exports.counter = functions.firestore.document('items/{itemId}').onCreate((ev)=>{
    const doc = admin.firestore().doc('counter/items');

    return doc.get().then((result)=>{
        let count = 0;
        if(typeof result.data() !== 'undefined')
            count = result.data()!.value;

        const info = {value: count + 1};
        return doc.update(info);
    });
});

exports.createGroup = functions.https.onRequest((req,res) => {
    // validar entrada
    // generar invitacion
    // guardar grupo
});
