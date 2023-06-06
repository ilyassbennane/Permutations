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

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nameError, setNameError] = useState("");
  const [surnameError, setSurnameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [gradeError, setGradeError] = useState("");
  const [specialtyError, setSpecialtyError] = useState("");
  const [currentFacultyError, setCurrentFacultyError] = useState("");
  const [currentFacultyCityError, setCurrentFacultyCityError] = useState("");
  const [desiredCityError, setDesiredCityError] = useState("");

  const handleSignUp = async () => {
    setEmailError("");
    setPasswordError("");
    setNameError("");
    setSurnameError("");
    setPhoneError("");
    setGradeError("");
    setSpecialtyError("");
    setCurrentFacultyError("");
    setCurrentFacultyCityError("");
    setDesiredCityError("");

    let isValid = true;

    if (email === "") {
      setEmailError("Email field is required.");
      isValid = false;
    }
    if (password === "") {
      setPasswordError("Password field is required.");
      isValid = false;
    }
    if (name === "") {
      setNameError("Name field is required.");
      isValid = false;
    }
    if (surname === "") {
      setSurnameError("Surname field is required.");
      isValid = false;
    }
    if (phone === "") {
      setPhoneError("Phone field is required.");
      isValid = false;
    }
    if (grade === "") {
      setGradeError("Grade field is required.");
      isValid = false;
    }
    if (specialty === "") {
      setSpecialtyError("Specialty field is required.");
      isValid = false;
    }
    if (currentFaculty === "") {
      setCurrentFacultyError("Current Faculty field is required.");
      isValid = false;
    }
    if (currentFacultyCity === "") {
      setCurrentFacultyCityError("Current Faculty City field is required.");
      isValid = false;
    }
    if (desiredCity === "") {
      setDesiredCityError("Desired City field is required.");
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    try {
      // Code for making the API call and handling the response
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
            required
          />
          <Text style={styles.errorText}>{emailError}</Text>

          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
            required
          />
          <Text style={styles.errorText}>{passwordError}</Text>

          <TextInput
            placeholder="Name"
            value={name}
            onChangeText={setName}
            style={styles.input}
            required
          />
          <Text style={styles.errorText}>{nameError}</Text>

          <TextInput
            placeholder="Surname"
            value={surname}
            onChangeText={setSurname}
            style={styles.input}
            required
          />
          <Text style={styles.errorText}>{surnameError}</Text>

          <TextInput
            placeholder="Phone"
            value={phone}
            onChangeText={setPhone}
            style={styles.input}
            required
          />
          <Text style={styles.errorText}>{phoneError}</Text>

          <TextInput
            placeholder="Grade"
            value={grade}
            onChangeText={setGrade}
            style={styles.input}
            required
          />
          <Text style={styles.errorText}>{gradeError}</Text>

          <TextInput
            placeholder="Specialty"
            value={specialty}
            onChangeText={setSpecialty}
            style={styles.input}
            required
          />
          <Text style={styles.errorText}>{specialtyError}</Text>

          <TextInput
            placeholder="Current Faculty"
            value={currentFaculty}
            onChangeText={setCurrentFaculty}
            style={styles.input}
            required
          />
          <Text style={styles.errorText}>{currentFacultyError}</Text>

          <TextInput
            placeholder="Current Faculty City"
            value={currentFacultyCity}
            onChangeText={setCurrentFacultyCity}
            style={styles.input}
            required
          />
          <Text style={styles.errorText}>{currentFacultyCityError}</Text>

          <TextInput
            placeholder="Desired City"
            value={desiredCity}
            onChangeText={setDesiredCity}
            style={styles.input}
            required
          />
          <Text style={styles.errorText}>{desiredCityError}</Text>

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
          {/* Success modal content */}
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
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginVertical: 10,
    width: "100%",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#446688",
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
  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 5,
    alignSelf: "flex-start",
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
