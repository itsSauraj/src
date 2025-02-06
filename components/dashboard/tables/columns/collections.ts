import {
  ActionsFormatter,
  ImageFormatter,
  TextFormatter,
  BooleanFormatter,
  ListRenderer,
  DurationFormatter,
} from "@/components/ui/table/formater";

export const defaultColumns: string[] = [
  "title",
  "description",
  "alloted_time",
  "is_default",
  "image",
  "actions",
];

export const allColumns = [
  { key: "title", label: "Title" },
  { key: "description", label: "Description" },
  { key: "alloted_time", label: "Alloted Time" },
  { key: "duration", label: "Duration" },
  { key: "is_default", label: "Default" },
  { key: "image", label: "Image" },
  { key: "courses", label: "Courses" },
  { key: "actions", label: "Actions" },
];

export const getAllColumns = (actions: any, displayColumns: string[]) => {
  const allColumnsObject: { [key: string]: any } = {
    title: {
      headerName: "Title",
      field: "title",
      cellClass: "font-bold",
      headerClass: "font-bold",
      width: 300,
    },
    description: {
      headerName: "Description",
      field: "description",
      cellClass: "text-justify",
      width: 400,
      cellRenderer: TextFormatter,
    },
    alloted_time: {
      headerName: "Alloted Time (in hours)",
      field: "alloted_time",
      cellClass: "text-justify",
      width: 200,
      cellRenderer: TextFormatter,
    },
    duration: {
      headerName: "Duration",
      field: "duration",
      cellClass: "text-justify",
      width: 200,
      cellRenderer: DurationFormatter,
      editable: false,
    },
    is_default: {
      headerName: "Default",
      field: "is_default",
      width: 100,
      cellRenderer: BooleanFormatter,
      sortable: false,
      editable: (params: any) => {
        if (params.data.is_default) return false;

        return true;
      },
    },
    image: {
      headerName: "Image",
      field: "image",
      cellRenderer: (_params: any) =>
        ImageFormatter(_params, _params.data.title.toLowerCase()),
      filter: false,
      sortable: false,
      editable: false,
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
    courses: {
      headerName: "Courses",
      field: "courses",
      cellRenderer: ListRenderer,
      width: 200,
      cellClass: "text-justify",
      editable: false,
    },
  };

  return displayColumns.map((column) => allColumnsObject[column]);
};
