lessDir="./css-less"
cssDir="./css"
mainFile="index.less"
rootPath="./"

if [ -n "$1" ]
then
	lessDir="$1"
fi

if [ -n "$2" ]
then
	cssDir="$2"
fi

if [ -n "$3" ]
then
	mainFile="$3"
fi

if [ -n "$4" ]
then
	rootPath="$4"
fi

echo "LESS directiory: $lessDir"
echo "CSS directory: $cssDir"
echo "Main file: $mainFile"

npx less-watch-compiler "$lessDir" "$cssDir" --main-file "$mainFile" --less-args rootpath="$rootPath",rewrite-urls=local
