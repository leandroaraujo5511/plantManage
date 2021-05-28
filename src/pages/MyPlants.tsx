import React, { useEffect, useState } from 'react'
import {
    StyleSheet,
    View, 
    Text, 
    Image,
    FlatList,
    Alert
} from 'react-native'
import {
    AdMobBanner,
    AdMobInterstitial,    
} from 'expo-ads-admob';
import { Header } from '../components/Header'
import colors from '../styles/colors'
import waterdrop from '../assets/waterdrop.png'
import fonts from '../styles/fonts'
import { loadPlant, PlantProps, removePlant, storagePlantProps } from '../libs/storage'
import { formatDistance } from 'date-fns/esm'
import { pt } from 'date-fns/locale'
import { PlantCardSecondary } from '../components/PlantCardSecondary'
import { Load } from '../components/Load'
import { ScrollView } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { anuncio } from '../components/anuncio';



export function MyPlants() {

    const [myPlants, setMyPlants] =  useState<PlantProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [nextWatered, setNextWatered] = useState<string>();


    function handleRemove(plant:PlantProps) {
        Alert.alert('Remover', `Deseja remover a ${plant.name}?`,[
            {
                text:'Não 🙌',
                style:'cancel'
            },
            {
                text:'Sim 😢',
                onPress: async  () => {
                  try {
                    await removePlant(plant.id)
                    setMyPlants((oldData) => 
                        oldData.filter((item)=> item.id !== plant.id)
                    );
                  } catch (error) {
                      Alert.alert('Não foi possível remover 😢')
                  }  
                }
            }

        ])
    }

    useEffect(()=>{
        async function loadStorageData() {
            const plantsStorage = await loadPlant();
            const nextTime =  formatDistance(
                new Date(plantsStorage[0].dateTimeNotification).getTime(),
                new Date().getTime(),
                {locale: pt}
            );
            setNextWatered(
                `Não esqueça de regar a ${plantsStorage[0].name} a ${nextTime} horas.`
            )
            setMyPlants(plantsStorage);
            setLoading(false)
        }

        loadStorageData()
    },[])

    // useEffect(() =>{
    //     async function loadAD() {
    //         await AdMobInterstitial.setAdUnitID('ca-app-pub-3940256099942544/1033173712')
    //         interstitalAd();
    //     }
        
    // },[]);

    // async function loadAD() {
    //     await AdMobInterstitial.setAdUnitID('ca-app-pub-1827224878455659/7561084534')
    //     interstitalAd();
    // }
    // async function interstitalAd() {
    //     await AdMobInterstitial.requestAdAsync({servePersonalizedAds:true});
    //     await AdMobInterstitial.showAdAsync();
    // }
    
    if(loading)
        return <Load/>
    return (
        <View style={styles.container}>
            <Header/>
            <View style={styles.spotlight}>
                <Image 
                    source={waterdrop}
                    style={styles.spotlightImage}
                />
                <Text style={styles.spotlightText}>
                    {nextWatered}
                </Text>
            </View>

            <View style={styles.plants}>
                <Text style={styles.plantsTitle}>
                    Próxima regadas
                </Text>
                <ScrollView
                >

                    <FlatList
                        data={myPlants}
                        keyExtractor={(item) => String(item.id)}
                        renderItem={({item}) =>
                        <PlantCardSecondary 
                        data={item}
                        handleRemove={() => {handleRemove(item)}}
                        />
                    }
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ flex:1 }}
                    
                    />
                </ScrollView>

               
            </View>
            <View >
            
                <AdMobBanner 
                    bannerSize="fullBanner"
                    adUnitID="ca-app-pub-3940256099942544/6300978111" // Test ID, Replace with your-admob-unit-id
                    servePersonalizedAds // true or false
                    onDidFailToReceiveAdWithError={(err) => console.log(err)}          
                    style={styles.anuncio}
                />

            </View> 
        </View>
    )
}

const styles  = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'space-between',
        
        paddingHorizontal:30,
        paddingTop:50,
        backgroundColor:colors.background, 
    },
    spotlight:{   
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:colors.blue_light,
        paddingHorizontal:20,
        borderRadius:20,
        height:100,
        position:'relative'
    },
    spotlightImage:{
        width: 40,
        height: 40,

        
    },
    spotlightText:{
        flex:1,
        color:colors.blue, 
        textAlign:'justify',
        paddingHorizontal:20
        
    },
    plants:{
        flex:1,
        width:'100%',
        
    },
    plantsTitle:{
        fontSize:24,
        fontFamily:fonts.heading,
        color:colors.heading,
        marginVertical:20
    },
    anuncio:{
        marginTop:5,
        width:'100%',
        height:40, 
        borderRadius:50,
        marginHorizontal:20
    }
})