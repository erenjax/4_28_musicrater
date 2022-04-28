//React-native App.js 

import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import React, { useEffect, useState } from "react";
import { 
  FlatList, 
  Text, 
  View,
  SafeAreaView,
  Button,
  StyleSheet,
  Alert,
 } from "react-native";

//import FinalScreen from "./components/finalScreen";
//import InitialScreen from "./components/initialScreen";
import { render } from "react-dom";

export default function App(){
  //const [viewCompleted, isDup, setState] = useState(false, false, "", "", "", "", false);
  //const [song, artist, rating, completed, activateItem, setState] = useState("", "", "", "", false);

  const [username, setUsername] = ("");
  const [song, setSong] = useState("");
  const [artist, setArtist] = useState("");
  const [rating, setRating] = useState("");
  const [completed, setCompleted] = useState(false);

  const [viewCompleted, setViewCompleted] = useState(false);
  const [isDup, setIsDup] =useState(false);
  const [activateItem, setActivateItem] = useState("", "", "", "", false);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  const useEffect = ({}) => {
    //setting up the data 
    fetch("http://localhost:8000/api/userrating/data.json")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };

  const average = (item) => {
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
    };

    //same as React App.js
    const refreshList = () => {
      console.log("refreshList");
      fetch("http://localhost:8000/api/userrating/")
        .then((res) => {
          const RatingList =res.data;
          isDup = false;
        })
        .catch((err)=> {
          console.log(err);
        })
    };

    //Same as React App.js
    const displayCompleted = (status) => {
      if (status) {
        viewCompleted = true;
        return};
      viewCompleted = false;
      return;
    };

    //From React App.js, NEED TO CHANGE HTML CODE TO JSX


    const renderTabList = () => {
      return (
        <div>
            <Text style={styles.instructions}>Playlist</Text>
            <Button
                className={viewCompleted ? "active" : ""}
                onPress={() => 
                    displayCompleted=true
                    }
                title="Playlist"
                color="#841584"
                accessibilityLabel="Click this button to see playlisted songs"
            />

            <Text style={styles.instructions}>All Songs</Text>
            <Button
                className={viewCompleted ? "" : "active"}
                onPress={() => 
                    displayCompleted=false}
                title="All Songs"
                color="#841584"
                accessibilityLabel="Click this button to see all songs"
            />
        </div>
      );
    };

    //from React App.js, NEED TO CHANGE HTML UI TO JSX
    renderItems = () => {
      console.log("renderItems");
      const [ viewCompleted ] = useState;
      var newItems = {};
      if (viewCompleted){
       newItems = RatingList.filter(
        (item) => item.completed === viewCompleted
      );
      }
      else {
         newItems = RatingList;
      }

      return newItems.map((item) => (
        <li
          key={item.id}
          className="list-group-item d-flex justify-content-between align-items-center"
        >
          <span
            className={`todo-title mr-2 ${
              this.state.viewCompleted ? "completed-todo" : ""
            }`}
            title={item.artist}
          >
            {item.song}, {item.artist}, {item.rating}, {this.average(item)}
          </span>
          
          <div>
                <Text style={styles.instructions}>Edit</Text>
                <Button
                  onPress={() => editItem(item)}
                  title="Edit"
                  color="#841584"
                  accessibilityLabel="Edit a rated song"
                />
              
                <Text style={styles.instructions}>Delete</Text>
                <Button
                  onPress={() => handleDelete(item)}
                  title="Delete"
                  color="#841584"
                  accessibilityLabel="Delete a rated song"
                />
          </div>
        </li>
      ));
    };
    //From React App.js
    toggle(() => {
        setState(() => {
            setModal(!modal);
        });
    });

    //from React App.js
    handleSubmit = (item) => {
      console.log("handlteSubmit");
      this.toggle();
      if (item.id) {
        axios
        .put(`http://localhost:8000/api/userrating/${item.id}/`, item)
        .then((res) => refreshList())
        return;
      } else {
        axios
        .post("http://localhost:8000/api/userrating/", item)
        .then((res) => {
          isDup=false,
          refreshList()})
        .catch((err) => {
            console.log("catch error"), 
            isDup=true})
        return(
          <main>
            {console.log("notification")}
            <ReactNotifications>createNotification('error')</ReactNotifications>
          </main>)
      }
      };
    };

    //all from React App.js 
  handleDelete = (item) => {
    axios
      .delete(`http://localhost:8000/api/userrating/${item.id}`)
      .then((res) => refreshList());
    };

  createItem = () => {
    const item = { username = "", song = "", artist = "", rating = "", completed = false },
    activeItem = item, 
    modal = !modal ;
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
    activeItem = item, 
    modal = !modal 
    };
    // Don't need a render funciton, return is for the whole app function
  return (
      <View style={{ flex: 1, padding: 24 }}>
        {isloading ? (
          <Text>Loading...</Text>
        ) : (
          //Once isLoading == false, show fetched data
          <View 
            style={{
              flex: 1,
              flextDirection: "column",
              jusifyContent: "space-between",
            }}
            >
              <Text style={{ fontSize: 18, color: "green", textAlign: "center" }}>
                Music Rater
              </Text>

            <SafeAreaView style={StyleSheet.container}>
              <View>
                <Text style={StyleSheet.title}>
                  The title and onPress handler are required
                </Text>
                <Text style={styles.instructions}>Rate a Song</Text>
                <Button
                  onPress={() => createItem}
                  title="Playlist"
                  color="#841584"
                  accessibilityLabel="Click this button to rate a song!"
                />
              </View>
              {rendeTabList()}
              {renderItems()}
            </SafeAreaView>

        
            {/*ENTER SUBMISSION*/}
            {modal ? (
            <Modal
              activeItem= {activeItem}
              toggle={toggle}
              onSave={handleSubmit}
            />
            ) : null}

            {/*SHOW ERROR MESSAGE IF DUPLICATE SONG ENTERED*/}
            {console.log(isDup)}
            {isDup ? (
              <p>This song has already been rated!</p>
            ): null}


          </View>
        )}
      </View>
    );