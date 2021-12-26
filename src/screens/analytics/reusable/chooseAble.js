import React, {useEffect, useState} from 'react';

import {Text, View, StyleSheet} from 'react-native';
import {Menu, MenuOption, MenuOptions, MenuTrigger} from "react-native-popup-menu";
import {Icon} from "react-native-elements";
import {
    clearProjects,
    clearTasks,
    listCategories,
    listProjects,
    listTasks,
    setLoading
} from "../../../store/actions/tasksActions";
import {Loading} from "../../../reusable/utils/loading";

const ChooseAble = (props) => {

    const data = props.data
    const {user, categories, projects, loading, dispatch, categoriesTrigger, setCategoriesTrigger,
        projectsTrigger, setProjectsTrigger} = data
    const [category, setCategory] = useState(null);
    useEffect(() => {
        setCategoriesTrigger(categories[0].name && categories[0].name)
    }, [])

    return (
        loading ? <View style={{alignItems: 'center'}}><Loading circlesnail/></View> :
                <View style={styles.row}>
                    <View style={styles.rowContainer}>
                        <Menu onSelect={(value) => {
                                dispatch(clearProjects())
                                dispatch(setLoading())
                                dispatch(listProjects(user, value))
                                setCategory(value)
                                setCategoriesTrigger(value.name)
                        }}>
                            <MenuTrigger>
                                <View style={{flexDirection: 'row', alignContent: 'center'}}>
                                    <Text style={styles.rowText}>{categoriesTrigger}</Text>
                                    <Icon type='antdesign' name='caretdown' size={10} style={{marginTop: 7, flex: 0.5}}/>
                                </View>
                            </MenuTrigger>
                            <MenuOptions optionsContainerStyle={{marginTop: 20}}>
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
                                dispatch(clearTasks())
                                dispatch(setLoading())
                                dispatch(listTasks(user, category, value))
                                setCategoriesTrigger(category.name)
                                setProjectsTrigger(value.name)
                            }}>
                                <MenuTrigger>
                                    <View style={{flexDirection: 'row', alignContent: 'center'}}>
                                        <Text style={styles.rowText}>{projectsTrigger}</Text>
                                        <Icon type='antdesign' name='caretdown' size={10} style={{marginTop: 7, flex: 0.5}}/>
                                    </View>
                                </MenuTrigger>
                                <MenuOptions optionsContainerStyle={{marginTop: 20}}>
                                    {(projects.map((item) => (
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
