//React-native App.js 



import "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Text,
  View,
  SafeAreaView,
  Button,
  StyleSheet,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  TextInput,
 } from "react-native";





export default function App(){
  //const [viewCompleted, isDup, setState] = useState(false, false, "", "", "", "", false);
  //const [song, artist, rating, completed, activateItem, setState] = useState("", "", "", "", false);

  const [username, setUsername] = useState("");
  const [song, setSong] = useState("");
  const [artist, setArtist] = useState("");
  const [rating, setRating] = useState("");
  const [completed, setCompleted] = useState(false);

  const [viewCompleted, setViewCompleted] = useState(false);
  const [isSelected, setSelection] = useState(false);
  const [isDup, setIsDup] =useState(false);
  const [activeItem, setActiveItem] = useState("", "", "", "", false);
  const [data, setData] = useState([]);
  const [modal, setModal] = useState(false);
  const [RatingList] = useState([]);

  const useEffect = ({}) => {
    //setting up the data 
    fetch("http://localhost:8000/api/userrating/")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };

  /*const average = (item) => {
    var num = 0;
    var total =0;
    for (var i=0; i<this.state.RatingList.length;i++){
      if (state.RatingList[i].song===item.song){
        num = num +1;
        total = total + state.RatingList[i].rating
      };
    };
    if (num===0){
      return 'No ratings yet'

    };
    var avg=total/num
    return avg.toFixed(1)
    };*/

    //same as React App.js
    const refreshList = () => {
      console.log("refreshList");
      fetch("http://localhost:8000/api/userrating/")
        .then((res) => {
          const RatingList =res.data;
          //isDup = false;
        })
        .catch((err)=> {
          console.log(err);
        })
    };

    //Same as React App.js
    const displayCompleted = (status) => {
      if (status) {
        setViewCompleted(true);
        return};
      setViewCompleted(false);
      return;
    };

    //From React App.js, NEED TO CHANGE HTML CODE TO JSX


    const renderTabList = () => {
      return (
        <View>
            <Text style={StyleSheet.instructions}>Playlist</Text>
            <Button
                className={viewCompleted ? "active" : ""}
                onPress={() => 
                    displayCompleted(true)
                    }
                title="Playlist"
                color="#841584"
                accessibilityLabel="Click this button to see playlisted songs"
            />

            <Text style={StyleSheet.instructions}>All Songs</Text>
            <Button
                className={viewCompleted ? "" : "active"}
                onPress={() => 
                    displayCompleted(false)}
                title="All Songs"
                color="#841584"
                accessibilityLabel="Click this button to see all songs"
            />
        </View>
      );
    };

    //from React App.js, NEED TO CHANGE HTML UI TO JSX
  renderItems = () => {
      console.log("renderItems");
      const [ viewCompleted ] = useState(true);
      var newItems = {};
      if (viewCompleted){
       newItems = RatingList.filter(
        (item) => setCompleted === viewCompleted
        );
      }
      else {
         newItems = RatingList;
      }
      newItems=RatingList;

      return newItems.map((item) => (
        <View>
          key={item}
          className="list-group-item d-flex justify-content-between align-items-center"
        >
          <FlatList
            className={`todo-title mr-2 ${
              viewCompleted ? "completed-todo" : ""
            }`}
            title={item.artist}
          >
            {item.song}, {item.artist}, {item.rating}
          </FlatList>
          
          <View>
                <Text style={StyleSheet.instructions}>Edit</Text>
                <Button
                  onPress={() => editItem(item)}
                  title="Edit"
                  color="#841584"
                  accessibilityLabel="Edit a rated song"
                />
              
                <Text style={StyleSheet.instructions}>Delete</Text>
                <Button
                  onPress={() => handleDelete(item)}
                  title="Delete"
                  color="#841584"
                  accessibilityLabel="Delete a rated song"
                />
          </View>
        </View>
      ));
    };
    //From React App.js
  toggle=() => {
        
      setModal(!modal);

    };
    //this.setState({ modal: !this.state.modal });

    //from React App.js
  handleSubmit = (activeItem) => {
      console.log(song);
      setActiveItem((username,song,artist,rating));
      console.log({activeItem});
      toggle();
      {/*{if (song) {
        axios
        .put(`http://localhost:8000/api/userrating/${song}/`, item)
        .then((res) => refreshList())
        return;
      } else {*/}
        axios
        .post("http://localhost:8000/api/userrating/", ({username,song,artist,rating}))
        .then((res) => {
          refreshList(),
          setIsDup(false)})
        .catch((err) => {
            console.log("catch error handle Submit")})
        
        };
      
      
    

    //all from React App.js 
  handleDelete = (item) => {
    axios
      .delete(`http://localhost:8000/api/userrating/${item.id}`)
      .then((res) => refreshList());
    };

  createItem = () => {
    //const [item]  = useState;
    setActiveItem(( "", "", "", "", false));
    setModal(!modal);
    console.log(modal);
    };

  showItem = () => {
    return axios 
      .get("http://localhost:8000/api/userrating")
      .then((response)=> {
          RatingList = response.data})
      .catch((err)=>{
          console.log(err)});
    };

  editItem = (item) => {
    setActiveItem(item), 
    setModal(!modal) 
    };

  const handleChange = (text) => {
      console.log({text})
      let {name, value} = text;
        if (text === "checkbox") {
            value=text.checked;
        }
    

        const activeItem={...activeItem, [name]:value};

        setActiveItem({activeItem});
    };
    // Don't need a render funciton, return is for the whole app function
  return (
      <View style={{ flex: 1, padding: 24 }}>
          <View 
            style={{
              flex: 1,
              flextDirection: "column",
              jusifyContent: "space-between",
            }}
            >
              
            <SafeAreaView style={StyleSheet.container}>
              <Text style={{ fontSize: 18, color: "green", textAlign: "center" }}>
                Music Rater
              </Text>

              {renderItems()}
              {renderTabList()}
              
              <View>
                
                <Text style={StyleSheet.title}>
                  The title and onPress handler are required
                </Text>
                <Text style={StyleSheet.instructions}>Rate a Song</Text>
                <Button
                  onPress={() => createItem()}
                  title="Rate a Song"
                  color="#841584"
                  accessibilityLabel="Click this button to rate a song!"
                />
                
              </View>
              
            
            {modal ?  
            <><View>
              {console.log("reaching Modal.js")}

              <TextInput
                style={StyleSheet.input}
                onChangeText={setUsername}
                value={username}
                keyboardType="default"
                placeholder="username"
                 />

              <TextInput
                style={StyleSheet.input}
                onChangeText={setSong}
                value={song}
                placeholder="song"
                keyboardType="default" />
              <TextInput
                style={StyleSheet.input}
                onChangeText={setArtist}
                value={artist}
                placeholder="artist"
                keyboardType="default" />
              <TextInput
                style={StyleSheet.input}
                onChangeText={setRating}
                value={rating}
                placeholder="rating"
                keyboardType="numeric" />

              <Text>{song},{artist}</Text>
              
            </View><Text style={StyleSheet.instructions}>Save</Text><Button
                onPress={handleSubmit}
                title="Save"
                color="#841584"
                accessibilityLabel="Click this button to submit your song rating" /></>
           
      
            
             :null}
          
      
            

            
              </SafeAreaView>
          </View>
        
      </View>
    )
}
