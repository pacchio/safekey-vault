#!/bin/bash

android_file='./android/app/build.gradle'
ios_file='./ios/SafeKeyVault.xcodeproj/project.pbxproj'

echo "---------- AGGIORNAMENTO VERSIONE ----------"

# get new version
current_version=$(npm pkg get version | tr -d '"') # estraggo il numero di versione dal package.json
echo "CURRENT VERSION: $current_version"
version_array=(${current_version//./ })
(( version_array[2]++ ))
printf -v joined '%s.' "${version_array[@]}"
new_version=${joined%.}
echo -e "NEW VERSION: $new_version\n"

# change version ios
sed -i "s/MARKETING_VERSION = $current_version/MARKETING_VERSION = $new_version/" $ios_file
echo -e "VERSION UPDATED FOR IOS"

# change version name android
sed -i "s/versionName \"$current_version\"/versionName \"$new_version\"/" $android_file
echo -e "VERSION UPDATED FOR ANDROID\n"

# get new version code
versonCodeString=$(grep -oP 'versionCode [0-9]+' $android_file) # estraggo "versionCode ##"
current_version_code=${versonCodeString/versionCode /''} # estraggo il numero
echo "CURRENT VERSION CODE $current_version_code"
new_version_code=$((current_version_code+1))
echo "NEW VERSION CODE: $new_version_code"

# change version code
sed -i "s/versionCode $current_version_code/versionCode $new_version_code/" $android_file
echo -e "VERSION CODE UPDATED FOR ANDROID\n"

# change npm package.json version
npm --no-git-tag-version version patch
echo "package.json UPDATED"
