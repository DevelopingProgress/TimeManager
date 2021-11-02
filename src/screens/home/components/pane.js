import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Card, Text } from 'react-native-elements'
import { Colors } from '../../../reusable/tools'

export const Pane = (props) => {
    return (
        <Card containerStyle={styles.container}>
            <Card.Title>
                <Text style={styles.cardTitle}>{props.title}</Text>
            </Card.Title>
            <Card.Image style={{height: 220}} source={props.image}/>
            <View style={{margin: 15}}>
                <Text style={{fontSize: 20, textAlign: 'center'}}>
                    {props.sub}
                </Text>
            </View>
            <View>
                <Button 
                    title='Przejdź' 
                    buttonStyle={{backgroundColor: Colors.blue}}
                    onPress={() => props.navigation.navigate(props.navigate)}
                />
            </View>
        </Card>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: '#fff',
    },
    container: {
        marginBottom: 20
    },
    greetingText: {
        fontSize: Platform.OS === 'android' ? 25 : 20
    },
    greetingName: {
        fontSize: Platform.OS === 'android' ? 25 : 20, 
        fontWeight: 'bold', 
        color: Colors.blue
    },
    cardTitle: {
        fontSize: 25
    }
})
