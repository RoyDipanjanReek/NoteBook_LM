import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Table,
} from "@/components/ui";

export default function SectionTable({ title, description, columns, rows, id }) {
  return (
    <Card id={id}>
      <CardHeader>
        <CardTitle className="text-[1.6rem]">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="mt-5">
        <Table columns={columns} rows={rows} />
      </CardContent>
    </Card>
  );
}
