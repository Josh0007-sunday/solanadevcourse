const data = {
    name: 'jenny',
    age: 54,
    favFood: 'waterlemon',
    address: {
        city:  'somewhere inNigeria',
        homeTown: 'Akwa ibom'
    }
}

function printNew({name, age, ...rest}){
   console.log(`The student name is ${name} and age s ${age} and ${rest}`); 

}

printNew(data)
//const fetchData = {...data};
