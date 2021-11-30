import React from "react";
import {Input} from "react-native-elements";
import {Colors} from "../tools";
import {Picker} from "@react-native-picker/picker";
import {View} from "react-native";

const ProjectForm  = (props) => {
    // const cities = [
    //     {name:"Los Angeles", id: 1},
    //     {name:"Philadelphia", id: 2},
    //     {name:"Chicago", id: 3},
    //     {name:"Washington DC", id: 4},
    //     {name:"New York", id: 5},
    //     {name:"San Diego", id: 6},
    //     {name:"Fort Worth", id: 7},
    //     {name:"Houston", id: 8},
    //     {name:"Cleveland", id: 9},
    //     {name:"Pittsburg", id: 10},
    //     {name:"Detroit", id: 11},
    //     {name:"Jacksonville", id: 12},
    //     {name:"Denver", id: 13},
    //     {name:"Columbus", id: 14},
    //     {name:"El Paso", id: 15},
    //     {name:"New Orleans", id: 16},
    //     {name:"Cincinnati", id: 17},
    //     {name:"Nashville", id: 18},
    //     {name:"Miami", id: 19},
    //     {name:"Tampa", id: 20},
    //     {name:"Bakersfield", id: 22},
    //     {name:"Tuscon", id: 23},
    //     {name:"Baltimore", id: 25},
    //     {name:"St Louis", id: 26},
    //     {name:"Las Vegas", id: 27},
    //     {name:"Memphis", id: 28},
    //     {name:"Seatle", id: 29},
    //     {name:"San Fransisco", id: 30},
    // ]
    return(
        <>
            <Input
                placeholder='Nazwa projektu'
                onChangeText={props.handleChange('name')}
                onBlur={props.handleBlur('name')}
                value={props.values.name}
                renderErrorMessage={props.errors.name && props.touched.name}
                errorMessage={props.errors.name}
                errorStyle={props.errorStyle}
                maxLength={props.maxLength}
                containerStyle={props.containerStyle}
                inputStyle={props.inputStyle}
            />
            {/*<View style={{marginHorizontal: 50}}>*/}
            {/*    <Picker*/}
            {/*        enabled={true}*/}
            {/*        mode="dropdown"*/}
            {/*        placeholder="Select City"*/}
            {/*        onValueChange={props.handleChange('city_name')}*/}
            {/*        selectedValue={props.values.city_name}*/}
            {/*    >*/}
            {/*        {cities.map((item) => (*/}
            {/*            <Picker.Item*/}
            {/*                label={item.name.toString()}*/}
            {/*                value={item.name.toString()}*/}
            {/*                key={item.id.toString()} />*/}
            {/*        ))}*/}
            {/*    </Picker>*/}
            {/*</View>*/}
        </>
    )
}

export default  ProjectForm