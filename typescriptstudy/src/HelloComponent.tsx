import HelloProps from "./types/types";

function HelloComponent({ name, age }: HelloProps) {
  // 이건 객체 구조분해를 보셔야 합니다.
  return (
    <>
      Hello, {name}, you are {age} years old!
    </>
  );
}

export default HelloComponent