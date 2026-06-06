import React,{useState} from "react";
import {View,TextInput,Button} from "react-native";
import api from "../services/api";

export default function AddComplaint({navigation}){

 const [title,setTitle]=useState("");
 const [description,setDescription]=useState("");

 const save=async()=>{
   await api.post("addComplaint.php",{title,description});
   navigation.goBack();
 };

 return(
  <View>
   <TextInput placeholder="Title" onChangeText={setTitle}/>
   <TextInput placeholder="Description" onChangeText={setDescription}/>
   <Button title="Save" onPress={save}/>
  </View>
 );
}