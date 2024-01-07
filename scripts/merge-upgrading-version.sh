#!/bin/bash

#android_file='./android/app/build.gradle'
#ios_file='./ios/SafeKeyVault.xcodeproj/project.pbxproj'
#
#UPGRADE_VERSION_SH=$1
#
#echo "---------- TAG VERSIONE ----------"
#
## merge
#git pull --rebase
#git checkout main
#git pull --rebase
#git merge dev
#echo -e "MERGE EFFETTUATO con branch \"dev\""
#git push origin main
#echo -e "PUSHATO MERGE su \"main\"\n"
#
## tag
#old_version=$(npm pkg get version | tr -d '"')
#git tag "v${old_version}"
#echo -e "CREATO TAG v${old_version}"
#git push --tags
#echo -e "PUSHATO TAG v${old_version}\n"
#
## upgrade version (with new snapshot version)
#git checkout dev
#/bin/bash $UPGRADE_VERSION_SH
#new_version=$(npm pkg get version | tr -d '"')
git add .
git commit -m "snapshot v${new_version}"
git push origin dev
echo "PUSHATA SNAPSHOT NUOVA VERSIONE v${new_version}"

printf "\n\e[32m SUCCESS \e[0m \n"
