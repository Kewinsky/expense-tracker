import Button from "react-bootstrap/Button";
const ActionButtonsComponents = () => {
  return (
    <td className="text-center">
      <Button
        href="/update"
        variant="outline-dark"
        type="submit"
        className="mx-2"
      >
        Edit
      </Button>
      <Button variant="outline-dark" type="submit">
        Delete
      </Button>
    </td>
  );
};

export default ActionButtonsComponents;
