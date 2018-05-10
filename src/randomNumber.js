function randomNumber(a,b){
	return Math.random()*(b-a) + a;
}

module.exports = randomNumber;

/*
randomNumber(3,10)

Math.random() -> 0 ~ 1
Math.random() * 5  ->  0 ~ 5
Math.random() * 5 + 5  ->  5 ~ 10
Math.random() * 10 - 5 ->  -5 ~ 5
Math.random() * (10-3) + 3  ->  3 ~ 10*/