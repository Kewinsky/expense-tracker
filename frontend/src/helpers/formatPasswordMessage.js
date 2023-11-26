export const formatPasswordMessage = (message) => {
  return message.split("\n").map((line, index) => (
    <p key={index} style={{ margin: 0 }}>
      {line}
    </p>
  ));
};
