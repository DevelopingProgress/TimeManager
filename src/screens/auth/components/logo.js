import React from 'react'
import { View } from 'react-native'
import { Image } from 'react-native-elements'
import LogoImage from '../../../assets/images/TimeManagerLogo.png'

export const Logo = () => (
    <View style={{alignItems: 'center'}}>
        <Image
            source={LogoImage}
            resizeMode={'contain'}
            style={{
                width: 250,
                height: 250
            }}
        />
    </View>
)