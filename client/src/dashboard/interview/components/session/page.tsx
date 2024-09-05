import { useEffect } from "react";
import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";

const data = [
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  // ...
];

export default function DemoPage() {
  var data;
  useEffect(() => {
    async function getData() {
      // Fetch data from your API here.
      return;
    }
    getData();
  }, []);

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
