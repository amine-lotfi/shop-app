import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  ProgressBarAndr,
  ActivityIndicator,
} from "react-native";
import React, { useEffect } from "react";
import { AppColors } from "../utilities/AppColors";
import { useNavigation } from "@react-navigation/native";
const AppLogo = require("./../assets/logo.png");

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.replace("Signup");
    }, 4000);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={AppColors.primary} />
      <View style={styles.contentContainer}>
        <Image style={styles.logoImage} source={AppLogo} />
        <View>
          <Text style={styles.logoText}>ShopApp </Text>
          <Text style={styles.logoUnderText}>Happy Shopping! </Text>
        </View>
      </View>
      <ActivityIndicator
        size="50"
        color={AppColors.secondary}
        animating={true}
        style={{ marginTop: 30 }}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
  },
  logoImage: {
    width: 80,
    height: 80,
  },
  logoText: {
    fontSize: 40,
    color: AppColors.secondary,
  },
  logoUnderText: {
    color: AppColors.secondary,
    letterSpacing: 2,
    textAlign: "center",
    top: -4,
  },
});
