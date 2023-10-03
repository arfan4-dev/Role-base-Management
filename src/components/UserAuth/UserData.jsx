import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getFirestore,
  collection,
  getDocs,
  updateDoc,
  
} from 'firebase/firestore';
// import { deleteUser } from "firebase/auth";
import LoaderSpinner from './LoaderSpinner';
import { useUserAuth } from '../context/AuthContext';
import { deleteDoc, doc } from 'firebase/firestore';
import { deleteUser,updatePassword   } from 'firebase/auth';
const UsersData = () => {
  const [data, setData] = useState([]); // State to store your data
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [updatedUserData, setUpdatedUserData] = useState({}); // State to store updated user data
  const navigate = useNavigate();
  const { users } = useUserAuth();


  const handleDeleteUser = async (id) => {
    deleteUser(users,id).then(() => {
      navigate('/home')
      console.log("Deleted")
    }).catch((error) => {
      // An error ocurred
      console.log(error)
    });

    try {


      const db = getFirestore(); // Initialize Firestore
      const userDocRef = doc(db, 'users', id); // Reference to the user document in Firestore
      // await userDelete(auth,id);
      await deleteDoc(userDocRef); // Delete the user document
      // After successful deletion, you can update the local data state if needed.
      // For example, you can filter out the deleted user from the 'data' state.
      setData((prevData) => prevData.filter((item) => item.id !== id));
      
    } catch (error) {
      console.error('Error deleting user from Firestore:', error);
      // Handle the error as needed
    }
  };

  const handleOpenModal = (userData) => {
    setIsModalOpen(true);
    setUpdatedUserData(userData);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setUpdatedUserData({});
  };

  const handleUpdateUser = async (id) => {
    try {
      const db = getFirestore();
      const userDocRef = doc(db, 'users', id);
      await updateDoc(userDocRef, updatedUserData);
      setData((prevData) =>
        prevData.map((item) => (item.id === id ? { ...item, ...updatedUserData } : item))
      );
      handleCloseModal(); // Close the modal after successful update
    } catch (error) {
      console.error('Error updating user in Firestore:', error);
      // Handle the error as needed
    }
  };








  useEffect(() => {
    if (users) {
      // Function to fetch data from Firestore when the user is authenticated
      const fetchData = async () => {
        try {
          const db = getFirestore(); // Initialize Firestore
          const collectionRef = collection(db, 'users'); // Replace with your collection name
          const querySnapshot = await getDocs(collectionRef);

          const fetchedData = [];
          querySnapshot.forEach((doc) => {
            fetchedData.push({ id: doc.id, ...doc.data() });
          });

          setData(fetchedData);
          setLoading(false); // Data is fetched, set loading to false
        } catch (error) {
          console.error('Error fetching data from Firestore:', error);
          // Handle the error as needed
        }
      };

      fetchData(); // Call the function to fetch data when the user is authenticated
    } else {
      // If the user is not authenticated, clear the data and set loading to false
      setData([]);
      setLoading(false);
    }
  }, [users]); // Re-run the effect when the user's authentication state changes

  if (loading) {
    return <LoaderSpinner />; // You can show a loading spinner while data is being fetched
  }

  return (
    <div className="mt-6 p-6 bg-white rounded-lg shadow-md">
    <h1 className="text-2xl font-semibold mb-4">User Data</h1>
    <table className="min-w-full">
      <thead>
        <tr>
          <th className="text-left">Email</th>
          <th className="text-left">Role</th>
          <th className="text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.email}</td>
            <td>{item.role}</td>
            <td>
              <button
                onClick={() => handleDeleteUser(item.id)}
                className="text-red-600 hover:text-black mr-2"
              >
                Delete
              </button>
              <button
                onClick={() => handleOpenModal(item)}
                className="text-green-600 hover:text-black mr-2"
              >
                Update
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    {isModalOpen && (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white p-4 w-96 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Update User</h2>
          <input
            type="text"
            placeholder="New Email"
            value={updatedUserData.email || ''}
            onChange={(e) => setUpdatedUserData({ ...updatedUserData, email: e.target.value })}
            className="w-full p-2 mb-2 border rounded"
          />
          <input
            type="password"
            placeholder="New Password"
            value={updatedUserData.password || ''}
            onChange={(e) => setUpdatedUserData({ ...updatedUserData, password: e.target.value })}
            className="w-full p-2 mb-2 border rounded"
          />
          <div className="flex justify-end">
            <button
              onClick={() => handleUpdateUser(updatedUserData.id)}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mr-2"
            >
              Save
            </button>
            <button
              onClick={handleCloseModal}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
  );
};

export default UsersData;
