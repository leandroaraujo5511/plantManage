import React, { useState } from 'react'
import {
    View,
    Text,
    Alert,
    StyleSheet,
    TouchableOpacity, 
    Image, 
    Platform,
    ScrollView,
} from 'react-native'
import {
    AdMobBanner,
    AdMobInterstitial,    
} from 'expo-ads-admob';
import { getBottomSpace } from 'react-native-iphone-x-helper'
import {SvgFromUri} from 'react-native-svg'
import {useNavigation, useRoute} from '@react-navigation/core'
import DataTimePicker, {Event} from '@react-native-community/datetimepicker'
import { format, isBefore } from 'date-fns'

import waterdrop from '../assets/waterdrop.png'
import { Button } from '../components/Button'
import colors from '../styles/colors'
import fonts from '../styles/fonts'
import { PlantProps, savePlant } from '../libs/storage'
import { anuncio } from '../components/anuncio';

interface Params{
    plant:PlantProps;
};


export function PlantSave() {
    const [selectedDateTime, setSelectedDateTime] = useState(new Date());
    const [showDataPicker, setShowDataPicker] = useState(Platform.OS == 'ios');
    const route = useRoute();
    const {plant} = route.params as Params;
    const navigation = useNavigation();


    
    // useEffect(() =>{
    //     async function loadAD() {
    //         await AdMobInterstitial.setAdUnitID('ca-app-pub-3940256099942544/1033173712')
    //         interstitalAd();
    //     }
        
    // },[]);

    // async function loadAD() {
    //     await AdMobInterstitial.setAdUnitID('ca-app-pub-3940256099942544/1033173712')
    //     interstitalAd();
    // }
    // async function interstitalAd() {
    //     await AdMobInterstitial.requestAdAsync({servePersonalizedAds:true});
    //     await AdMobInterstitial.showAdAsync();
    // }


    function handleOpemDataTimePickerForAndroid() {
        setShowDataPicker(oldState => !oldState)
    }

    function handleChangeTime(event:Event, dataTime: Date | undefined) {
        if(Platform.OS == 'android'){
            setShowDataPicker(oldState => !oldState);
        }

        if(dataTime && isBefore(dataTime, new Date()) ){
            setSelectedDateTime(new Date());
            return Alert.alert('Escolha uma hora no futuro! ⏰')
        }

        if(dataTime)
            setSelectedDateTime(dataTime);
    }

    async function handleSave() {
        // const data  = await loadPlant();
        // console.log(data);

        try {
            anuncio()
        } catch (error) {
            
        }
        
        try {
            await savePlant({
                ...plant, 
                dateTimeNotification:selectedDateTime
                
            })

            navigation.navigate('Confirmation',{
                title:'Tudo Certo',
                subTitle:'Fique tranquilo que sempre vamos lembrar você de cuidar da sua plantinha com bastante amor.',
                buttonTitle:'Muito Obrigado :D',
                icon:'hug',
                nextScrem:'MyPlants'
            } )
        } catch  { 
            Alert.alert('Não foi possivel cadastrar a planta! 😒')
        }


    }

    return(
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.container}
        >
        
            <View style={styles.container}>
                <View style={styles.plantInfo}>
                <SvgFromUri 
                    uri={plant.photo}
                    height={150}
                    width={150}
                />

                <Text style={styles.plantName}>
                        {plant.name}
                    </Text>
                    <Text style={styles.plantAbout}>
                        {plant.about}

                    </Text> 
                </View>
                <View style={styles.controller}>
                    <View style={styles.tipContainer}>
                        <Image 
                            source={waterdrop}
                            style={styles.tipImage}
                        />
                        <Text style={styles.tipText}>
                            {plant.water_tips}
                        </Text>
                    </View>
                    <Text style={styles.alertLabel}>
                        Escolha o melhor horário para ser lembrado.
                    </Text>
                    {showDataPicker && (
                        <DataTimePicker
                            value={selectedDateTime}
                            mode="time"
                            display="spinner"
                            onChange={handleChangeTime}
                        
                        />
                    )}

                    {
                        Platform.OS == 'android' && (
                        <TouchableOpacity 
                            onPress={handleOpemDataTimePickerForAndroid}
                            style={styles.datatimePickerButton}
                        >
                                <Text style={styles.datatimePickerText}>
                                    {`Mudar ${format(selectedDateTime, 'HH:mm')}`}
                                </Text>
                        </TouchableOpacity>
                        )
                    }

                    <Button 
                        title='Cadastrar Planta'
                        onPress={handleSave}
                    />
                </View>
            </View>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'space-between',
        backgroundColor:colors.shape,        
    },
    plantInfo:{
        flex:1,
        paddingHorizontal:30,
        paddingVertical:50,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:colors.shape,
    }, 
    controller:{
        backgroundColor:colors.white,
        paddingHorizontal:20,
        paddingTop:20,
        paddingBottom: getBottomSpace() || 20,  

    }, 
    plantName:{
        fontFamily:fonts.heading,
        fontSize:24,
        color:colors.heading,
        marginTop:15
    },
    plantAbout:{
        textAlign:'center',
        fontFamily:fonts.text,
        color:colors.heading,
        fontSize:17,
        marginTop:10,
    },
    tipContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:colors.blue_light,
        padding:20,
        borderRadius:20,
        position:'relative',
        bottom:20,
        marginTop:5

    },
    tipImage:{
        height:40,
        width:40,
    },
    tipText:{
        flex:1,
        marginLeft:20,
        fontFamily:fonts.text,
        color:colors.blue,
        fontSize:12,
        textAlign: 'justify'
        
    },
    alertLabel:{
        textAlign:'center',
        fontFamily:fonts.complement,
        color:colors.heading,
        fontSize:12,
        marginBottom:5
    },
    datatimePickerButton:{
        width:'100%',
        alignItems:'center',
        paddingVertical:20,

    },
    datatimePickerText:{
        color:colors.heading,
        fontSize:24,
        fontFamily:fonts.text,

    }
})