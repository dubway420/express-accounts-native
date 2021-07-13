import React , {Component} from "react"
import { Button, SafeAreaView, ScrollView, Image, Text, View, TextInput, TouchableOpacity, LogBox, Alert } from "react-native";
import {styles} from './styles'
import CheckBox from '@react-native-community/checkbox';
import fire from './fire'
import {months, currencies, categories} from './constants'

let moneyText = "£565"

let dateText = "05 Jul 1987"

let categoryText = "Accomodation"

export const       displayValues = <View style={{alignContent: 'center', width: "60%", marginTop:100}}> 
                                                        <TouchableOpacity
                                                            style = {styles.doneButton}
                                                            onPress = {
                                                                () => saveReceipt()
                                                            }>
                                                            <Text style = {styles.submitButtonText}> Complete </Text>
                                                            </TouchableOpacity>
                                  </View>


