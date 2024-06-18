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
// 리터럴 타입은 좀 더 구체적인 버전의 원시타입이다.
const philosopher = "Hypatia";
// philosopher는 어떤 타입일까?
// 얼핏봐도 string 타입이라고 말할 수 있고, 실제로도 string 타입이다.
// 하지만 philosopher는 단지 string 타입이 아닌 "Hypatia"라는 특별한 값이다.
// 따라서 변수 philosopher의 타입은 기술적으로 더 구체적인 "Hypatia"이다.

// 이것이 리터럴 타입의 개념이다.
// 원시 타입 값 중 어떤 것이 아닌 '특정 원싯값'으로 알려진 타입이 리터럴 타입이다.
// 만약 변수를 const로 선언하고 직접 리터럴 값을 할당하면 타입스크립트는 해당 변수를 할당된 리터럴 값으로 유추한다.
// 유니언 타입 애너테이션에서는 리터럴과 원시타입을 섞어서 사용할 수 있다.
let lifesapn: number | "ongoing" | "uncertain";

lifesapn = 89; // OK
lifesapn = "ongoing"; // OK
lifesapn = true; // Error: 'true' 형식은 'number | "ongoing" | "uncertain"' 형식에 할당할 수 없다.

let specificallyAda: "Ada";
specificallyAda = "Ada"; // OK
specificallyAda = "Byron"; // Error: '"Byron"' 형식은 '"Ada"' 형식에 할당할 수 없다. 리터럴 타입 위반

let something = ""; // 타입 string
specificallyAda = something; // Error: 'string' 형식은 '"Ada"' 형식에 할당할 수 없다.
// 리터럴 타입은 그 값이 해당하는 원시 타입에 할당할 수 있다.
// 모든 특정 리터럴 문자열은 여전히 string 타입이기 때문이다.
something = specificallyAda; // OK

// ====================================================================================================

// 3.4 엄격한 null 검사
// 리터럴로 좁혠 유니언의 힘은 타입스크립트에서 '엄격한 null 검사'라 부르는 타입 시스템 영역인 '잠재적으로 정의되지 안은 undefined 값'으로 작업할 때 특히 두드러진다.

// 3.4.3 초깃값이 없는 변수
// 자바스크립트에서 초깃값이 없는 변수는 기본적으로 undefined가 된다. 이는 타입 시스템에서 극단적인 경우를 나타내기도 한다.
// 만일 undefined를 포함하지 않는 타입으로 변수를 선언한 다음, 값을 할당하기 전에 사용하려고 시도하면 어떻게 될까?

// 타입스크립트는 값이 할당될 때까지 변수가 undefined임을 이해할 만큼 충분히 영리하다.
// 값이 할당되기 전에 속성 중 접근하려는 것처럼 해당 변수를 사용하려고 시도하면 다음과 같은 오류 메시지가 나타난다.
let mathematician2: string;
mathematician2?.length; // 'mathematician2' 변수가 할당되기 전에 사용되었다.

mathematician2 = "Mark Goldberg";
mathematician2.length; // OK

// 변수 타입에 undefined가 포함되어 있는 경우에는 오류가 보고되지 않는다.
// 변수 타입에 | undefined를 추가하면, undefined는 유효한 타입이기 때문에 사용 전에는 정의할 필요가 없음을 타입스크립트에서 나타낸다.
let mathematician3: string | undefined;

mathematician3?.length; // OK
mathematician3 = "Mark Goldberg";
mathematician3.length; // OK

// ====================================================================================================

// 3.5 타입 별칭
// 타입스크립트에는 재사용하는 타입에 더 쉬운 이름을 할당하는 타입 별칭(type alias)이 있다.
// 타입 별칭은 "type 새로운 이름 = 타입" 형태를 갖는다.
// 편의상 타입 별칭은 파스칼케이스(PascalCase)로 이름을 짓는다.

// 타입 별칭은 순전히 타입 시스템에만 존재하므로 런타임 코드에서는 참조할 수 없다.
// 타입스크립트는 런타임에 존재하지 않는 항목에 접근하려고 하면 타입 오류로 알려준다.
// 다시 말하지만, 타입 별칭은 순전히 "개발 시"에만 존재한다.

type SomeType = string | undefined;
console.log(SomeType); // Error: 'SomeType'은(는) 형식만 참조하지만, 여기서는 값으로 사용되고 있습니다.
