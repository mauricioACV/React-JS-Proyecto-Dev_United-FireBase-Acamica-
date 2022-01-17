import { useState, useEffect } from "react";
import { firestore } from "../firebase";

export const useTweets = (user) => {

    const [state, setState] = useState({
        tweets:[],
        loading: true,
    });

    useEffect(() => {
        const unsubscribe = firestore
          .collection("tweets")
          .onSnapshot((snapshot) => {
            const tweets = snapshot.docs.map((doc) => {
              return {
                tweet: doc.data().tweet,
                autor: doc.data().autor,
                nickname: doc.data().nickname,
                id: doc.id,
                likes: doc.data().likes,
                email: doc.data().email,
                uid: doc.data().uid,
                photoAuthor: doc.data().photoAuthor,
                date: doc.data().date,
              };
            });
            setState({
                tweets: tweets,
                loading: false,
            });
          });
        return () => unsubscribe();
    }, [user]);

    return state;
}
