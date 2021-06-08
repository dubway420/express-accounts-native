import * as ImagePicker from "expo-image-picker";
import React from "react";
import { Button, Image, StyleSheet, Text, View, Platform } from "react-native";
import {callGoogleVisionAsync} from './vision'
import extractData from './extractors'
import fire from './fire'

export default function ImageExtract() {
  const [image, setImage] = React.useState(null);
  const [status, setStatus] = React.useState(null);
  const [signup, setSignup] = React.useState(null);
  const [isPermissionsGranted, setIsPermissionsGranted] = React.useState(
    undefined
  );

  React.useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        setIsPermissionsGranted(true);
        if (status !== "granted") {
          setIsPermissionsGranted(false);
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  if (isPermissionsGranted === false) {
    return (
      <View style={styles.container}>
        <Text>
          You have not granted permission to use the camera on this device!
        </Text>
      </View>
    );
  }

  const takePictureAsync = async () => {
    const { cancelled, uri, base64 } = await ImagePicker.launchImageLibraryAsync({
      base64: true,
    });
    if (!cancelled) {
      setImage(uri);
      setStatus("Loading...");
      try {
        const result = await callGoogleVisionAsync(base64);
        var extracted = extractData(result)

        setStatus(extracted.money.value);
      } catch (error) {
        console.log(error);
        setStatus(`Error: ${error.message}`);
      }
    } else {
      setImage(null);
      setStatus(null);
    }
  };

  const signOut = () => {

    fire.auth().signOut() 

  }


  return (
    <View style={styles.container}>
      {image && <Image style={styles.image} source={{ uri: image }} />}
      {status && <Text style={styles.text}>{status}</Text>}
      <Button onPress={takePictureAsync} title="Select Image" />
      <Button onPress={signOut} title="Sign Out" />
    </View>
    

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 300,
    height: 300,
  },
  text: {
    margin: 5,
  },
});
