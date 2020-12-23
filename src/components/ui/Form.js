import tw from "twin.macro";

const Form = tw.form`flex flex-col w-4/5`;

const FormGroup = tw.div`flex flex-col`;

const FormButtonGroup = tw.div`flex justify-end`;

const Input = tw.input`my-8 p-2 text-xl font-bold w-full focus:outline-none focus:ring focus:border-blue-300`;

const TextArea = tw.textarea`resize-y mb-8 p-2 focus:outline-none focus:ring focus:border-blue-300`;

export { Form, FormGroup, FormButtonGroup, Input, TextArea };
