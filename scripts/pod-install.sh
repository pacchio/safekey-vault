#!/bin/bash

IOS_FOLDER='./ios'

cd $IOS_FOLDER || exit

# Optional Arguments
CLEAN_POD_FOLDER=0
while [[ "$#" -gt 0 ]]; do
    case $1 in
        -c|--clean) CLEAN_POD_FOLDER=1; shift ;; # pass -c | --clean to clearing pod folder
    esac
    shift
done

if [ $CLEAN_POD_FOLDER == 1 ]; then
  printf "Cleaning pod folder...\n\n"
  pod cache clean --all
  rm -rf Pods
  rm -rf Podfile.lock
else
  printf "Skip cleaning pod folder... \n\n"
fi

pod install --repo-update

printf "\n\e[32m SUCCESS \e[0m \n"
