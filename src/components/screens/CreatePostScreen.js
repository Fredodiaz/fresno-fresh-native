// Native Imports
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const CreatePostScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text>Create Post Screen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CreatePostScreen