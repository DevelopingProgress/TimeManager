import notifee, {IOSAuthorizationStatus} from '@notifee/react-native';

export async function requestUserPermission() {
    const settings = await notifee.requestPermission();

    if (settings.authorizationStatus >= IOSAuthorizationStatus.AUTHORIZED) {
        console.log('Permission settings:', settings);
    } else {
        console.log('User declined permissions');
    }
}

export async function displayEndTaskNotification(task) {
    // Create a channel
    const channelId = await notifee.createChannel({
        id: 'default',
        name: 'End Task Notification',
    });

    // Display a notification
    await notifee.displayNotification({
        title: 'Czas dobiegł końca!',
        body: 'Czas na zadanie ' + task.name + ' się skończył.',
        android: {
            channelId,
            smallIcon: 'app_icon', // optional, defaults to 'ic_launcher'.
        },
    });
}

export async function displayStartTaskNotification(task) {
    // Create a channel
    const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Start Task Notification',
    });

    // Display a notification
    await notifee.displayNotification({
        title: 'Powiadomienie o zadaniu',
        body: 'Zadanie ' + task.name + ' rozpoczyna się wkrótce',
        android: {
            channelId,
            smallIcon: 'app_icon', // optional, defaults to 'ic_launcher'.
        },
    });
}


