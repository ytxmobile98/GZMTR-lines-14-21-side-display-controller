echo -e "Usage: sh jsx-compile.sh [outputDir [watchDir [extension]]]\n"

echo -e "NOTE: If you have not yet initialized the jsx compile environment, please run the following commands first:"
echo -e "npm init -y"
echo -e "npm install --save-dev @babel/cli @babel/preset-react"
echo -e "See: https://reactjs.org/docs/add-react-to-a-website.html"

outputDir="./js/React"
watchDir="./jsx"
ext=".jsx"

if [ -n "$1" ]
then
	outputDir="$1"
fi

if [ -n "$2" ]
then
	watchDir="$2"
fi

if [ -n "$3" ]
then
	ext="$3"
fi

echo ""
echo -e "[File extension]\n$ext\n"
echo -e "[Watch directory] (where you should have your $ext files)\n$(realpath "$watchDir")\n"
echo -e "[Output directory] (where the compiled js files are located)\n$(realpath "$outputDir")\n"

read -p "Continue? (y/n): " -r reply
# See: https://thoughtbot.com/blog/the-unix-shells-humble-if
if test $reply != "Y" && test $reply != "y"
then
	echo -e "Abort."
	exit
fi

echo -e "\nPress ^C to exit\n"
# For the anatomy of the line below, see:
# https://reactjs.org/docs/add-react-to-a-website.html
# https://babeljs.io/docs/en/babel-node
npx babel --presets @babel/preset-react --watch "$watchDir" --out-dir "$outputDir" --extensions "$ext"
