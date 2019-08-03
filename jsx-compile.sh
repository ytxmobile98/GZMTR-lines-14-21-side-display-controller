echo "Usage: sh jsx-compile.sh [extension [outputDir [watchDir]]]\n"

echo "NOTE: If you have not yet initialized the jsx compile environment, please run the following commands first:"
echo "npm init -y"
echo "npm install --save-dev @babel/cli @babel/preset-react"
echo "See: https://reactjs.org/docs/add-react-to-a-website.html"

ext=".jsx"
outputDir="."
watchDir="."

if [ -n "$1" ]
then
	ext="$1"
fi


if [ -n "$2" ]
then
	outputDir="$2"
fi

if [ -n "$3" ]
then
	watchDir="$3"
fi

echo "\nFile extension: $ext"
echo "Output directory: $outputDir"
echo "Watch directory: $watchDir"

read -p "Continue? (y/n): " -r reply
# See: https://thoughtbot.com/blog/the-unix-shells-humble-if
if test $reply != "Y" && test $reply != "y"
then
	echo "Abort."
	exit
fi

echo "\nPress ^C to exit\n"
# For the anatomy of the line below, see:
# https://reactjs.org/docs/add-react-to-a-website.html
# https://babeljs.io/docs/en/babel-node
npx babel --presets @babel/preset-react --watch "$watchDir" --out-dir "$outputDir" --extensions "$ext"
