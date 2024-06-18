// 4. 객체
// 객체리터럴은 각자의 타입이 있는 키와 값의 집합이다.

// ====================================================================================================

// 4.1 객체 타입
// {...} 구문을 사용해서 객체 리터럴을 생성하면, 타입스크립트는 해당 속성을 기반으로 새로운 객체 타입 또는 타입 형태를 고려한다.
// 해당 객체 타입은 객체의 값과 동일한 속성명과 원시타입을 갖는다.
// 값의 속성에 접근하려면, value.멤버 또는 value['멤버'] 구문을 사용한다.

const poet = {
    born: 1935,
    name: "Mary Oliver",
};
poet["born"]; // 타입 number
poet["name"]; // 타입 string

// 4.1.1 객체 타입 선언
// 객체 타입은 객체 리터럴과 유사하게 보이지만, 필드 값 대신 타입을 사용해 설명한다.
let poetLater: {
    born: number;
    name: string;
};

// 4.1.2 별칭 객체 타입
// 객체 타입을 계속 작성하는 일은 매우 귀찮다. 그래서 각 객체 타입에 타입 별칭을 할당해 사용하는 방법이 더 일반적이다.
type Poet = {
    born: number;
    name: string;
};

let poetLater2: Poet;
poetLater2 = { born: 1993, name: "marco", carrer: "Programmer" }; // Error: 'Poet' 형식에 'carrer'이(가) 없다.

// ====================================================================================================

// 4.2 구조적 타이핑
// 타입스크립트의 타입 시스템은 '구조적으로 타입화(structurally typed)' 되어 있다.
// 즉, 타입을 충족하는 모든 값을 해당 타입의 값으로 사용할 수 있다.
// 다시 말하자면, 매개변수나 변수가 특정 객체 타입으로 선언되면 타입스크립트에 어떤 객체를 사용하든 해당 속성이 있어야 한다고 말해야 한다.

type WithFirstName = {
    firstName: string;
};

type WithLastName = {
    lastName: string;
};

const hasBoth = {
    firstName: "Lucille",
    lastName: "Clifton",
};

let withFirstName: WithFirstName = hasBoth; // OK: 'hasBoth'는 'string' 타입의 'firstName'을 포함한다.
let withLastName: WithLastName = hasBoth; // OK: 'hasBoth'는 'string' 타입의 'lastName'을 포함한다.

// 구조적 타이핑은 '덕 타이핑(Duck Typing)'과는 다르다.
// - 타입스크립트의 타입 검사기에서 구조적 타이핑은 정적 시스템이 타입을 검사하는 경우이다.
// - 덕 타이핑은 런타임에서 사용될 때까지 객체 타입을 검사하지 않는 것을 의미한다.
// 요약하면 자바스크립트는 덕 타입인 반면, 타입스크립트는 구조적으로 타입화 된다.

// 4.2.3 중첩된 객체 타입
// 자바스크립트 객체는 다른 객체의 맴버로 중첩될 수 있으므로 타입스크립트의 객체 타입도 타입 시스템에서 중처된 객체 타입을 나타낼 수 있어야 한다.
// 이를 구현하는 구문은 이전과 동일하지만 기본 이름 대신에 {...} 객체 타입을 사용한다.

// 4.2.4. 선택적 속성
// 모든 객체에 객체 타입 속성이 필요한 건 아니다.
// 타입의 속성 애너테이션에서 : 앞에 ?를 추가하면 선택적 속성임을 나타낼 수 있다.

// 예) 다음 Book 타입은 pages속성만 필요하고 author 속성은 선택적으로 허용한다.
// 객체가 pages 속성을 제공하기만 하면 author 속성은 제공하거나 생략할 수 있다.

type Book = {
    author?: string;
    pages: number;
};

// OK
const ok: Book = {
    author: "Rita Dove",
    pages: 80,
};

// Error: 'pages' 속성이 '{ author: string; }' 형식에 없지만 'Book' 형식에서 필수입니다.
const missing: Book = {
    author: "Rita Dove",
};

// 선택적 속성과 undefined를 포함한 유니언 타입의 속성 사이에는 차이가 있음을 명심하자.
// ?를 사용해 선택적으로 선언된 속성은 존재하지 않아도 된다.
// 그러나 필수로 선언된 속성과 | undefined는 그 값이 undefined 일지라도 반드시 존재해야 한다.

type Writers = {
    author: string | undefined;
    editor?: string;
};

// OK: author는 undefined로 제공됨
const hasRequested: Writers = {
    author: undefined,
};

// Error: 'author' 속성이 '{}' 형식에 없지만 'Writers' 형식에서 필수입니다.
const missingRequired: Writers = {};

// ====================================================================================================

// 4.3 객체 타입 유니언

// 4.3.1 유추된 객체 타입유니언
// 변수에 여러 객체 타입 중 하나가 될 수 있는 초깃값이 주어지면 타입스크립트는 해당 타입을 객체 타입 유니언으로 유추한다.
// 유니언 타입은 가능한 각 객체 타입을 구성하고 있는 요소를 모두 가질 수 있다. 유니언 타입은 가능한 각 객체 타입을 구성하고 있는 요소를 모두 가질 수 있다.

const poem = Math.random() > 0.5 ? { name: "The Double Image", pages: 7 } : { name: "Her Kind", rhymes: true };

// 위 코드에서 poem의 타입
// - {name: string; pages: number; rhymes?: undefined}
// - {name: string; pages?: undefined; rhymes: boolean}

// 4.3.2 명시된 객체 타입 유니언
// 객체 타입의 조합을 명시하면 객체 타입을 더 명확히 정의할 수 있다.
// 코드를 좀 더 작성해야 하지만, 객체 타입을 더 많이 제어할 수 있다는 이점이 있다.

type PoemWithPages = {
    name: string;
    pages: number;
};

type PoemWithRhymes = {
    name: string;
    rhymes: boolean;
};

type Poem = PoemWithPages | PoemWithRhymes;

const poem2: Poem = Math.random() > 0.5 ? { name: "The Double Image", pages: 7 } : { name: "Her Kind", rhymes: true };

// 두 타입 모두 존재하는 값만 참조할 수 있다.
poem2.name; // OK
poem2.pages; // Error: 'PoemWithRhymes' 형식에 'pages' 속성이 없다.

// 잠재적으로 존재하지 않는 객체의 멤버에 대한 접근을 제한하면 코드의 안전을 지킬 수 있다.

// ====================================================================================================

// 4.4 교차 타입
// 타입스크립트 유니언 타입은 둘 이상의 다른 타입 중 하나의 타입이 될 수 있음을 나타낸다.
// 자바스크립트의 런타임 | 연산자가 & 연산자에 대응하는 역할을 하는 것처럼 타입스크립트에서도 & 교차타입을 사용해 여러 타입을 동시에 나타낸다.
// 교차 타입은 일반적으로 여러 기존 객체 타입을 별칭 객체 타입으로 결합해 새로운 타입을 생성한다.

type Artwork = {
    genre: string;
    name: string;
};

type Writing = {
    pages: number;
    name: string;
};

type WrittenArt = Artwork & Writing;

// ====================================================================================================

type ShortPoem = { author: string } & ({ kigo: string; type: "haiku" } | { meter: number; type: "villanelle" });

// OK
const morningGlory: ShortPoem = {
    author: "Fukuda Chiyo-ni",
    kigo: "Morning Glory",
    type: "haiku",
};

// Error: 'meter' 속성이 '{ author: string; type: "villanelle"; }' 형식에 없지만 '{ meter: number; type: "villanelle"; }' 형식에서 필수이다.
const oneArt: ShortPoem = {
    author: "Elizabeth Dishop",
    type: "villanelle",
};
