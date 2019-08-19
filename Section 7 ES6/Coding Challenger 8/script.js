class Element {
    constructor(name, buildYear){
        this.name = name; 
        this.buildYear = buildYear;
    }
}

class Park extends Element {
    constructor(name, buildYear, area, numTrees){
        super(name, buildYear);
        this.area = area;
        this.numTrees = numTrees;
    }

    treeDensity(){
        console.log(`${this.name} has a tree density of ${this.numTrees / this.area} trees per square km`);
    }
}

class Street extends Element {
    constructor(name, buildYear, length, size = 3){
        super(name, buildYear);
        this.length = length;
        this.size = size;

    }

    classifyStree(){
        const classification = new Map();
        classification.set(1, 'tiny');
        classification.set(2, 'small');
        classification.set(3, 'normal');
        classification.set(4, 'big');
        classification.set(5, 'huge');
        console.log(`${this.name}, build in ${this.buildYear}, is a ${classification.get(this.size)}`);
    }
}

const allParks = [
    new Park('Green Park', 1987, 0.2, 215), 
    new Park('National Park', 1894, 2.9, 3541),
    new Park('Oak Park', 1953, 0.4, 949)
];

const allStreets = [
    new Street('Ocean Avenue', 1999, 1.1, 4),
    new Street('Evergreen Street', 2008, 2.7, 2),
    new Street('4th Street', 2015, 0.8),
    new Street('Sunset Boulevard', 1982, 2.5, 5),
];

function reportParks(p) {
    console.log(`----- PARKS REPORT -----`);
    p.forEach(el => el.treeDensity());
}

function reportStreets(s) {

}

function calc(arr){
    const sum = arr.reduce((previousValue, currentValue, currentIndex) => previousValue + currentValue, 0);
}

reportParks(allParks);
reportStreets(allStreets);