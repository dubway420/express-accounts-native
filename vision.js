import { Button, Image, StyleSheet, Text, View, Platform } from "react-native";
import {API_KEY} from './keys'

const API_URL = `https://eu-vision.googleapis.com/v1/images:annotate?key=${API_KEY}`;

export async function callGoogleVisionAsync(image) {
  const body = {
    requests: [
      {
        image: {
          content: image,
        },
        features: [
          {
            type: "DOCUMENT_TEXT_DETECTION"
          },
        ],
      },
    ],
  };

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const parsed = await response.json();

  // console.log(parsed)

  // console.log("type", typeof(parsed.responses[0].fullTextAnnotation.text))
  return parsed.responses[0].fullTextAnnotation.text;
}