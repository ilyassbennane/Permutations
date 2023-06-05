import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Modal,
} from "react-native";

export default function Page2({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [grade, setGrade] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [currentFaculty, setCurrentFaculty] = useState("");
  const [currentFacultyCity, setCurrentFacultyCity] = useState("");
  const [desiredCity, setDesiredCity] = useState("");

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  const handleSignUp = async () => {
    if (
      email === "" ||
      password === "" ||
      name === "" ||
      surname === "" ||
      phone === "" ||
      grade === "" ||
      specialty === "" ||
      currentFaculty === "" ||
      currentFacultyCity === "" ||
      desiredCity === ""
    ) {
      setShowSuccessModal(true);
      return;
    }
    try {
      const response = await fetch(
        "https://troubled-red-garb.cyclic.app/professeurs",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nom: name,
            prenom: surname,
            tel: phone,
            email: email,
            grade: grade,
            specialite: specialty,
            faculteActuelle: currentFaculty,
            villeFaculteActuelle: currentFacultyCity,
            villeDesiree: desiredCity,
            password: password,
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        setShowSuccessModal(true); // Show the success modal
        setTimeout(() => {
          navigation.navigate("Login"); // Navigate to the login screen after a delay
        }, 2000);
      } else {
        const error = await response.json();
        console.error("Failed to add professor:", error.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <View style={styles.container}>
      
      <View style={styles.scrollView}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <TextInput
            placeholder="User Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />

          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
          />

          <TextInput
            placeholder="Name"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />

          <TextInput
            placeholder="Surname"
            value={surname}
            onChangeText={setSurname}
            style={styles.input}
          />

          <TextInput
            placeholder="Phone"
            value={phone}
            onChangeText={setPhone}
            style={styles.input}
          />

          <TextInput
            placeholder="Grade"
            value={grade}
            onChangeText={setGrade}
            style={styles.input}
          />

          <TextInput
            placeholder="Specialty"
            value={specialty}
            onChangeText={setSpecialty}
            style={styles.input}
          />

          <TextInput
            placeholder="Current Faculty"
            value={currentFaculty}
            onChangeText={setCurrentFaculty}
            style={styles.input}
          />

          <TextInput
            placeholder="Current Faculty City"
            value={currentFacultyCity}
            onChangeText={setCurrentFacultyCity}
            style={styles.input}
          />

          <TextInput
            placeholder="Desired City"
            value={desiredCity}
            onChangeText={setDesiredCity}
            style={styles.input}
          />

          <TouchableOpacity onPress={handleSignUp} style={styles.button}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </ScrollView>

        <Modal
          visible={showSuccessModal}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setShowSuccessModal(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>Registration successful!</Text>
              <TouchableOpacity
                onPress={() => {
                  setShowSuccessModal(false);
                  navigation.navigate("Login");
                }}
                style={styles.modalButton}
              >
                <Text style={styles.modalButtonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  scrollView: {
    flex: 1,
    alignSelf: "stretch",
  },
  scrollContent: {
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#446688",
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    width: "80%",
  },
  button: {
    backgroundColor: "black",
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 20,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  modalButton: {
    backgroundColor: "#446688",
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
});
