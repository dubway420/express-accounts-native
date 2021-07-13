import React , {Component} from "react"
import { Button, SafeAreaView, ScrollView, Image, Text, View, TextInput, TouchableOpacity, LogBox, Alert } from "react-native";
import {styles} from './styles'
import CheckBox from '@react-native-community/checkbox';

let moneyText = "£565"

let dateText = "05 Jul 1987"

let categoryText = "Accomodation"

export const       displayValues = <View style={{alignContent: 'center', width: "60%"}}> 
                                        <Text style={styles.outline}>We were able to extract the following information from this image: </Text> 

                                        <View style={styles.CheckBoxContainer}> 
                                            <Text style={styles.outline}> </Text> 
                                            <Text style={styles.outline}> Accept? </Text> 
                                        </View>

                                        <View style={styles.CheckBoxContainer}> 
                                            <Text style={styles.outline}> Amount:  {moneyText}</Text> 
                                            <CheckBox style={styles.checkBoxActual} disabled={false} value={false} onValueChange={(newValue) => setToggleCheckBox(newValue)} /> 
                                        </View>

                                        <View style={styles.CheckBoxContainer}> 
                                            <Text style={styles.outline}> Date: {dateText} </Text>
                                            <CheckBox style={styles.checkBoxActual} disabled={false} value={false} onValueChange={(newValue) => setToggleCheckBox(newValue)} /> 
                                        </View>

                                        <View style={styles.CheckBoxContainer}> 
                                            <Text style={styles.outline}> Category: {categoryText} </Text>
                                            <CheckBox style={styles.checkBoxActual} disabled={false} value={false} onValueChange={(newValue) => setToggleCheckBox(newValue)} /> 
                                        </View>
                                  </View>