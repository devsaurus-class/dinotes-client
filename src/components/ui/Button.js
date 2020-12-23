import tw, { styled } from "twin.macro";

const Button = styled.button(({ danger }) => [
  danger ? tw`bg-red-500` : tw`bg-purple-700`,
  tw`text-white text-base m-2 p-3 border rounded-md`,
]);

export default Button;
