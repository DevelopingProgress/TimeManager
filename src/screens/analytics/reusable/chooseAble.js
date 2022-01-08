import React from 'react';

import {StyleSheet, Text, View} from 'react-native';
import {Menu, MenuOption, MenuOptions, MenuTrigger} from "react-native-popup-menu";
import {Icon} from "react-native-elements";
import {Loading} from "../../../reusable/utils/loading";
import {Colors} from "../../../reusable/utils/tools";

const ChooseAble = (props) => {

    const data = props.data
    const {categories, projects, loading, categoriesTrigger, setCategoriesTrigger,
        projectsTrigger, setProjectsTrigger, category, setCategory, setProject} = data


    return (
        loading ? <View style={{alignItems: 'center'}}><Loading circlesnail/></View> :
                <View style={styles.row}>
                    <View style={styles.rowContainer}>
                        <Menu onSelect={(value) => {
                            if(value.id) {
                                setCategory(value)
                                setCategoriesTrigger(value.name)
                                setProjectsTrigger('Wszystkie projekty')
                            } else {
                                setCategory(null)
                                setProject(null)
                                setCategoriesTrigger(value.name)
                                setProjectsTrigger('Wszystkie projekty')
                            }
                        }}>
                            <MenuTrigger>
                                <View style={{flexDirection: 'row', alignContent: 'center'}}>
                                    <Text style={styles.rowText}>{categoriesTrigger}</Text>
                                    <Icon type='antdesign' name='caretdown' size={10} style={{marginTop: 7, flex: 0.5}}/>
                                </View>
                            </MenuTrigger>
                            <MenuOptions optionsContainerStyle={{marginTop: 20}}>
                                <MenuOption value={{name: 'Wszystkie kategorie'}}>
                                    <Text style={[styles.optionStyle, {color: Colors.black}]}>Wszystkie kategorie</Text>
                                </MenuOption>
                                {(categories.map((item) => (
                                    <MenuOption value={item}  key={item.id}>
                                        <Text style={[styles.optionStyle, {color: item.color}]}>{item.name}</Text>
                                    </MenuOption>
                                )))}
                            </MenuOptions>
                        </Menu>
                    </View>
                    {category !== null &&
                        <View style={styles.rowContainer}>
                            <Menu onSelect={(value) => {
                                if(value.id) {
                                    setProject(value)
                                    setProjectsTrigger(value.name)
                                } else {
                                    setProject(null)
                                    setProjectsTrigger(value.name)
                                }
                            }}>
                                <MenuTrigger>
                                    <View style={{flexDirection: 'row', alignContent: 'center'}}>
                                        <Text style={styles.rowText}>{projectsTrigger}</Text>
                                        <Icon type='antdesign' name='caretdown' size={10} style={{marginTop: 7, flex: 0.5}}/>
                                    </View>
                                </MenuTrigger>
                                <MenuOptions optionsContainerStyle={{marginTop: 20}}>
                                    <MenuOption value={{name: 'Wszystkie projekty'}}>
                                        <Text style={[styles.optionStyle, {color: Colors.black}]}>Wszystkie projekty</Text>
                                    </MenuOption>
                                    {(projects.filter(item => item.catID === category.id).map((item) => (
                                        <MenuOption value={item}  key={item.id}>
                                            <Text style={[styles.optionStyle, {color: item.color}]}>{item.name}</Text>
                                        </MenuOption>
                                    )))}
                                </MenuOptions>
                            </Menu>
                        </View>
                    }

            </View>

    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        marginTop: 10
    },
    rowContainer: {
        flex: 1,
    },
    rowText: {
        fontSize: 17,
        textAlign: 'center',
        flex: 0.7
    },
    optionStyle: {
        textAlign: 'center'
    }
})

export default ChooseAble;
