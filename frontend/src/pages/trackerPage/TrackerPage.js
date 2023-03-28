import AddComponent from "../../components/addComponent/AddComponent";
import SeparatorComponent from "../../components/separatorComponent/SeparatorComponent";
import ProductTable from "../../components/tableComponent/MyTable";
import TableComponent from "../../components/tableComponent/TableComponent";

const TrackerPage = ({ expenses, setExpenses }) => {
  return (
    <>
      <AddComponent expenses={expenses} setExpenses={setExpenses} />
      <SeparatorComponent />
      <ProductTable
        products={[
          { id: 1, name: "Cheese", price: 4.9, stock: 20 },
          { id: 2, name: "Milk", price: 1.9, stock: 32 },
          { id: 3, name: "Yoghurt", price: 2.4, stock: 12 },
          { id: 4, name: "Heavy Cream", price: 3.9, stock: 9 },
          { id: 5, name: "Butter", price: 0.9, stock: 99 },
          { id: 6, name: "Sour Cream ", price: 2.9, stock: 86 },
          { id: 7, name: "Fancy French Cheese 🇫🇷", price: 99, stock: 12 },
        ]}
      />
      <TableComponent expenses={expenses} setExpenses={setExpenses} />
    </>
  );
};

export default TrackerPage;
