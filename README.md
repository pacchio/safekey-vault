# SafeKey Vault

SafeKey Vault is a mobile app to provide a **secure** and **user-friendly** platform for managing passwords and sensitive account information.
<br />The app aims to ensure utmost security by implementing **biometric authentication** for access while allowing users to create, update, and remove items containing login credentials and other notes for various accounts.
All in **offline** mode, without any in-cloud backup, to keep the data as safe as possible leveraging on **device storage**.
Additionally, it facilitates secure export/import functionalities for user convenience.

> **Note**: Currently the only supported language is IT 🇮🇹

### Data encryption
Data are saved on device storage in a secure way via [react-native-mmkv](https://github.com/mrousavy/react-native-mmkv) library.
<br />MMKV is an open-source, high-performance and user-friendly mobile key-value storage framework designed for WeChat. It’s built on top of the key-value storage engine LevelDB and provides a simple API for storing and retrieving data. It also offers encryption support, leveraging on secure storage.

## Getting Started

### Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

### Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

#### For Android

```bash
yarn run:android
```

#### For iOS

```bash
# run on simulator
yarn run:ios:simulator
# OR run on real device
yarn run:ios:device
# OR run on real device in RELEASE mode
yarn run:ios:release
```

### Now what?

- Multi-language integration will come soon
