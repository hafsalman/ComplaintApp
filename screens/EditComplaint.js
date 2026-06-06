import React,{useState} from "react";
import {View,TextInput,Button} from "react-native";
import api from "../services/api";

export default function EditComplaint({route,navigation}){

 const {item}=route.params;

 const [title,setTitle]=useState(item.title);
 const [description,setDescription]=useState(item.description);

 const update=async()=>{
   await api.post("updateComplaint.php",
     {id:item.id,title,description});
   navigation.goBack();
 };

 return(
  <View>
   <TextInput value={title} onChangeText={setTitle}/>
   <TextInput value={description} onChangeText={setDescription}/>
   <Button title="Update" onPress={update}/>
  </View>
 );
}