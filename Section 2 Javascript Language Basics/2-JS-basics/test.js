
var john = {
    fullName: 'John Smith',
    bills: [124, 48, 268, 180, 42],
    calcTips: function() {
        this.tips = [];
        this.finalValues = [];
        
        this.bills.forEach((bill, index) => {
            if(bill < 50)
                this.tips[index] = bill * .2;
            else if(bill >= 50 && bill < 200) 
                this.tips[index] = bill * .15;
            else
                this.tips[index] = bill * .1;
            this.finalValues[index] = this.tips[index] + this.bills[index];
        });
    }
}

var mark = {
    fullName: 'Mark Miller',
    bills: [77, 5, 110, 45],
    calcTips: function() {
        this.tips = [];
        this.finalValues = [];
                
        this.bills.forEach((bill, index) => {
            if(bill < 50)
                this.tips[index] = bill * .2;
            else if(bill >= 50 && bill < 200) 
                this.tips[index] = bill * .15;
            else
                this.tips[index] = bill * .1;
            this.finalValues[index] = this.tips[index] + this.bills[index];
        });
    }
}

function calcAverage(tips) {
    var sum = 0;
    for (var i = 0; i < tips.length; i++) {
        sum = sum + tips[i];
    }
    return sum / tips.length;
}

// Do the calculations
john.calcTips();
mark.calcTips();

john.average = calcAverage(john.tips);
mark.average = calcAverage(mark.tips);
console.log({john, mark});

if (john.average > mark.average) {
    console.log(john.fullName + '\'s family pays higher tips, with an average of $' + john.average);
} else if (mark.average > john.average) {
    console.log(mark.fullName + '\'s family pays higher tips, with an average of $' + mark.average);
}

