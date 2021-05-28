import React  from 'react';
import {
        SafeAreaView,
        Text,
        Image, 
        TouchableOpacity, 
        StyleSheet, 
        Dimensions,
        View
    } from 'react-native'

import  { Feather}from '@expo/vector-icons';
import wateringImg from '../assets/watering.png'
import colors from '../styles/colors';
import fonts from '../styles/fonts'
import { useNavigation } from '@react-navigation/core';





export function Welcome(){    

    const navigation = useNavigation();

    function handleStart(){
        navigation.navigate('UserIdentification')
    }


    return(
        <SafeAreaView style={style.container}>
            <View style={style.wrapper}>
                <Text style={style.title}>
                    Gerencie {'\n'}
                    suas plantas de{'\n'}
                    forma fácil
                </Text>
                    <Image 
                        source={wateringImg}
                        style={style.imagen} 
                        resizeMode={'contain'}
                    />
                
                <Text style={style.subTitle}>
                    Não esqueça mais de regar suas {'\n'}
                    plantas. Nós cuidamos de lembrar você
                    sempre que precisar.
                </Text>
                
                <TouchableOpacity
                    style={style.Bottom}
                    activeOpacity={0.7}
                    onPress={handleStart}    
                >
                    <Feather 
                        name={'chevron-right'}
                        style={style.buttonIcon}
                    />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}
const style = StyleSheet.create({
    container:{
        flex:1,
    },
    wrapper:{
        flex:1,
        alignItems:'center',
        justifyContent:'space-around',
        paddingHorizontal:20
    }, 
    title:{
        fontSize:34, 
        color: colors.heading,
        textAlign:'center',
        fontWeight:'bold',
        marginTop:38,
        fontFamily:fonts.heading,
        lineHeight:34
    },
    subTitle:{
        textAlign:'center',
        fontSize:17,
        paddingHorizontal:20,
        color:colors.heading,
        fontFamily:fonts.text,
    },
   
    imagen:{
        height:Dimensions.get('window').width * 0.7,
    },
    Bottom:{
        marginBottom: 30,
        backgroundColor:colors.green,
        justifyContent:'center',
        alignItems:'center', 
        borderRadius:16,
        height:56,
        width:56,
        paddingHorizontal: 10,
    },
        buttonText:{
        color:colors.white,
        fontSize:24,
    },
    buttonIcon:{
        fontSize:32, 
        color:colors.white, 
    }
})