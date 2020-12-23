/* eslint-disable jsx-a11y/accessible-emoji */
/* eslint-disable react/prop-types */
import React from "react";
import tw, {styled} from "twin.macro";

const MessageContainer = styled.div(({ danger }) => [
  danger ? tw`border-red-500` : tw`border-green-500`,
  tw`flex flex-col items-center justify-center m-4 p-4 border-2 rounded`
]);

const Message = (props) => {
  const { text, type } = props;

  return (
    <>
      {type === "error" ? (
        <MessageContainer danger>
          <p>❌ {text}</p>
        </MessageContainer>
      ) : (
        <MessageContainer>
          <p>✅ {text}</p>
        </MessageContainer>
      )}
    </>
  );
};

export default Message;
