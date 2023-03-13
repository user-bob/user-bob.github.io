import admin from '@/firebase/init-admin'

export const getProfileData = async (username: string) => {
  const db = admin.firestore()
  const profileCollection = db.collection('profile')
  const profileDoc = await profileCollection.doc(username).get()

  if (!profileDoc.exists) {
    return null
  }

  return profileDoc.data()
}