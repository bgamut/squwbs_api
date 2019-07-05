import React, {useCallback} from 'react'
import {Text,View,Dimensions,TouchableOpacity} from 'react-native'
import {useDropzone} from 'react-dropzone'
import Fade from 'react-reveal/Fade'
const FileDrop=()=> {
  const onDrop = useCallback(acceptedFiles => {

    // const reader = new FileReader()

    // reader.onabort = () => console.log('file reading was aborted')
    // reader.onerror = () => console.log('file reading has failed')
    // reader.onload = () => {
    //   // Do whatever you want with the file contents
    //   const binaryStr = reader.result
    //   console.log(binaryStr)
    // }
    // acceptedFiles.forEach(file => reader.readAsBinaryString(file))

    for (var i = 0; i < acceptedFiles.length; i++) {
        // Closure to capture the file information.
        (function(file) {
          var reader = new FileReader();
          reader.onload = function(e) {
            // // Render thumbnail.
            // var span = document.createElement('span');
            // span.innerHTML = ['<img src="', e.target.result,
            //   '" title="', escape(file.name), '">'
            // ].join('');
            // document.getElementById('list').insertBefore(span, null);
            const binaryStr = reader.result
            console.log(binaryStr)
          };
          // Read in the image file as a data URL.
          //reader.readAsDataURL(file);
          reader.readAsBinaryString(file)
        })(acceptedFiles[i]);
      }
    }, [])
    
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <Fade>
    <View style={{ 
        // height:100,
        width:(Dimensions.get('window').width-8),
        backgroundColor:'white',
        flex:1,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        marginRight:2,
        marginLeft:2,
        marginBottom:2,
        borderRadius:4,
        borderWidth:1,
        borderColor:'lightgrey',
        overflow:'hidden'}} 
        {...getRootProps()}
    >
        <View style={{
            // height:100,
            justifyContent:'center',
            alignItems:'center'
        }}>
      <input {...getInputProps()} />
      <TouchableOpacity>
        <Text selectable={false} style ={{
            textDecorationLine:'none',
            color:'white',
            fontSize: 15,
            textShadowColor: 'rgba(128, 128, 128, 1)',
            textShadowOffset: {width: 0, height: 0},
            textShadowRadius: 8,
            flex:1,
            textAlign:'center',
            alignItems:'center',
            justifyContent:'center',
            flexDirection:'row',
            margin:5,
        }}>
            Click to Select Files
        </Text>
    </TouchableOpacity>
        </View>
    </View>
    </Fade>
  )
}
export default FileDrop