import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";

import LogoImage from "../assets/login.png";

export default function LoginScreen({ onLoginSuccess, navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const handleLogin = () => {
    setLoginError("");

    if (email.trim() === "") {
      setLoginError("Email is required");
      return;
    }
    if (password === "") {
      setLoginError("Password is required");
      return;
    }

    fetch("https://troubled-red-garb.cyclic.app/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Authentication successful") {
          fetch("https://troubled-red-garb.cyclic.app/professeurs")
            .then((response) => response.json())
            .then((professeursData) => {
              const professor = professeursData.find(
                (prof) => prof.email === email
              );
              if (professor) {
                onLoginSuccess(email);
              }
            })
            .catch((error) => {
              console.error("Error retrieving professors data:", error);
            });
        } else {
          setLoginError("Email or password is incorrect");
        }
      })
      .catch((error) => {
        console.error("Error during login:", error);
      });  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={LogoImage} style={styles.logoImage} />
      </View>

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
      {loginError !== "" && (
        <Text style={styles.errorText}>{loginError}</Text>
      )}

      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("Registration")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>
          <Text>{" "}Sign up</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
  },
  logoContainer: {
    marginBottom: 20,
  },
  logoImage: {
    width: 150,
    height: 150,
    resizeMode: "contain",
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
    backgroundColor: "#f0f0f0", 
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#446688", 
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginVertical: 10,
    width: "100%",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    textAlign: "center",
  },
});
