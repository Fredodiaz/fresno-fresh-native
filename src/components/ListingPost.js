// Native Imports
import React, { useState } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

// Icons
import { FontAwesome } from '@expo/vector-icons'

const ListingPost = ({post}) => {
    const [ heartType, changeHeart ] = useState('heart-o')

    const toggleHeart = (heart) => {
        if(heart === 'heart'){
            changeHeart('heart-o')
        } else {
            changeHeart('heart')
        }
    }

    return (
        <View style={styles.postWrap}>
            <View style={styles.profileWrap}>
                <Image style={styles.profileImg} source={{uri: post.profileImg}}/>
                <View style={styles.profileDescWrap}>
                    <Text style={styles.posterName}>{post.posterName}</Text>
                    <Text style={styles.posterType}>Producer</Text>
                </View>
            </View>
            <Image style={styles.postImage} source={{uri: post.profileImg}}/>
            <View style={styles.postDescWrap}>
                <Text style={styles.postTitle}>{post.postTitle}</Text>
                <Text style={styles.postDescription}>{post.description}</Text>
            </View>
            <View style={styles.likesWrap}>
                <FontAwesome onPress={() => toggleHeart(heartType)} style={styles.likeIcon} size={32} color="pink" name={heartType}/>
                <Text style={styles.likes}>{post.likes}</Text>
            </View>
            <View style={styles.hrWrap}>
                <View style={styles.hr}></View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    postWrap: {
        marginHorizontal: 5,
        marginVertical: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 7,
    },
    profileWrap: {
        flexDirection: 'row',
        padding: 10,
    },
    profileImg: {
        width: 70,
        height: 70,
        borderRadius: 70,
    },
    profileDescWrap: {
        marginLeft: 20
    },
    posterName: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    posterType: {
        fontSize: 20,
    },
    postImage: {
        width: '100%',
        height: 200,
    },
    postDescWrap: {
        padding: 5,
    },
    postTitle: {
        fontSize: 20,
    },
    postDescription: {
        fontSize: 18,
        marginBottom: 3,
    },
    likesWrap: {
        flexDirection: 'row',
        paddingBottom: 5,
    },
    likeIcon: {
        marginLeft: 15,
        marginRight: 7,
    },
    likes: {
        fontSize: 26,
        marginTop: -3,
    },
    hrWrap: {
        alignItems: 'center',
        padding: 3
    },
    hr: {
        borderWidth: 1,
        borderColor: '#aaa',
        width: '90%',
    }
})

export default ListingPost