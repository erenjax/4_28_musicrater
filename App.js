//React-native App.js 

import CustomModal from "./components/Modal.js";

import "react-native-gesture-handler";

//import { NavigationContainer } from "@react-navigation/native";
//import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Text,
  View,
  SafeAreaView,
  Button,
  StyleSheet,
  Modal,
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
                    displayCompleted=true
                    }
                title="Playlist"
                color="#841584"
                accessibilityLabel="Click this button to see playlisted songs"
            />

            <Text style={StyleSheet.instructions}>All Songs</Text>
            <Button
                className={viewCompleted ? "" : "active"}
                onPress={() => 
                    displayCompleted=false}
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
      const [ viewCompleted ] = useState();
      var newItems = {};
      if (viewCompleted){
       newItems = RatingList.filter(
        (item) => setCompleted === viewCompleted
        );
      }
      else {
         newItems = RatingList;
      }

      return newItems.map((item) => (
        <li
          key={item}
          className="list-group-item d-flex justify-content-between align-items-center"
        >
          <FlatList
            className={`todo-title mr-2 ${
              viewCompleted ? "completed-todo" : ""
            }`}
            title={item.artist}
          >
            {item.song}, {item.artist}, {item.rating}, {this.average(item)}
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
        </li>
      ));
    };
    //From React App.js
  toggle=() => {
        
      setModal(!modal);

    };
    //this.setState({ modal: !this.state.modal });

    //from React App.js
  handleSubmit = (item) => {
      console.log("handlteSubmit");
      toggle();
      if (song) {
        axios
        .put(`http://localhost:8000/api/userrating/${item.song}/`, item)
        .then((res) => refreshList())
        return;
      } else {
        axios
        .post("http://localhost:8000/api/userrating/", item)
        .then((res) => {
          refreshList(),
          setIsDup(false)})
        .catch((err) => {
            console.log("catch error handle Submit")})
        return(
          <main>
            {console.log("notification")}
            
          </main>)
        }
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

            
              {renderTabList()}
              {renderItems()}
              <View>
                {/*renderTabList()*/}
                {/*renderItems()*/}
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
                <Text> {modal}</Text>
              </View>
              
        
            {modal ? (<Modal
              activeItem={setActiveItem()}
              onSave={handleSubmit()}
              toggle={toggle()}/>):null}
            
            

            
            </SafeAreaView>
          </View>
        
      </View>
    )
}

const styles = StyleSheet.create({
  container: {
     paddingTop: 50,
     paddingLeft: 50,
  },
  stretch: {
     width: 200,
     height: 200,
     resizeMode: 'stretch',
  }
});
