import { getFirestore, collection, doc, getDoc } from 'firebase/firestore';
import { app } from '@/services/firebase';

interface tagsProps {
  DocCollection: string
  DocReference: string

}

export async function FetchInfoProducts({DocCollection, DocReference}:tagsProps) {
  let Producs:any
  
  try {
    const infoDatabase = getFirestore(app);
    const docCollection = collection(infoDatabase, `${DocCollection}`);
    const docReference = doc(docCollection, `${DocReference}`);
    const docSnap = await getDoc(docReference);

    if (docSnap.exists()) {
      const data = docSnap.data();
      Producs = data;
    } else {
      console.log('Documento não encontrado!');
    }
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
  }
  
  return await Producs;
    
}