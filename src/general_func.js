function simpleListDisplay(array) {
  if (!Array.isArray(array)) {
    return array.toLowerCase();
  }
  var string = "";
  for (i = 0; i < array.length; i++) {
    if (i < array.length - 1) {
      string += array[i] + ", ";
    } else {
      string += array[i];
    }
  }
  return string.toLowerCase();
}

function cleanupTextInput(input) {
  input = input.replace(/\t/g, "");
  input = input.replace(/\n/g, "");
  input = input.replace(/\r/g, "");
  //cleanup whitespace as front
  while (input.length > 0 && input.charAt(0) == " ") {
    input = input.substring(1);
  }
  //cleanup whitespace at back
  while (input.length > 0 && input.charAt(input.length - 1) == " ") {
    input = input.substring(0, input.length - 1);
  }
  if (input.charAt(input.length - 1) == "-") {
    return input.substring(0, input.length - 1).toLowerCase();
  }
  return input.toLowerCase();
}
