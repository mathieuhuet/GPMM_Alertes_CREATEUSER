# GPMM_Alertes Create User

This app let you create user for GPMM_Alertes

It is a separate App for the network administrator so that no one can create accounts for employees other than him/her

## Getting Started

To install the required dependencies, you're gonna run `npm install` at the root of this repository.

afterward your run `npx expo install` and then to run the app you enter the command `npx expo start`

This app can't work properly if you're not running [the GPMM_Alertes_server](https://github.com/mathieuhuet/GPMM_Alertes_server), don't forget to point the App toward [the GPMM_Alertes_server](https://github.com/mathieuhuet/GPMM_Alertes_server) IP and port.

You need to create a `secret.ts` file at the root of the project that export this variable : `GPMM_USER_API`

## Tech Stack

The front-end framework is **React Native** and wouldn't been possible without **Expo**

The back-end server is **Express.JS**

The database is **Mongo DB**

## Screenshots


![](assets/GPMM_CreateUser_04.png)


![](assets/GPMM_CreateUser_01.png)
