// 6. 배열

// 자바스크립트 배열(Array)은 매우 유연하고 내부에 모든 타입의 값을 혼합해서 저장할 수 있다.
// 그러나 대부분의 개별 자바스크립트 배열은 하나의 특정 타입의 값만 가진다. 다른 타입의 값을 추가하게 되면 배열을 읽을 때 혼란을 줄 수 있다.
// 최악의 상황으로는 프로그램에 문제가 될 만한 오류가 발생할 수도 있다.

// 타입스크립트는 초기 배열에 어떤 데이터 타입이 있는지 기억하고, 배열이 해당 데이터 타입에서만 작동하도록 제한한다.
// 이런 방식으로 배열의 데이터 타입을 하나로 유지시킨다.
const warriors = ["Artemisia", "Boudica"];
warriors.push("Zenobia"); // OK: "Zenobia"의 타입은 string이기 때문에
warriors.push(true); // Error: 'boolean' 형식의 인수는 'string' 형식의 매개 변수에 할당될 수 없다.

// ====================================================================================================

// 6.1 배열 타입
// 다른 변수 선언과 마찬가지로 배열을 저장하기 위한 변수는 초깃값이 필요하지 않다.
// 변수는 undefined로 시작해서 나중에 배열 값을 받을 수 있다.
// 타입스크립트는 변수에 타입 애너테이션을 제공해 배열이 포함해야 하는 값의 타입을 알려준다.
// 배열에 대한 타입 애너테이션은 배열의 요소 타입 다음에 []가 와야 한다.
let arrayOfNumbers: number[];
arrayOfNumbers = [4, 8, 15, 16, 23, 42];

// 6.1.1 배열과 함수 타입
// 배열 타입은 함수 타입에 무엇이 있는지를 구별하는 괄호가 필요한 구문 컨테이너의 예이다.
// 괄호는 애너테이션의 어느 부분이 함수 반환 부분이고 어느 부분이 배열 타입의 묶음인지를 나타내기 위해 사용한다.
// 다음 함수 타입인 createStrings는 배열 타입인 stringCreators와 동일하지 않다.

// 타입은 string 배열을 반환하는 함수
let createStrings: () => string[];

// 타입은 각각 string을 반환하는 함수 배열
let stringCreators: (() => string)[];

// 6.1.2 유니언 타입 배열
// 배열의 각 요소가 여러 선택 타입 중 하나일 수 있음을 나타내려면 유니언 타입을 사용한다.
// 유니언 타입으로 배열 타입을 사용할 때, 애너테이션의 어느 부분이 배열의 콘텐츠이고 어느 부분이 유니언 타입 묶음인지를 나타내기 위해 괄호를 사용해야 할 수도 있다.
// 유니언 타입 배열에서 괄호 사용은 매우 중요하다. 따라서 다음 코드의 두 타입은 동일하지 않다.

// 타입은 string 또는 number의 배열
let stringOrArrayNumbers: string | number[];

// 타입은 각각 number 또는 string인 요소의 배열
let arrayOfStringOrNumbers: (string | number)[];

// 타입스크립트는 배열의 선언에서 두 가지 이상의 요소 타입이 포함되는 경우 유니언 타입 배열임을 알게 된다.
// 즉, 배열의 요소 타입은 배열에 담긴 요소에 대한 모든 가능한 타입의 집합이다.
// 타입: (string | undefined)[]
const namesMaybe = ["Aqualtune", "Blenda", undefined];

// 6.1.3 any 배열의 진화
// 초기에 빈 배열로 설정된 변수에서 타입 애너테이션을 포함하지 않으면 타입스크립트는 배열을 any[]로 취급하고 모든 콘텐츠를 받을 수 있다.
// 하지만 any 변수가 변경되는 것처럼 any[] 배열이 변경되는 것도 좋아하지 않는다.
// 타입 애너테이션이 없는 빈 배열은 잠재적으로 잘못된 값 추가를 허용해 타입스크립트의 타입 검사기가 갖는 이점을 부분적으로 무력화하기 때문이다.
// 변수와 마찬가지로 배열이 any 타입이 되도록 허용하거나 일반적으로 any 타입을 사용하도록 허용하면, 타입스크립트의 타입 검사 목적을 부분적으로 무효화한다.

// 다음 values 배열은 any 요소를 갖고 시작해 string 요소를 포함하도록 바뀐 다음, 다시 number | string 요소로 바뀐다.

// 타입: any[]
let values = [];

// 타입: string[]
values.push("");

// 타입: (number | string)[]
values[0] = 0;

// 6.1.4 다차원 배열
// 2차원 배열 또는 배열의 배열은 두 개의 [](대괄호)를 갖는다.
let arrayOfArrayOfNumbers: number[][];
arrayOfArrayOfNumbers = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
];

// ====================================================================================================

// 6.2 배열 멤버
// 타입스크립트는 배열의 멤버를 찾아서 해당 배열의 타입 요소를 되돌려주는 전형적인 인덱스 기반 접근 방식을 이해하는 언어이다.
const defenders = ["Clarenza", "Dina"];
// 타입: string
const defender = defenders[0];

// 유니언 타입으로 된 배열의 멤버는 그 자체로 동일한 유니언 타입이다.
// 다음 solidersOrDates는 (string | Date)[] 타입이므로, soliderOrDate 변수는 string | Date 타입이다.
const solidersOrDates = ["Deborah Sampson", new Date(1782, 6, 3)];
// 타입: string | Date
const soliderOrDate = solidersOrDates[0]; // OK

// ====================================================================================================

// 6.3 스프레드와 나머지 매개변수
// 6.3.1 스프레드
// ... 스프레드 연산자를 사용해 배열을 결합한다.
// 타입스크립트는 입력된 배열 중 하나의 값이 결과 배열에 포함될 것임을 이해한다.
// 만약에 입력된 배열이 동일한 타입이라면 출력 배열도 동일한 타입이다.
// 서로 다른 타입의 두 배열을 함께 스프레드해 새 배열을 생성하면 새 배열은 두 개의 원래 타입 중 어느 하나의 요소인 유니언 타입 배열로 이해된다.

// 다음 conjoined 배열은 string 타입과 number 타입 값을 모두 포함하므로 (string | number)[] 타입으로 유추된다.
// 타입: string[]
const soliders = ["Harriet Tubman", "Joan of Arc", "Khutulun"];

// 타입: number[]
const soliderAges = [90, 19, 45];

// 타입: (string | number)[]
const conjoined = [...soliders, ...soliderAges];

// 6.3.2 나머지 매개변수 스프레드
// 타입스크립트는 나머지 매개변수로 배열을 스프레드하는 자바스크립트 실행을 인식하고 이에 대해 타입 검사를 수행한다.
// 나머지 매개변수를 위한 인수로 사용되는 배열은 나머지 매개변수와 동일한 배열 타입을 가져야 한다.

// 다음 logWarriors 함수는 ...names 나머지 매개변수로 string 값만 받는다.
// string[] 타입 배열을 스프레드 하는 것은 허용되지만 number[]는 허용되지 않는다.
function logWarriors(greeing: string, ...names: string[]) {
    for (const name of names) {
        console.log(`${greeing}, ${name}`);
    }
}
const warriors02 = ["Cathay Williams", "Lozen", "Nzinga"];
logWarriors("Hello", ...warriors02);

const birthYears = [1844, 1840, 1583];
logWarriors("Born in", ...birthYears); // Error => 'number' 형식의 인수는 'string' 형식의 매개 변수에 할당될 수 없다.

// ====================================================================================================

// 6.4 튜플
// 자바스크립트 배열은 이론상 어떤 크기라도 될 수 있다.
// 하지만 때로는 튜플(tuple)이라고 하는 고정된 크기의 배열을 사용하는 것이 유용하다.
// 튜플 배열은 각 인덱스에 알려진 특정 타입을 가지며 배열의 모든 가능한 멤버를 갖는 유니언 타입보다 더 구체적이다.
// 튜플 타입을 선언하는 구문은 배열 리터럴처러 보이지만 요소의 값 대신 타입을 적는다.

// yearAndWarrior 배열은 인덱스 0에 number 타입 값을 갖고, 인덱스 1에 string 값을 갖는 튜플 타입으로 선언되었다.
let yearAndWarrior: [number, string];
yearAndWarrior = [530, "Tomyris"]; // OK
yearAndWarrior = [false, "Tomyris"]; // Error => 'boolean' 형식은 'number' 형식에 할당할 수 없다.

// 6.4.1 튜플 할당 가능성
// 타입스크립트에서 튜플 타입은 가변 길이(variable length)의 배열 타입보다 더 구체적으로 처리된다.
// 즉, 가변 길이의 배열 타입은 튜플 타입에 할당할 수 없다는 의미이다.

// 타입: (boolean | number)[]
const pairLoose = [false, 123];
// 위 코드에서 우리는 pairLoose 내부에 [boolean, number]가 있는 것을 볼 수 있지만,
// 타입스크립트는 더 일반적인 (boolean | number)[] 타입으로 유추한다.
