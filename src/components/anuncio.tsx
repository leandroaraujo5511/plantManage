import React from 'react'
import {
    AdMobBanner,
    AdMobInterstitial,    
} from 'expo-ads-admob';


export async function anuncio(): Promise<void>{
 
   
    async function loadAD() {
        try {
            await AdMobInterstitial.requestAdAsync({servePersonalizedAds:true});
            await AdMobInterstitial.showAdAsync(); 
        } catch (error) {
            
        }
        
    }
    async function interstitalAd() {
        try {
            await AdMobInterstitial.requestAdAsync({servePersonalizedAds:true});
            await AdMobInterstitial.showAdAsync();  
        } catch (error) {
            
        }
        
    }
    
    
    return(
        
        loadAD()
    )
}

