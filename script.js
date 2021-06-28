// ADVANCED JAVASCRIPT

// object using function constructor
var Person = function (name, yearOfBirth, job) {
  this.name = name;
  this.yearOfBirth = yearOfBirth;
  this.job = job;

  // this.calculateAge = function(){
  //   console.log(2020 - this.yearOfBirth);
  // }
}

// Most Efficient way to create methods in objects to ensure inheritance
Person.prototype.calculateAge = function () {
  console.log(2020 - this.yearOfBirth);
}

Person.prototype.lastName = 'Ikechukwu';

var prosper = new Person('Prosper', 1999, 'developer');
var noble = new Person('Noble', 1998, 'fashion designer');

console.log(noble, prosper);

prosper.calculateAge();
noble.calculateAge();
console.log(noble.lastName, prosper.lastName);


// CREATING OBJECTS WITH OBJECT.create
var familyProto = {
  calculateAge: function () {
    console.log(2020 - this.yearOfBirth);
  }
};

var nkeiru = Object.create(familyProto);
nkeiru.name = 'Blessing';
nkeiru.yearOfBirth = '1997';
nkeiru.job = 'Trader';

var rejoice = Object.create(familyProto, {
  name: { value: 'Rejoice' },
  yearOfBirth: { value: 2005 },
  job : { value: 'Student'}
});



// PRIMITIVES vs OBJECTS
// Primitives hold values/copy of data themselves BUT Objects do not hold this values but reference to the memory that stores the value.   

// Primitives
var a = 21;
var b = a;
a = 42;
console.log(a, b); //42=a, 21=b

// Objects
var object1 = {
  name: 'Paul',
  age: 20
};

var object2 = object1;
object1.name = 'James';

console.log(object1); //change in value is effected
console.log(object2); //change in value is effected here too


// FIRST CLASS FUNCTIONS (Passing a functions into another function as an argument)
var years = [1974, 1996, 1997, 1998, 1999, 2005];


function arrayCalc(arr, fn) {
  var arrRes = [];
  for (i = 0; i < arr.length; i++){
    arrRes.push(fn(arr[i]))
  }

  return arrRes;
}
// Calllback function
function calcAge(ele) {
  return 2020 - ele;
}

function fullAge(ele) {
  return ele >= 18;
}

function maxHeartRate(ele) {
  if (ele >= 18 && ele <= 81) {
    return Math.round(206.9 - (0.67 * ele));
  } else {
    return -1;
  }
}


var ages = arrayCalc(years, calcAge);
var fullAges = arrayCalc(ages, fullAge);
var heartRates = arrayCalc(ages, maxHeartRate);

console.log(heartRates)
console.log(fullAges);
console.log(ages);


// Function returning functions
function interviewQuestion(job) {
  if (job = 'designer') {
    return function (name) {
      console.log(name + ', what is motion graphics?')
    }
  } else if (job = 'teacher') {
    return function (name) {
      console.log(name + ', how many students have you impacted?')
    }
  } else {
    return function (name) {
      console.log( name + ', there is no vacancy for your job?')
    }
  }
}

var teacherQuestion = interviewQuestion('teacher');
teacherQuestion('John');

interviewQuestion('designer')('James');

/* function game() {
  var score = Math.random() * 10;
  console.log(score >= 5);
}
game(); */

// Immediately Invoked Function Expression
(function () {
  var score = Math.random() * 10;
  console.log(score >= 5);
})();



// Closures
// An inner function has always access to the variables and parameter of its outer function, even after the outer function has returned.
function retirement(retirementAge) {
  var text = ' years left until retirement.';
  return function (yearOfBirth) {
    var age = 2020 - yearOfBirth;
    console.log(retirementAge - age + text);
  }
};

retirement(66)(1999);
var retirementUS = retirement(66);
var retirementNigeria = retirement(65);
var retirementIceland = retirement(67);

retirementIceland(1999);
retirementNigeria(1999);
retirementUS(1999);  

function question(job) {
  return function (name) {
    if (job === 'developer') {
      console.log(name + ', how long have you been coding?')
    } else if (job === 'fashion designer') {
      console.log('Hello ' + name + ', can I see your designs?')
    } else {
      console.log( name +', can you tell me more about your job?')
    }
  }
};

// Call, Bind, Apply
var uche = {
  name: 'Uchenna Emeka',
  age: 20,
  job: 'Trader',
  presentation: function (style, timeOfDay) {
    if (style === 'formal') {
      console.log('Good ' + timeOfDay + ', Ladies and Gentlemen. ' +
        'My name is ' + this.name + '. ' + 'I\'m ' + this.age + ' years old. ' + 'I\'m a ' + this.job + '.');
    } else if (style === 'informal') {
      console.log('Hey what\'s good? .' +
        'My name is ' + this.name + '. ' + 'I\'m ' + this.age + ' years old. ' + 'I\'m a ' + this.job + '.' + ' Have a good ' + timeOfDay + '.')
    }
  }
};
var jerry = {
  name: 'Jeremiah Nwafor',
  age: 21,
  job: 'React Developer'
};
// method borrowing using Call
uche.presentation('formal', 'morning');
uche.presentation.call(jerry, 'informal', 'night');

// Apply::::: this method accepts an array as the second argument
// john.presentation.apply(jerry, ['informal', 'morning']);

// Bind::::: this method returns a function
var ucheFriendly = uche.presentation.bind(uche, 'informal');
ucheFriendly('afternoon');

var jerryFormal = uche.presentation.bind(jerry, 'formal');
jerryFormal('afternoon');


var years = [1974, 1998, 1999, 2005];
function arrayCalc(arr, fn) {
  var arrRes = [];
  for (i = 0; i < arr.length; i++){
    arrRes.push(fn(arr[i]))
  }

  return arrRes;
}
// Calllback function
function calcAge(ele) {
  return 2020 - ele;
}

function fullAge(limit, ele) {
  return ele >= limit;
}

var familyAges = arrayCalc(years, calcAge);
var fullJapan = arrayCalc(familyAges, fullAge.bind(this, 20));
console.log(fullJapan);
console.log(familyAges); 

