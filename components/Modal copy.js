//Modal.js Original

import "react-native-gesture-handler";
import * as React from "react";
import React, { useEffect, useState } from "react";
import {CheckBox, Text, StyleSheet, View, TextInput } from "react-native";

import{
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Input,
    Label,
} from "reactstrap";

export default function CustomModal() {
  const [activeItem, setActiveItem] = activeItem;
  //do i need to do anything with props?
  const [isSelected, setSelection] = useState(false);
  const [number, onChangeNumber] = React.useState(null);
  const [text, onChangeText] = React.useState("Useless Text");

  handleChange = (event) => {
    let { name, value } = event.target;
    if (event.target.type === "checkbox") {
        value = event.target.checked;
    }
    const activeItem = { ...activeItem, name=value };
    activeItem
  };

       return(
          <Modal isOpen={true} toggle={toggle}>
          <ModalHeader toggle={toggle}> Song Rating </ModalHeader>
          <ModalBody>
            <Form>

              <SafeAreaView>
                <TextInput 
                  style={styles.input}
                  onChangeText={handleChange}
                  value={activeItem.username}
                  placeholder="username"
                  keyboardType="text"
                />
                <TextInput 
                  style={styles.input}
                  onChangeText={handleChange}
                  value={activeItem.song}
                  placeholder="song"
                  keyboardType="text"
                />
                <TextInput 
                  style={styles.input}
                  onChangeText={handleChange}
                  value={activeItem.artist}
                  placeholder="artist"
                  keyboardType="text"
                />
                <TextInput 
                  style={styles.input}
                  onChangeText={handleChange}
                  value={activeItem.rating}
                  placeholder="rating"
                  keyboardType="numeric"
                />
              </SafeAreaView>

              <View style={styles.container}>
                <View style={styles.checkboxContainer}>
                  <checkboxContainer
                    value={isSelected}
                    onValueChange={setSelection}
                    style={styles.checkbox}
                    />
                    <Text style={styles.label}>Add to Playlist</Text>
                </View>
              </View>

          </Form>
          </ModalBody>
        <ModalFooter>
        <Text style={styles.instructions}>Save</Text>
                <Button
                  onPress={() => onSave(activeItem)}
                  title="Save"
                  color="#841584"
                  accessibilityLabel="Click this button to submit your song rating"
                />
          </ModalFooter>
      </Modal>
    )};