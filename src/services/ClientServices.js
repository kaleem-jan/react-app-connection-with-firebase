import { db } from '../firebase-config';
import { collection, 
    getDocs, 
    getDoc, 
    addDoc, 
    updateDoc, 
    deleteDoc, 
    doc } from 'firebase/firestore';


    const Client = collection(db, "Dashboard");
    const SignUpUser = collection(db, "users");
    class ClientServices{ 
        addClient = (newClient) => {
            return addDoc(Client, newClient)
        }
        updatedClient = (id, updateClient) =>{
            const clientDoc = doc(db,'Dashboard',id);
            return updateDoc(clientDoc, updateClient);
        };
        deleteClient = (id) =>{
            const clientDoc = doc(db, 'Dashboard', id);
            return deleteDoc(clientDoc);
        }
        getAllClients = () =>{
            return getDocs(Client);
        }
        getClient = (id) =>{
            const clientDoc = doc(db, 'ClientServices', id);
            return getDoc(clientDoc);
        }
        allSignUpUser = () =>{
            
            return getDocs(SignUpUser)
        }
    }
   
    export default new ClientServices();