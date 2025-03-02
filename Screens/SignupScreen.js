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
import { authentification, database } from "./../FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import uuid from "react-native-uuid";

const SignupScreen = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);

  // We use UseState hook here to store the user credentials
  const [userCredentials, setUserCredentials] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { email, password, username } = userCredentials;

  const uid = uuid.v4();

  // Sign up method - We're using Firebase to authentificate the users
  const signUp = () => {
    createUserWithEmailAndPassword(authentification, email, password)
      .then(() => {
        navigation.replace("Login");
        setDoc(doc(database, "users", uid), {
          username: username,
          email: email,
          id: authentification.currentUser.uid,
        });
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          Alert.alert("That email address is already in use!");
        }

        if (error.code === "auth/invalid-email") {
          Alert.alert("That email address is invalid!");
        }

        console.error(error);
      });
  };

  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={AppColors.secondary}
      />
      <ScrollView style={styles.scrollView}>
        <Image source={require("./../assets/logo.png")} style={styles.image} />

        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Sign up</Text>
          <Text style={styles.signupDescription}>
            Register your account and enjoy the journey!
          </Text>
        </View>

        <View style={styles.usernameContainer}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            value={username}
            onChangeText={(val) => {
              setUserCredentials({ ...userCredentials, username: val });
            }}
            style={styles.input}
            keyboardType="name-phone-pad"
            maxLength={12}
          />
        </View>

        <View style={styles.emailContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            value={email}
            onChangeText={(val) => {
              setUserCredentials({ ...userCredentials, email: val });
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
                setUserCredentials({ ...userCredentials, password: val });
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
          <Text style={styles.termsText} numberOfLines={2}>
            By pressing Sign Up you agree to our{" "}
            <Text
              onPress={() => alert("Terms of Service pressed!")}
              style={{ color: AppColors.primary }}
            >
              Terms of Service
            </Text>{" "}
            and{" "}
            <Text
              onPress={() => alert("Privacy Policy pressed!")}
              style={{ color: AppColors.primary }}
            >
              Privacy Policy.
            </Text>
          </Text>
        </View>

        <TouchableOpacity
          style={styles.signupButton}
          activeOpacity={0.5}
          onPress={signUp}
        >
          <Text style={styles.signupButtonText}>Sign up </Text>
        </TouchableOpacity>

        <View style={styles.signinContainer}>
          <Text>Already have an account? </Text>
          <Text
            onPress={() => navigation.replace("Login")}
            style={{ color: AppColors.primary }}
          >
            Sign in{" "}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignupScreen;

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
  usernameContainer: {
    marginHorizontal: 20,
    marginTop: 20,
    borderBottomColor: AppColors.primary,
    borderBottomWidth: 2,
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
    fontSize: 11,
    fontWeight: 400,
    letterSpacing: 0.7,
    lineHeight: 25,
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
