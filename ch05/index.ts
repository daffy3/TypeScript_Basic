// 5. 함수
// 한쪽 끝에는 함수 인수가 있고, 다른 쪽 끝에는 반환 타입이 있다.

// 5.1 함수 매개변수
// 다음 sing 함수는 song 매개변수를 받아 콘솔에 출력한다.

function sing01(song) {
    console.log(`Singing: ${song}!`);
}
// 위 코드에서 개발자가 작성한 song 매개변수를 제공하기 위해 의도한 갑스이 타입은 무엇일까?
// 명시적으로 타입 정보가 선언되지 않으면 절대 타입을 알 수 없다. 타입스크립트는 이를 any 타입으로 간주하며 매개변수의 타입은 무엇이든 될 수 있다.

function sing02(song: string) {
    console.log(`Singing: ${song}!`);
}
// 코드를 유효한 타입스크립트 구문으로 만들기 위해 함수 매개변수에 적절한 타입 애너테이션을 추가할 필요가 없다.

// 5.1.1 필수 매개변수
// 자바스크립트에서는 인수의 수와 상관없이 함수를 호출할 수 있다.
// 하지만 타입스크립트는 함수에 선언도니 모든 매개변수가 필수라고 가정한다. 정말 중요한 개념이다.

function sing03(first: string, second: string) {
    console.log(`${first} / ${second}`);
}
// 위 sing03 함수는 두 개의 매개변수가 필요하므로 하나 혹은 세 개의 인수를 전달하는 것은 모두 허용되지 않는다.
// 즉, first와 second 이 두 개의 매개변수는 필수이며, 반드시 2개의 인자를 기입해줘야 한다는 것이다.
// 함수에 필수 매개변수(required parameter)를 제공하도록 강제하면 예상되는 모든 인숫값을 함수 내에 존재하도록 만들어 타입 안정성을 강화하는데 도움이 된다.

sing03("Go Your Own Way", "The Chain");
// 위 처럼 first, second는 매개변수로 명칭하고 / "Go Your Own Way", "The Chain" 등과 같은 문자열은 인수/인자라고 부른다.

// 5.1.2 선택적 매개변수
// 자바스크립트에서 함수 매개변수가 제공되지 않으면 함수 내부의 인숫값은 undefined로 기본값이 설정된다는 것 떠올려보자.
// 그리고 때로는 함수 매개변수를 제공할 필요가 없을 때도 있고, undefined 값을 위해 의도적으로 사용할 수도 있다.
// 타입스크립트가 이러한 선택적 매개변수에 인수/인자를 제공하지 못하는 경우, 타입 오류를 보고하지 않았으면 하는 경우가 있다.
// 타입스크립트에서는 선택적 객체 타입 속성과 유사하게 타입 애너테이션의 : 앞에 ?를 추가해 매개변수가 선택적이라고 표시한다.
// 함수 호출에서 선택적 매개변수를 제공할 필요는 없다. 선택적 매개변수에는 항상 | undefined가 유니언 타입으로 추가되어 있다.

function announceSong(song: string, singer?: string) {
    console.log(`Song: ${song}`);

    if (singer) {
        console.log(`Singer: ${singer}`);
    }
}
announceSong("Greensleeves"); // OK
announceSong("Greensleeves", undefined); // OK
announceSong("Chandelier", "Sia"); // OK

// 선택적 매개변수는 | undefined를 포함하는 유니언 타입 매개변수와는 다르다. 정말 중요한 개념이다.
// ?으로 표시된 선택적 매개변수가 아닌 매개변수는 값이 명시적으로 undefined일지라도 항상 제공되어야 한다.

function announceSongBy(song: string, singer: string | undefined) {}
announceSongBy("Greenleeves"); // Error => 두 개의 인수/인자가 필요한데 하나만 할당되었다.
announceSongBy("Greenleeves", undefined); // OK
announceSongBy("Chandelier", "Sia"); // OK

// 함수에서 사용되는 모든 선택적 매개변수는 마지막 매개변수여야 한다.
// 필수 매개변수 전에 선택적 매개변수를 위치시키면 다음과 같이 타입스크립트 구문 오류가 발생한다.
function announceSinger(singer?: string, song: string) {} // Error => 필수 매개 변수는 선택적 매개 변수 뒤에 올 수 없습니다.

// 5.1.3 기본 매개변수
// 자바스크립트에서 선택적 매개변수를 선언할 때, =와 값이 포함된 기본값을 제공할 수 있다.
// 즉, 선택적 매개변수에는 기본적으로 값이 제공되기 때문에 해당 타입스크립트 타입에는 암묵적으로 함수 내부에 | undefined 유니언 타입이 추가된다.
// 타입스크립트는 함수의 매개변수에 대해 인수를 누락하거나 undefined 인수를 사용해서 호출하는 것을 여전히 허용한다.

// 타입스크릅트의 타입추론은 초기 변숫값과 마찬가지로 기본 함수 매개변수에 대해서도 유사하게 작동한다.
// 매개변수에 기본값이 있고 타입 애너테이션이 없는 경우, 타입스크립트는 해당 기본값을 기반으로 매개변수 타입을 유추한다.

function rateSong(song: string, rating = 0) {
    console.log(`${song} gets ${rating}/5 stars!`);
}
rateSong("Photograph"); // OK
rateSong("Set Fire to the Rain", 5); // OK
rateSong("Set Fire to the Rain", undefined); // OK
// 위 rateSong 함수에서 rating은 number 타입으로 유추되지만, 함수를 호출하는 코드에서는 선택적 number | undefined가 된다.

// 5.1.4 나머지 매개변수
// 자바스크립트의 일부 함수는 임의의 수의 인수로 호출할 수 있도록 만들어진다.
// ... 스프레드 연산자는 함수 선언의 마지막 매개변수에 위치하고, 해당 매개변수에서 시작해 함수에 전달된 '나머지(rest)' 인수가 모두 단일 배열에 저장되어야 함을 나타낸다.
// 타입스크립트는 이러한 나머지 매개변수(rest parameter)의 타입을 일반 매개변수와 유사하게 선언할 수 있다.
// 단, 인수 배열을 나타내기 위해 끝에 [] 구문이 추가된다는 점만 다르다.

function singAllTheSongs(singer: string, ...songs: string[]) {
    for (const song of songs) {
        console.log(`${song}, by ${singer}`);
    }
}
singAllTheSongs("Alicia Keys"); // OK
singAllTheSongs("Lady Gaga", "Bad Romance", "Just Dancs", "Poker Face"); // OK

// ====================================================================================================

// 5.2 반환타입
// 타입스크립트는 지각적(perceptive)이다.
// 함수가 반환할 수 있는 가능한 모든 값을 이해하면 함수가 반환하는 타입을 알 수 있다.
// 아래 예제에서는 singSongs는 타입스크립트에서 number를 반환하는 것으로 파악된다.

// 타입: (songs: string[]) => number
function singSongs(songs: string[]) {
    for (const song of songs) {
        console.log(`${song}`);
    }
    return songs.length;
}

// 함수에 다른 값을 가진 여러 개의 반환문을 포함하고 있다면, 타입스크립트는 반환타입(return type)을 가능한 모든 반환 타입의 조합으로 유추한다.
// 다음 코드에서 getSongAt 함수는 string | undefined를 반환하는 것으로 유추된다.
function getSongAt(songs: string[], index: number) {
    return index < songs.length ? songs[index] : undefined;
}
