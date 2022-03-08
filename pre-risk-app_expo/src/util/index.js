export const removeSpace = (text) => {

    var length = text.length
    var newText = text
  
    while(text.endsWith(' ')){
  
      length = text.length
  
      newText = text.slice(length)
    }
  
    return newText;
  }