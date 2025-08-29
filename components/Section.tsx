type SectionProps = {
  title: string;
  children: React.ReactNode;
  id?: string;
};

export default function Section({ title, children, id }: SectionProps) {
  return (
    <div id={id} className="space-y-3 text-center">
      <h2 className="text-2xl font-semibold">{title}</h2>
      {children}
    </div>
  );
}


