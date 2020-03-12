// Native Imports
import React from 'react'
import { View, StyleSheet, FlatList } from 'react-native'

// Components
import ListingPost from '../ListingPost'

// Icons
import { Ionicons } from '@expo/vector-icons'

// Data
import POSTS from '../../data/listData'

const ListingsScreen = () => {
    const renderPost = itemData => {
      return (
        <ListingPost post={itemData.item}/>
      )
    }

    return (
        <View style={styles.container}>
            <FlatList style={{width: '100%'}} data={POSTS} keyExtractor={item => item.id} renderItem={renderPost}/>
        </View>
    );
}

ListingsScreen.navigationOptions = navData => {
  return {
      headerLeft: () => <Ionicons style={{marginLeft: 10}} size={34} color="black" name="ios-menu" onPress={()=>navData.navigation.openDrawer()}/>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});

export default ListingsScreen