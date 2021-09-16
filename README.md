# Hollar
![alt text](https://github.com/2106-tomatoes/Hollar/blob/main/Hollar-Front/assets/Hollar.png)

## Events on your terms
Why should you be locked into the first intention you had for an event? Hollar lets your plans to be as flexible as you are.
Hollar helps you create and coordinate events by allowing you to immediatly chat with organizers and other attendees.

Search for events in your area, and chat with the group to find out more details or suggest changes. Make your own events and chat with friends.

## Technical Overview
Hollar is a mobile app primarily based on React Native and Expo, followed by Google Maps Platform API, Socket.io and Express JS. With React Native and Expo, together they allowed us to build a frontend that's flexible with iOS and Android. Then to build out our core features we used Google Maps Platform APIs and Socket.io. Finally supporting all of this we have Express JS as our backend with a PostgreSQL database. Here's a more detailed overview:

React Native
- Frontend components for functionality and UI experience
- Used both standard native components and community driven components. For the community driven components, most notably they are:
  - React Navigation: for a drawer based navigation where a menu would appear on the side of your screen with choices to select and upon selecting, navigates you to the selected screen
  - React-Native-Google-Places-Autocomplete: as you type an address, suggestions would show up from a dropdown list
  - React-Native-Maps: rendering a map based on Google Maps
  - React-Native-Reanimated-Bottom-Sheet: the slide up menu to view events happening around you
  - React-Native-Gifted-Chat: the UI for direct messaging and group messaging

Expo
- Development platform/framework to help us build, deploy and test our app using phone emulators (iOS and Android) and on physical phones using Expo Go 
- Grants the app permission to use key functions of the phone itself like geolocation

Google Maps Platform API
- Enables our core feature which allows events to be found based on a set distance of your choosing from your current location
- Enables address information to be available when user is searching for or typing out an address

Socket.io
