// 7. 인터페이스

// 개요: 우리가 직접 만들 수 있는데 왜 지루한 내장 타입형태만 사용하나요?
// 인터페이스는 연관된 이름으로 객체 형태를 설명하는 또 다른 방법이다.
// 인터페이스는 별칭으로 된 객체 타입과 여러 면에서 유사하지만 일반적으로 더 읽기 쉬운 오류 메시지, 더 빠른 컴파일러 성능, 클래스와의 더 나은 상호 운용성을 위해 선호된다.

// ====================================================================================================

// 7.1 타입 별칭 vs 인터페이스

// 다음은 born: number와 name: string을 가진 객체를 타입 별칭으로 구현하는 간략한 구문이다.
type Poet01 = {
    born: number;
    name: string;
};

// 다음은 인터페이스로 구현한 동일한 구문이다.
interface Poet02 {
    born: number;
    name: string;
}

// 위 두 구문은 거의 똑같다.
// 세미콜론(;)을 선호하는 타입스크립트 개발자는 대부분 인터페이스 뒤가 아닌 타입 별칭 뒤에 세미콜론을 넣는다.
// 이 기본 설정은 세미콜론을 사용해 변수를 선언하는 것과 세미콜론 없이 클래스 또는 함수를 선언하는 것의 차이를 반영한다.

let valueLater: Poet;

// OK
valueLater = {
    born: 1935,
    name: "Sara Teasdale",
};

valueLater = "Emily Dickinson"; // Error => 'string' 형식은 'Poet' 형식에 할당할 수 없다.
valueLater = {
    born: true, // Error => 'boolean' 형식은 'number' 형식에 할당할 수 없다.
    name: "Sappho",
};

// 그러나 인터페이스와 타입 별칭 사이에는 몇 가지 주요 차이점이 있다.

// - 인터페이스는 속성 증가를 위해 병합(merge)할 수 있다. 이 기능은 내장된 전역 인터페이스 또는 npm 패키지와 같은 외부 코드를 사용할 때 특히 유용하다.
// - 인터페이스는 클래스가 선언된 구조의 타입을 확인하는 데 사용할 수 있지만, 타입 별칭은 사용할 수 없다.
// - 일반적으로 인터페이스에서 타입스크립트 타입 검사기가 더 빨리 작동한다.
// - 인터페이스는 이름 없는 객체 리터럴의 별칭이 아닌 이름 있는(명명된) 객체로 간주되므로 어려운 특이케이스에서 나타나는 오류 메시지를 좀 더 쉽게 읽을 수 있다.

// ====================================================================================================

// 7.2 속성 타입

// 7.2.1 선택적 속성
// 객체 타입과 마찬가지로 모든 객체가 필수적으로 인터페이스 속성을 가질 필요는 없다.
// 타입 애너테이션 : 앞에 ?를 사용해 인터페이스의 속성이 선택적 속성임을 나타낼 수 있다.

// 다음 Book 인터페이스는 필수 속성 pages와 선택적 속성 author를 갖는다.
// Book 인터페이스를 사용하는 객체에 필수 속성만 제공된다면 선택적 속성은 제공되거나 생략할 수 있다.

interface Book {
    author?: string;
    page: number;
}

// OK
const okay: Book = {
    author: "Rita Dove",
    pages: 80,
};

//OK
const miss: Book = {
    pages: 80,
};

// 7.2.2 읽기 전용 속성
// 경우에 따라 인터페이스에 정의된 객체의 속성을 재할당하지 못하도록 인터페이스 사용자를 차단하고 싶을 때가 있다.
// 타입스크립트는 속성 이름 앞에 readonly 키워드를 추가해 다른 값으로 설정될 수 없음을 나타낸다.
// 이러한 readonly 속성은 평소대로 읽을 수는 있지만 새로운 값으로 재할당하지 못한다.

interface Page {
    readonly text: string;
}

function read(page: Page) {
    // OK: text 속성을 수정하지 않고 읽는 것
    console.log(page.text);

    page.text += 1; // Error => 읽기 전용 속성이므로 'text'에 할당할 수 없다.
}

// readonly 제한자는 타입 시스템에만 존재하며 인터페이스에서만 사용할 수 있다.
// readonly 제한자는 객체의 인터페이스를 선언하는 위치에서만 사용되고 실제 객체에는 적용되지 않는다.

// 7.2.3 함수와 메서드
// 자바스크립트에서 객체 멤버가 객체 함수가 되는 것은 매우 일반적이다.
// 타입스크립트에서도 인터페이스 멤버를 앞서 5장 '함수'에서 다뤘던 함수 타입으로 선언할 수 있다.
// 타입스크립트는 인터페이스 멤버를 함수로 선언하는 두 가지 방법을 제공한다.

// - 메서드 구문: 인터페이스 멤버를 member(): void와 같이 객체의 멤버로 호출되는 함수로 선언
// - 속성 구문: 인터페이스 멤버를 member: () => void와 같이 독립 함수와 동일하게 선언

// 위 두 가지 선언 방법은 자바스크립트에서 객체를 함수로 선언하는 방법과 동일하다.

interface HasBothFunctionTypes {
    property: () => string;
    method(): string;
}

const hasBoth02: HasBothFunctionTypes = {
    property: () => "",
    method() {
        return "";
    },
};

hasBoth02.property(); // OK
hasBoth02.method(); // OK

// 두 가지 방법 모두 선택적 속성 키워드인 ?를 사용해 필수로 제공하지 않아도 되는 멤버로 나타낼 수 있다.
interface OptionalReadonlyFunctions {
    optionalProperty?: () => string;
    optionalMethod?(): string;
}

// 메서드와 속성 선언은 대부분 서로 교환하여 사용할 수 있다.
// - 메서드는 readonly로 선언할 수 없지만, 속성은 가능하다.
// - 인터페이스 병합은 메서드와 속성을 다르게 처리한다.
// - 타입에서 수행되는 일부 작업은 메서드와 속성을 다르게 처리한다.

// 7.2.4 호출 시그니처
// 인터페이스와 객체 타입은 호출 시그니처로 선언할 수 있다. 호출 시그니처는 값을 함수처럼 호출하는 방식에 대한 타입 시스템의 설명이다.
// 호출 시그니처가 선언한 방식으로 호출되는 값만 인터페이스에 할당할 수 있다. 즉, 할당 가능한 매개변수와 반환 타입을 가진 함수이다.
// 호출 시그니처는 함수 타입과 비슷하지만, 콜론(:) 대신 화살표(=>)로 표시한다.

type FunctionAlias = (input: string) => number;

interface CallSignature {
    (input: string): number;
}

// 타입: (input: string) => number
const typedFunctionAlias: FunctionAlias = (input) => input.length; // OK

// 타입: (input: string) => number
const typedCallSignature: CallSignature = (input) => input.length; // OK

// 다음 keepsTrackOfCalls 함수 선언에는 number 타입인 counter 속성이 주어져 FunctionWithCount 인터페이스에 할당할 수 있다.
// 따라서 FunctionWithCount 타입의 hasCallCount 인수에 할당할 수 있다. 다음 코드의 마지막 함수에는 count 속성이 주어지지 않았다.
interface FunctionWithCount {
    count: number;
    (): void;
}

let hasCallCount: FunctionWithCount;

function keepsTrackOfCalls() {
    keepsTrackOfCalls.count += 1;
    console.log(`I've been called ${keepsTrackOfCalls.count} times!`);
}
keepsTrackOfCalls.count = 0;

hasCallCount = keepsTrackOfCalls; // OK

function doesNotHaveCount() {
    console.log("No Idea!");
}

hasCallCount = doesNotHaveCount; // 'count' 속성이 '() => void' 형식에 없지만 'FunctionWithCount' 형식에서 필수이다.

// 7.2.5 인덱스 시그니처
// 일부 자바스크립트 프로젝트는 임의의 string 키에 값을 저장하기 위한 객체를 생성한다.
// 이러한 '컨테이너 container' 객체의 경우 모든 가능한 키에 대해 필드가 있는 인터페이스를 선언하는 것은 비현실적이거나 불가능하다.

// 타입스크립트는 인덱스 시그니처(index signature) 구문을 제공해 인터페이스의 객체가 임의의 키를 받고, 해당 키 아래의 특정 타입을 반환할 수 있음을 나타낸다.
// 자바스크립트 객체 속성 조회는 암묵적으로 키를 문자열로 변환하기 때문에 인터페이스의 객체는 문자열 키와 함께 가장 일반적으로 사용된다.
// 인덱스 시그니처는 일반 속성 정의와 유사하지만 키 다음에 타입이 있고 {[i: string]: ...}과 같이 배열의 대괄호를 갖는다.

// 다음 WordCounts 인터페이스는 number 값을 갖는 모든 string 키를 허용하는 것으로 선언되었다.
// 이런 타입의 객체는 값이 number면 string 키가 아닌 그 어떤 키도 바인딩 할 수 없다.

interface WordCounts {
    [i: string]: number; // WordCounts 인터페이스는 number 값을 갖는 모든 string 키를 허용하는 것으로 선언
}

const counts: WordCounts = {};
counts.apple = 0; // OK
counts.banana = 1; // OK
counts.cherry = false; // Error => 'boolean' 형식은 'number' 형식에 할당할 수 없다.

// 인덱스 시그니처는 객체에 값을 할당할 때 편리하지만 타입 안정성을 완벽하게 보장하지는 않는다.
// 인덱스 시그니처는 객체가 어떤속성에 접근하든 간에 값을 반환해야 함을 나타낸다.

// 다음 publishDates 값은 Date 타입으로 Frankenstein을 안전하게 반환하지만
// 타입스크립트는 Beloved가 정의되지 않았음에도 불구하고 정의되었다고 속인다.

interface DateByName {
    [i: string]: Date;
}

const publishDates: DateByName = {
    Frankenstein: new Date("1 January 1818"),
};

publishDates.Frankenstein; // 타입: Date
console.log(publishDates.Frankenstein.toString()); // OK

publishDates.Beloved; // 타입은 Date이지만 런타임 값은 undefined
console.log(publishDates.Beloved.toString()); // 타입시스템에서는 오류가 나지 않지만 실제 런타임에서는 오류가 발생

// 7.2.6 중첩 인터페이스
// 객체 타입이 다른 객체 타입의 속성으로 중첩될 수 있는 것처럼 인터페이스 타입도 자체 인터페이스 타입 혹은 객체 타입을 속성으로 가질 수 있다.
// 다음 Novel 인터페이스는 인라인 객체 타입인 author 속성과 Setting 인터페이스인 setting 속성을 포함한다.

interface Novel {
    author: {
        name: string;
    };
    setting: Setting;
}

interface Setting {
    place: string;
    year: number;
}

let myNovel: Novel;

// OK
myNovel = {
    author: {
        name: "Jane Austen",
    },
    setting: {
        place: "England",
        year: 1812,
    },
};

// Miss
myNovel = {
    author: {
        name: "Jane Austen",
    },
    setting: {
        // 'year' 속성이 '{ place: string; }' 형식에 없지만 'Setting' 형식에서 필수이다.
        place: "West Yorkshire",
    },
};

// ====================================================================================================

// 7.3 인터페이스 확장
// 타입스크립트는 인터페이스가 다른 인터페이스의 모든 멤버를 복사해서 선언할 수 있는 '확장된(extend)' 인터페이스를 허용한다.
// 확장할 인터페이스의 이름 뒤에 extends 키워드를 추가해서 다른 인터페이스를 확장한 인터페이스라는 걸 표시한다.
