//Modal.js Original

import "react-native-gesture-handler";
import * as React from "react";
import { useEffect, useState } from "react";

import{
  CheckBox, Text, StyleSheet, View, TextInput,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Input,
    Label,
    SafeAreaView,
} from "react-native";

export default function CustomModal(props) {
  const [username, setUsername] = useState("");
  const [song, setSong] = useState("");
  const [artist, setArtist] = useState("");
  const [rating, setRating] = useState("");
  const [completed, setCompleted] = useState(false);
  const [activeItem, setActiveItem] = useState(props);
  const [isSelected, setSelection] = useState(false);
  const [number, onChangeNumber] = React.useState(null);
  const [text, onChangeText] = React.useState("");

  const handleChange = (event) => {
    let { name, value } = event.target;
    if (event.target.type === "checkbox") {
        value = event.target.checked;
    }
    const activeItem = { ...activeItem, name:value };
    setActiveItem(props);
  };

  const[toggle, onSave]=useState(props);

       return(
          <Modal visible={true} isOpen={true} toggle={toggle} >
          <ModalHeader toggle={toggle} > Song Rating </ModalHeader>
          <ModalBody>
            <Form>
            {console.log("reaching Modal.js")}
              <SafeAreaView>
                <TextInput 
                  style={StyleSheet.input}
                  onChangeText={handleChange}
                  value={username}
                  placeholder="username"
                  keyboardType="text"
                />
                
                <TextInput 
                  style={StyleSheet.input}
                  onChangeText={handleChange}
                  value={song}
                  placeholder="song"
                  keyboardType="text"
                />
                <TextInput 
                  style={StyleSheet.input}
                  onChangeText={handleChange}
                  value={artist}
                  placeholder="artist"
                  keyboardType="text"
                />
                <TextInput 
                  style={StyleSheet.input}
                  onChangeText={handleChange}
                  value={rating}
                  placeholder="rating"
                  keyboardType="numeric"
                />
              </SafeAreaView>

              <View style={StyleSheet.container}>
                <View style={StyleSheet.checkboxContainer}>
                  <checkboxContainer
                    value={isSelected}
                    onValueChange={setSelection}
                    style={StyleSheet.checkbox}
                    />
                    <Text style={StyleSheet.label}>Add to Playlist</Text>
                </View>
              </View>

          </Form>
          </ModalBody>
        <ModalFooter>
        <Text style={StyleSheet.instructions}>Save</Text>
                <Button
                  onPress={() => onSave(activeItem)}
                  title="Save"
                  color="#841584"
                  accessibilityLabel="Click this button to submit your song rating"
                />
          </ModalFooter>
      </Modal>
    )};
