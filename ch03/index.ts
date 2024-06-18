// 3. 유니언과 리터럴

// 유니언(union): 값에 허용된 타입을 두 개 이상의 가능한 타입으로 확장하는 것
// 내로잉(narrowing): 값에 허용된 타입이 하나 이상의 가능한 타입이 되지 않도록 좁히는 것

// ====================================================================================================

// 3.1 유니언 타입
let mathematician = Math.random() > 0.5 ? undefined : "Mark Goldberg";

// 위 코드에서 mathematician은 어떤 타입일까?
// 둘 다 잠재적인 타입이긴 하지만 무조건 undefined 이거나 혹은 무조건 string인 것도 아니다.
// mathematician은 undefined 이거나 string 일 수 있다.
// 여기서 '이거' 혹은 '저거'와 같은 타입을 유니언 타입이라 한다.
// 유니언 타입은 값이 정확히 어떤 타입인지 모르지만 두 개 이상의 옵션 중 하나라는 것을 알고 있는 경우에 코드를 처리하는 훌륭한 개념이다.
// 타입스크립트는 가능한 값 또는 구성 요소사이에 |(수직선) 연산자를 사용해 유니언 타입을 나타낸다.

// 3.1.1 유니언 타입 선언
// 변수의 초깃값이 있더라도 변수에 대한 명시적 타입 애너테이션을 제공하는 것이 유용할 때 유니언 타입을 사용한다.
// 유니언 타입 선언의 순서는 중요하지 않다. 타입스크립트에서는 boolean | number나 number | boolean 모두 똑같이 취급한다.

let thinker: string | null = null;
if (Math.random() > 0.5) {
    thinker = "Susanne Langer"; // OK
}

// 3.1.2 유니언 속성
// 값이 유니언 타입일 때, 타입스크립트는 유니언으로 선언한 모든 가능한 타입에 존재하는 멤버속성에만 접근할 수 있다.
// 유니언 외의 타입에 접근하려고 하면 타입 검사 오류가 발생한다.

let physicist = Math.random() > 0.5 ? "Marie Cuire" : 84; // 타입은 유니언 타입으로 string | number
physicist.toString(); // OK
physicist.toUpperCase(); // Error: 'string | number' 형식에 'toUpperCas' 속성이 없다. 'number' 형식에 'toUpperCase' 속성이 없다.
physicist.toFixed(); // Error: 'string | number' 형식에 'toUpperCas' 속성이 없다. 'string' 형식에 'toFixed' 속성이 없다.

// 모든 유니언 타입에 존재하지 않는 속성에 대한 접근을 제한하는 것은 안전 조치에 해당한다.
// 객체가 어떤 속성을 포함한 타입으로 확실하게 알려지지 않은 경우, 타입스크립트는 해당 속성을 사용하려고 시도하는 것이 안전하지 않다고 여긴다.
// 그런 속성이 존재하지 않을 수도 있기 때문이다.
// 유니언 타입으로 정의된 여러 타입 중 하나의 타입으로 된 값의 속성을 사용하려면 코드에서 값이 보다 구체적인 타입 중 하나라는 것을 타입스크립트에게 알려야 한다.
// 이 과정을 내로잉(narrowing)이라 한다.

// ====================================================================================================

// 3.2 내로잉
// 내로잉은 값이 정의, 선언 혹은 이전에 유추된 것보다 더 구체적인 타입임을 코드에서 유추하는 것이다.
// 타입을 좁히는 데 사용할 수 있는 논리적 검사를 타입가드(Type Guard)라고 한다.

// 3.2.1 값 할당을 통한 내로잉
// 변수에 값을 직접 할당하면 타입스크립트는 변수의 타입을 할당된 값의 타입으로 좁힌다.

// 3.2.2 조건 검사를 통한 내로잉
let scientist = Math.random() > 0.5 ? "Rosalind Franklin" : 51;

if (scientist === "Rosalind Franklin") {
    scientist.toUpperCase();
}
scientist.toUpperCase(); // Error: 'string | number' 형식에 'toUpperCas' 속성이 없다. 'number' 형식에 'toUpperCase' 속성이 없다.

// 3.2.3 typeof 검사를 통한 내로잉
// 타입스크립트는 직접 값을 확인해 타이을 좁히기도 하지만, typeof 연산자를 사용할 수도 있다.
let researcher = Math.random() > 0.5 ? "Marco" : 51;

if (typeof researcher === "string") {
    researcher.toUpperCase();
} else {
    researcher.toFixed();
}
// 위처럼 코드 스니펫은 타입 내로잉에서도 지원되는 삼항 연산자를 이용해 다시 작성할 수 있다.
typeof researcher === "string" ? researcher.toUpperCase() : researcher.toFixed();

// ====================================================================================================

// 3.3 리터럴 타입
