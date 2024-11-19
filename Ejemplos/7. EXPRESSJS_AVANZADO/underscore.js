var _ = require('underscore');

console.log('--------- pluck  ---------')
var items = [
  {
    first: 'Carmelo',
    last: 'Cotón'
  },
  {
    first: 'Aitor',
    last: 'Tilla'
  }
];

var names =_.pluck(items,'first');
console.log(names);

console.log('--------- partition  ---------')

var arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
var division = _.partition(arr, function (element) {
    return element % 2 != 0;
});
  
console.log(division);

console.log('--------- groupBy  ---------')
arr = [2.7, 3.4, 6.6, 1.2, 2.0, 2.4];
var grupos = _.groupBy(arr, function(num) {
    return Math.ceil(num); 
});
console.log(grupos);
arr = ['HTML', 'CSS3', 'JS', 'PHP'];
grupos = _.groupBy(arr, 'length');
console.log (grupos);

console.log('--------- where  ---------')

var people = [
    {"name": "sakshi", "hasLong": "false"},
    {"name": "aishwarya", "hasLong": "true"},
    {"name": "akansha", "hasLong": "false"},
    {"name": "preeti", "hasLong": "true"}
]
console.log(_.where(people, {hasLong: "true"}));
var universidades = [
    {"name": "Universidad Complutense", "nAlumnos": "71806"},
    {"name": "Universidad de Alcalá", "nAlumnos": "28705"},
    {"name": "Universidad Politécnica", "nAlumnos": "35738"},
    {"name": "Universidad Autónoma", "nAlumnos": "30258"}
]
console.log(_.where(universidades, {nAlumnos: "71806"}));

console.log('--------- shuffle  ---------')
console.log(_.shuffle(_.shuffle([1, 2, 3, 4, 5, 6])));
var goal  = [
    {
        "category" : "other",
        "title" : "harry University",
        "value" : 50000,
        "id":"1"
    },
    {
        "category" : "traveling",
        "title" : "tommy University",
        "value" : 50000,
        "id":"2"
    },
    {
        "category" : "education",
        "title" : "jerry University",
        "value" : 50000,
        "id":"3"
    },
    {    
        "category" : "business",
        "title" : "Charlie University",
        "value" : 50000,
        "id":"4"
    }
]
console.log(_.shuffle(_.shuffle(goal)));

console.log('--------- finIndex  ---------');
arr = ["Berta", "Beatriz", "Fabio"];

console.log(arr + ": " + _.findIndex(arr, n=> n.startsWith("B")));

console.log('--------- range  ---------');
console.log(_.range(1,5));

console.log('--------- escape  ---------');
console.log(_.escape("Esto es <b>Muy importante</b>"));