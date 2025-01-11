import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  Image,
  TextInput,
  Pressable,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppColors } from "../utilities/AppColors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { authentification } from "../FirebaseConfig";

const LoginScreen = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [signinCredentials, setSigninCredentials] = useState({
    email: "",
    password: "",
  });
  const { email, password } = signinCredentials;

  // Sign in method - We're using Firebase to authentificate the users
  const signIn = () => {
    signInWithEmailAndPassword(authentification, email, password)
      .then((val) => {console.log(val);});
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={AppColors.secondary}
      />
      <ScrollView style={styles.scrollView}>
        <Image source={require("./../assets/logo.png")} style={styles.image} />

        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Sign in</Text>
          <Text style={styles.signupDescription}>
            Log in and happy shopping!
          </Text>
        </View>

        <View style={styles.emailContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            value={email}
            onChangeText={(val) => {
              setSigninCredentials({ ...signinCredentials, email: val });
            }}
            style={styles.input}
            keyboardType="email-address"
          />
        </View>

        <View style={styles.passwordContainer}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordHideShowContainer}>
            <TextInput
              value={password}
              onChangeText={(val) => {
                setSigninCredentials({ ...signinCredentials, password: val });
              }}
              style={styles.inputPassword}
              keyboardType="accii-capable"
              secureTextEntry={isPasswordVisible}
            />
            <Pressable onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
              <Ionicons
                name={isPasswordVisible ? "eye-off-outline" : "eye-outline"}
                size={24}
                color="black"
              />
            </Pressable>
          </View>
        </View>

        <View style={styles.termsContainer}>
          <Text style={styles.termsText}>Forgot password?</Text>
        </View>

        <TouchableOpacity
          style={styles.signupButton}
          activeOpacity={0.5}
          onPress={signIn}
        >
          <Text style={styles.signupButtonText}>Sign in </Text>
        </TouchableOpacity>

        <View style={styles.signinContainer}>
          <Text>Don't have an account? </Text>
          <Text
            onPress={() => alert("Sign in pressed!")}
            style={{ color: AppColors.primary }}
          >
            Sign up{" "}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.secondary,
  },
  scrollView: {
    flex: 1,
  },
  image: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginTop: 40,
  },
  signupContainer: {
    paddingHorizontal: 20,
    marginTop: 30,
  },
  signupText: {
    fontSize: 25,
  },
  signupDescription: {
    color: AppColors.mutedText,
    marginTop: 2,
  },
  label: {
    fontSize: 16,
    marginTop: 30,
    color: AppColors.mutedText,
  },
  input: {
    color: AppColors.accent,
    fontSize: 16,
  },
  emailContainer: {
    marginHorizontal: 20,
    borderBottomColor: AppColors.primary,
    borderBottomWidth: 2,
  },
  passwordContainer: {
    marginHorizontal: 20,
    borderBottomColor: AppColors.primary,
    borderBottomWidth: 2,
  },
  passwordHideShowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputPassword: {
    flex: 0.9,
    color: AppColors.accent,
    fontSize: 16,
  },
  termsContainer: {
    marginHorizontal: 20,
    marginTop: 30,
  },
  termsText: {
    color: AppColors.mutedText,
    fontSize: 14,
    fontWeight: 400,
    textAlign: "right",
  },
  signupButton: {
    marginTop: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 30,
    borderRadius: 15,
    backgroundColor: AppColors.primary,
  },
  signupButtonText: {
    color: AppColors.secondary,
    fontSize: 18,
  },
  signinContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 20,
    gap: 5,
  },
});
