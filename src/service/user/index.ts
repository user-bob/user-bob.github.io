// import admin from '@/firebase/init-admin'
import {doc, getFirestore, setDoc} from 'firebase/firestore'

// export const getProfileData = async (username: string) => {
//   const db = admin.firestore()
//   const profileCollection = db.collection('profile')
//   const profileDoc = await profileCollection.doc(username).get()

//   if (!profileDoc.exists) {
//     return null
//   }
//   return profileDoc.data()
// }

export const addUser = async (uid: string, data:any): Promise<boolean> => {
  const db = getFirestore()
  try {
    await setDoc(doc(db, 'users', uid), data, {merge: true})
    return true
  }catch(e){
    return false
  }
}