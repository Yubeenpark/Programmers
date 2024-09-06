//ForEach

const arr = [1,2,3,4,5];

arr.forEach(function(value, index, all){
    console.log(`index: ${index}, value:${value}`);
    return value*2; //undefined

});

let new_class = new Map([
	['name','english Class'],
		['people',13],
		['date', '4month']
    ]   

);

new_class.set('location','d-4');

new_class.forEach(function(value,key){
    console.log(`key: ${key}, value:${value}`);

})


//Map 함수
arr.map(function(value, index, all){
    console.log(`index: ${index}, value:${value}` , all);
    return value*2;//값이 2배로 되어 반환된다.

});
