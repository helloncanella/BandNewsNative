export default function getIndexWithKeyValue(array, key, value) {
    
    for (var i = 0; i < array.length; i++) {
        if (array[i][key] == value) {
            return i;
        }
    }

    return -1;

}