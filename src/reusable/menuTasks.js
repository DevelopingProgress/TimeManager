import React, { useEffect, useState } from 'react'
import { StyleSheet } from "react-native";
import {Divider, Icon, ListItem, Text} from "react-native-elements";
import { MenuTrigger, Menu, MenuOptions, MenuOption } from 'react-native-popup-menu';
import { useDispatch, useSelector } from 'react-redux';
import { listProjects } from '../store/actions/tasksActions';
import { Colors } from './tools';

export const MenuTasks = (props) => {

    const user = useSelector(state => state.auth.user)
    const projects = useSelector(state => state.tasks.projects)
    const dispatch = useDispatch()
    const [expanded, setExpanded] = useState(false)

    return (
        <Menu style={{alignContent: 'flex-end', justifyContent: 'flex-end'}}>
                {props.accordion ? (
                    <ListItem.Accordion
                    content={
                        <ListItem.Content>
                            <ListItem.Title>{props.name}</ListItem.Title>
                        </ListItem.Content>
                    }
                    isExpanded={expanded}
                    onPress={() => {
                      setExpanded(!expanded);
                      dispatch(listProjects(user, props.category))
                    }}
                  > 
                    {projects.map((item) => (
                    <MenuTrigger>
                      <ListItem 
                        key={item.id}
                        bottomDivider
                      >
                        <ListItem.Content>
                            <ListItem.Title>{item.name}</ListItem.Title>
                        </ListItem.Content>
                        <ListItem.Chevron />
                      </ListItem>
                    </MenuTrigger>
                    ))}
                  </ListItem.Accordion>
                ) : (
                    <MenuTrigger> 
                        <ListItem 
                            key={props.id}
                            bottomDivider
                        >
                            <ListItem.Content>
                                <ListItem.Title>{props.name}</ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Chevron />
                        </ListItem>
                    </MenuTrigger>
                )}
                
            
            <MenuOptions customStyles={{optionsContainer: styles.optionsContainer}}>
                <MenuOption 
                    style={{flexDirection: 'row'}}
                    onSelect={console.log('przejdź')}
                > 
                    <Icon 
                        type='antdesign' 
                        name='arrowright'
                        size={20} 
                        style={{
                            marginTop: 13,
                            color: Colors.blue,
                        }}
                    /> 
                    <Text style={styles.option}>
                        Przejdź
                    </Text>
                </MenuOption>
                <Divider  orientation="horizontal" width={1}/>
                <MenuOption 
                    style={{flexDirection: 'row'}}
                    onSelect={console.log('edytuj')}
                > 
                    <Icon 
                        type='entypo' 
                        name='edit'
                        size={20} 
                        style={{
                            marginTop: 13,
                            color: Colors.blue,
                        }}
                    /> 
                    <Text style={styles.option}>
                        Edytuj
                    </Text>
                </MenuOption>
                <Divider  orientation="horizontal" width={1}/>
                <MenuOption 
                    style={{flexDirection: 'row'}} 
                    onSelect={console.log('usuń')}
                > 
                    <Icon
                        type='entypo' 
                        name='trash'
                        size={20} 
                        style={{
                            marginTop: 13,
                            color: Colors.blue,
                        }}
                    /> 
                    <Text style={styles.option}>
                        Usuń
                    </Text>
                </MenuOption>
            </MenuOptions>
        </Menu>
    )
}

const styles = StyleSheet.create({
    optionsContainer: {
        marginTop: 40,
        borderRadius: 3,
        alignItems: 'center',
        textAlign: 'center',
    },
    option: {
        margin: 10,
        color: Colors.black, 
        fontSize: 20
    }
})