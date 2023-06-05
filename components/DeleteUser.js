import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';

const DeleteUser = ({ handleDelete }) => {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const handleConfirmDelete = () => {
    setShowConfirmationModal(true);
  };

  const handleCancelDelete = () => {
    setShowConfirmationModal(false);
  };

  return (
    <View style={styles.deleteUserContainer}>
      <TouchableOpacity onPress={handleConfirmDelete}>
        <Text style={styles.deleteUserText}>Delete User</Text>
      </TouchableOpacity>

      <Modal visible={showConfirmationModal} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>Are you sure you want to delete the user?</Text>

          <TouchableOpacity onPress={handleDelete}>
            <Text style={styles.modalButton}>Delete</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleCancelDelete}>
            <Text style={styles.modalButton}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  deleteUserContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteUserText: {
    color: 'red',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },
  modalButton: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: 'red',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
  },
});

export default DeleteUser;
