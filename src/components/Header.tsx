import AsyncStorage from '@react-native-async-storage/async-storage'
import {
    View,
    Text,
    StyleSheet,
    Image
    
} from 'react-native'

import React, {useEffect, useState} from 'react'

import userImg from '../assets/Avatar.png'
import colors from '../styles/colors'
import fonts from '../styles/fonts'




export function Header(){
    const [userName, setUserName] = useState<string>();

    useEffect(()=>{
        async function loadStorageUserName() {
            const user = await AsyncStorage.getItem('@plantManage:user')
            setUserName(user || '')
        }

        loadStorageUserName();

    },[]);
    return(
        <View style={styles.container}> 
            <View>
                <Text style={styles.greeting}>Olá</Text>
                <Text style={styles.userName}>
                    {userName} 
                </Text>
            </View>
            <Image style={styles.image} source={userImg}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingVertical:20,

    },
    greeting:{
        fontSize:32,
        color:colors.heading,
        fontFamily:fonts.text
    },
    userName:{
        fontSize:32,
        color:colors.heading,
        fontFamily:fonts.heading,
        lineHeight:40,
    },
    image:{
        width:75,
        height:75, 
        borderRadius:50,

    }
});
