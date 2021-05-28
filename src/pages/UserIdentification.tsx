import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react';
import {
    SafeAreaView,
    View,
    StyleSheet,
    Text,
    TextInput,
    KeyboardAvoidingView,
    Platform, 
    TouchableWithoutFeedback,
    Keyboard,
    Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Button } from '../components/Button'
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function UserIdentification(){
    
    
    const navigation = useNavigation();

    async function handleSubmit(){
        if(!name)
            return Alert.alert('Me diz como chamar você 😢');
        try {
            await AsyncStorage.setItem('@plantManage:user',name);
            navigation.navigate('Confirmation',{
                title:'Prontinho',
                subTitle:'Agora vamos começar a cuidar das suas plantinhas com muito cuidado.',
                buttonTitle:'Começar',
                icon:'smile',
                nextScrem:'PlantSelect'
            } )
        } catch  {
            Alert.alert('Não foi possível salvar seu nome! 😢');
        }
        
       
    } 


    const [isFocused, setIsFocused] = useState(false)
    const [isFilled, setIsFilled] = useState(false)
    const [name, setName] = useState<string>()
    function handleInputBluer(){
        setIsFocused(false);
        setIsFilled(!!name)
    }
    function handerInputFocus(){
        setIsFocused(true);
    }
    function handerInputChanger(value: string){
        setIsFilled(!! value);
        setName(value)
    }
        
    return(
        <SafeAreaView style={styles.container}> 
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding': 'height'}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.content}>
                        <View style={styles.form}>
                            <View style={styles.header}>
                                <Text style={styles.emoji}>
                                    {isFilled ? '😄':'😃'}
                                </Text>
                                <Text style={styles.title} >
                                    Como podemos {'\n'}chamar você?
                                </Text>
                            </View>
                            <TextInput
                                style={[
                                    styles.input,
                                    (isFocused || isFilled) &&
                                    {borderColor:colors.green}
                                ]}
                                placeholder='Digite um Nome'
                                onBlur={handleInputBluer}
                                onFocus={handerInputFocus} 
                                onChangeText={handerInputChanger}                       
                            />
                            <View style={styles.footer}>
                                <Button 
                                    title='Confirmar'
                                    onPress={handleSubmit}
                                />
                            </View>

                            
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        width:'100%',
        alignItems:'center',
        justifyContent:'center'
    },
    content:{
        flex:1,
        width:'100%'
    },
    form:{
        flex:1,
        justifyContent:'center',
        paddingHorizontal:54,
        alignItems:'center',

    },
    header:{
        alignItems:'center'
    },
    emoji:{
        fontSize:44,
    },
    title:{
        fontSize:24,
        lineHeight:32,
        fontFamily:fonts.heading,
        color:colors.heading,  
        textAlign:'center',
        marginTop:20
    },
    input:{
        borderBottomWidth:1,
        borderColor:colors.gray, 
        width:'100%', 
        fontSize:18,
        marginTop:50,
        padding:10,
        textAlign:'center',
        
    }, 
    footer:{
        width:'100%',
        marginTop:40,
        paddingHorizontal:20
    }


});
