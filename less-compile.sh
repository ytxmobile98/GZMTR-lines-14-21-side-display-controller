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

echo -e "Usage: bash less-compile.sh [lessDir [cssDir [mainFile [rootPath]]]]\n"
echo -e "[LESS directiory]\n$(realpath "$lessDir")\n"
echo -e "[CSS directory]\n$(realpath "$cssDir")\n"
echo -e "[Main file]\n$(realpath "$mainFile")\n"
echo -e "[Root path]\n$(realpath "$rootPath")\n"

read -p "Continue? (y/n): " -r reply
# See: https://thoughtbot.com/blog/the-unix-shells-humble-if
if test $reply != "Y" && test $reply != "y"
then
	echo -e "Abort."
	exit
fi

npx less-watch-compiler "$lessDir" "$cssDir" --main-file "$mainFile" --less-args rootpath="$rootPath",relative-urls
