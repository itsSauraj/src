import {
  ActionsFormatter,
  DateFormatter,
} from "@/components/ui/table/formater";

export const defaultColumns: string[] = [
  "employee_id",
  "first_name",
  "last_name",
  "email",
  "phone_number",
  "joining_date",
  "actions",
];
export const allColumns = [
  { key: "employee_id", label: "Employee ID" },
  { key: "first_name", label: "First Name" },
  { key: "last_name", label: "Last Name" },
  { key: "email", label: "Email" },
  { key: "phone_number", label: "Phone Number" },
  { key: "address", label: "Address" },
  { key: "birth_date", label: "Birth Date" },
  { key: "joining_date", label: "Joining Date" },
  { key: "actions", label: "Actions" },
];

export const getAllColumns = (actions: any, displayColumns: string[]) => {
  const allColumnsObject: { [key: string]: any } = {
    employee_id: {
      headerName: "Employee ID",
      field: "employee_id",
      width: 150,
      cellClass: "font-bold",
      headerClass: "font-bold",
      editable: false,
    },
    first_name: {
      headerName: "First Name",
      field: "first_name",
      flex: 1,
      cellClass: "font-bold",
      headerClass: "font-bold",
    },
    last_name: {
      headerName: "Last Name",
      field: "last_name",
      width: 250,
    },
    email: {
      headerName: "Email",
      field: "email",
      width: 250,
    },
    phone_number: {
      headerName: "Phone Number",
      field: "phone_number",
      width: 200,
      sortable: false,
    },
    address: {
      headerName: "Address",
      field: "address",
      width: 200,
    },
    birth_date: {
      headerName: "Birth Date",
      field: "birth_date",
      valueFormatter: DateFormatter,
      width: 200,
    },
    joining_date: {
      headerName: "Joining Date",
      field: "joining_date",
      valueFormatter: DateFormatter,
      width: 200,
    },
    actions: {
      headerName: "Actions",
      field: "id",
      cellRenderer: (_params: any) =>
        ActionsFormatter(actions.setDeletable, actions.setOpen, _params),
      width: 120,
      editable: false,
      sortable: false,
      filter: false,
    },
  };

  return displayColumns.map((column) => allColumnsObject[column]);
};
